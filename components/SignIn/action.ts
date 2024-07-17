"use server";

import { signIn } from "@/auth";

export default async function handleSignIn(prevState: undefined, formData: FormData) {
  try {
    await signIn("google", { redirectTo: "/signin" });
  } catch(error) {
    throw error
  }
  return undefined;
}
