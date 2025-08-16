"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form
} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import CustomFormField from "./CustomFormField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { FormType } from "@/types";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};
const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  // 2. Define a submit handler.

  /**
   * Handles form submission for both sign-up and sign-in
   * Manages authentication flow with Firebase Auth and server actions
   */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsAuthenticating(true);

      if (type === "sign-up") {
        const { name, email, password } = values;

        // Step 1: Create user account in Firebase Auth
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Step 2: Store user data in Firestore database
        const result = await signUp({
          uid: userCredentials?.user?.uid,
          name: name!,
          email,
          password,
        });

        // Handle sign-up errors
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        // Success: redirect to sign-in page
        toast.success("Sign up successful");
        router.push("/sign-in");
      } else {
        // SIGN-IN FLOW
        const { email, password } = values;

        // Step 1: Authenticate user with Firebase Auth
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Step 2: Get ID token for session creation
        const idToken = await userCredentials?.user?.getIdToken();

        if (!idToken) {
          toast.error("Failed to sign in. Please try again later.");
          return;
        }

        // Step 3: Create session cookie on server
        await signIn({
          email,
          idToken,
        });

        // Success: redirect to home page
        toast.success("Sign in successful");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setIsAuthenticating(false);
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-4 form space-y-6"
          >
            {!isSignIn && (
              <CustomFormField
                name="name"
                control={form.control}
                label="Name"
                placeholder="Your name"
              />
            )}
            <CustomFormField
              name="email"
              control={form.control}
              label="Email"
              placeholder="Your email"
              type="email"
            />
            <CustomFormField
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button type="submit" className="btn">
              {isAuthenticating && (
                <Loader2Icon className="spin-in animate-spin" />
              )}
              {isSignIn ? "Sign in" : "Create an account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No account yet?" : "Already have an account?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm