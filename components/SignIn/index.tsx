"use client";

import { inter } from "@/lib/fonts";
import { FcGoogle } from "react-icons/fc";
import handleSignIn from "./action";
import { useActionState } from "react";
import clsx from "clsx";
import { PendingSvg } from "../UI";

const SignIn = () => {
  const [dummy, formAction, isPending] = useActionState(handleSignIn, undefined);
  return (
    <>
      <form action={formAction}>
        <button type="submit" disabled={isPending} className={clsx(`flex items-center justify-center gap-x-2 px-4 py-2 rounded-lg bg-white text-slate-500 ${inter.className}`, {
          "bg-opacity-75 text-opacity-75": isPending
        })}>
          {
            !isPending &&
            <FcGoogle className="text-xl" />
          }
          {
            isPending &&
            <PendingSvg />
          }
          <label>Sign in with Google</label>
        </button>
      </form>
    </>
  );
}

export default SignIn;
