"use client";

import { useActionState } from "react";
import deleteOverallSchedule from "./action";
import { inter } from "@/lib/fonts";

const DeleteOverallSchedule = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const defaultDate = date.toISOString().split('T')[0];

  const initialState: {
    ok?: string, error?: string
  } = {};
  const [message, formAction, isPending] = useActionState(deleteOverallSchedule, initialState);
  return (
    <form action={formAction} className={`w-full ${inter.className} p-4 flex flex-col items-center gap-y-4 rounded-lg bg-red-200 text-slate-700`}>
      <p className="text-2xl">Delete</p>

      <input type="date" name="date" defaultValue={defaultDate} required />

      {!!message.ok && <p>{message.ok}</p>}
      {!!message.error && <p>{message.error}</p>}

      <button type="submit" className="px-2 rounded bg-red-500 text-white disabled:bg-opacity-50" disabled={isPending}>Delete</button>
    </form>
  );
}

export default DeleteOverallSchedule;
