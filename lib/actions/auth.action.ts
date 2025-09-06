"use server"

import { auth, db } from "@/firebase/admin";
import { SignInParams, SignUpParams, User } from "@/types";
import { cookies } from "next/headers";

// Session duration: 1 week in seconds
const ONE_WEEK = 60 * 60 * 24 * 7;

/**
 * Creates a new user in Firestore database
 * Called after Firebase Auth creates the user account
 */
export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    // Check if user already exists in Firestore
    const userRecord = await db.collection("users").doc(uid).get();

    if(userRecord.exists){
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      }
    }

    // Store user data in Firestore
    await db.collection("users").doc(uid).set({name, email})
    
    return {
      success: true,
      message: "Account created successfully. Please sign in to continue!",
    }
  } catch (error: unknown) {
    console.error("Error creating a user", error)
    // Handle Firebase Auth specific errors
    if (error && typeof error === 'object' && 'code' in error && error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      }
    }

    return {
      success: false,
      message: "Failed to create an account. Please try again later.",
    }
  }
}

/**
 * Authenticates user and creates session cookie
 * Called after Firebase Auth validates credentials
 */
export async function signIn(params: SignInParams){
  const {email, idToken} = params;
  try {
    // Verify user exists in Firebase Auth
    const userRecord = await auth.getUserByEmail(email);
    if(!userRecord){
      return {
        success: false,
        message: "User doesn't exist. Please sign up instead.",
      }
    }

    // Create and set session cookie
    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Sign in successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to sign in. Please try again later.",
    }
  }
}

/**
 * Converts Firebase ID token to session cookie
 * Sets secure HTTP-only cookie for session management
 */
export async function setSessionCookie(idToken: string){
  const cookieStore = await cookies();
  // Convert ID token to session cookie (1 week expiry)
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK* 1000,
  })
  // Set secure HTTP-only cookie
  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true, // Prevents JavaScript access
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    path: "/",
    sameSite: "lax",
  });
}

/**
 * Verifies session cookie and returns current user data
 * Used to check authentication status on protected routes
 */
export async function getCurrentUser(): Promise<User | null>{
  const cookieStore = await cookies();
  // Get session cookie from request
  const sessionCookie = cookieStore.get("session")?.value;
  if(!sessionCookie){
    return null;
  }
  try {
    // Verify session cookie with Firebase Admin
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Fetch user data from Firestore
    const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

    if(!userRecord.exists){
      return null;
    }

    // Return user data with ID
    return {
      ...userRecord.data(),
      id: userRecord?.id,
    } as User;
  } catch (error) {
    console.error("Error verifying session cookie", error);
    return null;
  }
}

/**
 * Simple boolean check for authentication status
 * Wrapper around getCurrentUser for convenience
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}


export async function signOutHandler() {
  const cookieStore = await cookies();
  // Clear the session cookie by setting it to expire immediately
  cookieStore.set("session", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  cookieStore.delete("session");
}