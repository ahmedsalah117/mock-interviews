import { db } from "@/firebase/admin";
import { GetLatestInterviewsParams, Interview } from "@/types";

export async function getInterviewByUserId(userId: string): Promise<Interview[] | null> {
  const interviews = await db.collection("interviews").where("userId", "==", userId).orderBy("createdAt", "desc").get();

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
    .where("finalized", "==", true).where("user_id", "!=", userId).limit(limit)
    .get();

  return interviews.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  }) as Interview[];
}


//fetch interview details by id

export async function getInterviewById(
  id: string
): Promise<Interview | null> {
  const interview = await db
    .collection("interviews")
    .doc(id)
    .get();

  return interview.data() as Interview;
}