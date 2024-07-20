"use client";

import { useActionState, useState } from "react";
import handleOverallSchedule from "./action";
import { inter } from "@/lib/fonts";

const SetOverallSchedule = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const defaultDate = date.toISOString().split('T')[0];

  const startOption = ["17:00", "18:00", "09:00", "15:30", "17:15", undefined];
  const [startIndex, setStartIndex] = useState(0);

  const endOption = ["21:00", "12:15", "19:00", undefined];
  const [endIndex, setEndIndex] = useState(0);

  const initialState: {
    ok?: string, error?: string
  } = {};
  const [message, formAction, isPending] = useActionState(handleOverallSchedule, initialState);

  return (
    <form action={formAction} className={`w-full ${inter.className} p-4 flex flex-col items-center gap-y-4 rounded-lg bg-slate-200 text-slate-700`}>
      <p className="text-2xl">Create or Update</p>

      <input type="date" name="date" defaultValue={defaultDate} required />

      <select name="type">
        <option>default</option>
        <option>championship</option>
        <option>event</option>
      </select>

      <div className="flex gap-x-2">
        <button type="button" className="px-2 rounded bg-white disabled:bg-opacity-75" onClick={() => {
          setStartIndex((startIndex+1)%startOption.length);
        }}>Start</button>
        <input type="time" id="start" name="start" value={startOption[startIndex]} />
      </div>
      
      <div className="flex gap-x-2">
        <button type="button" className="px-2 rounded bg-white disabled:bg-opacity-75" onClick={() => {
          setEndIndex((endIndex+1)%endOption.length);
        }}>End</button>
        <input type="time" id="end" name="end" value={endOption[endIndex]} />
      </div>
      
      <input type="text" name="description" className="px-1"></input>

      {!!message.ok && <p>{message.ok}</p>}
      {!!message.error && <p>{message.error}</p>}

      <button type="submit" className="px-2 rounded bg-slate-500 text-white disabled:bg-opacity-50" disabled={isPending}>Send</button>
    </form>
  );
}

export default SetOverallSchedule;
