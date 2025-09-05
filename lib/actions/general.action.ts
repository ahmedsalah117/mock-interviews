"use server";
import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import {
  CreateFeedbackParams,
  Feedback,
  GetFeedbackByInterviewIdParams,
  GetLatestInterviewsParams,
  Interview,
} from "@/types";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as Interview[];
}

// handler to get the interviews created by other users...

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 10 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("user_id", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as Interview[];
}

//fetch interview details by id

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview;
}

// create feedback handler.

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  try {
    const formattedTranscript = transcript
      .map((sentence: { role: string; content: string }) => {
        return `- ${sentence.role}: ${sentence.content}\n`;
      })
      .join("");

    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      providerOptions: {
        google: {
          structuredOutputs: false,
        },
      },
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        
        Transcript:
        ${formattedTranscript}

        Please provide a comprehensive feedback analysis with the following structure:
        
        1. **totalScore**: A number from 0-100 representing the overall performance
        2. **categoryScores**: An array of objects, each containing:
           - category: The category name (exactly as listed below)
           - score: A number from 0-100 for that category
           - feedback: Detailed feedback for that category
        
        Categories to evaluate (use these exact names):
        - "Communication Skills": Clarity, articulation, structured responses
        - "Technical Knowledge": Understanding of key concepts for the role
        - "Problem-Solving": Ability to analyze problems and propose solutions
        - "Cultural & Role Fit": Alignment with company values and job role
        - "Confidence & Clarity": Confidence in responses, engagement, and clarity
        
        3. **strengths**: An array of strings highlighting the candidate's strengths
        4. **areasForImprovement**: An array of strings identifying areas that need improvement
        5. **finalAssessment**: A comprehensive summary paragraph of the overall performance
        
        Return your analysis as a JSON object with this exact structure.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories and provide comprehensive feedback.",
    });

    // Transform categoryScores to match the expected database structure
    const transformedCategoryScores = categoryScores.map(
      (item: { category: string; score: number; feedback: string }) => ({
        name: item.category,
        score: item.score,
        comment: item.feedback,
      })
    );

    const feedback = await db.collection("feedback").add({
      interviewId,
      userId,
      totalScore,
      categoryScores: transformedCategoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    });
    return {
      success: true,
      feedbackId: feedback.id,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
    };
  }
}

// get feedback by interview id

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { userId, interviewId } = params;

  const feedback = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .get();

  if (feedback.empty) {
    return null;
  }
  const feedbackDoc = feedback.docs[0];

  return {
    id: feedbackDoc.id,
    ...feedbackDoc.data(),
  } as Feedback;
}
