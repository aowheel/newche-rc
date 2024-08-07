"use client";

import { useState, useTransition } from "react";
import clsx from "clsx";
import { FiCheckCircle, FiMinusCircle, FiXCircle } from "react-icons/fi";
import handleAttendance from "./action";

const SetAttendance = ({ userId, scheduleId, attendance }: { userId: string; scheduleId: number; attendance: string }) => {
  const [attendanceState, setAttendanceState] = useState(attendance);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <td className={clsx("flex justify-center gap-x-2 text-3xl", {"animate-pulse": isPending})}>
        <input type="radio" id={`yes-${scheduleId}`} name={`${scheduleId}`} checked={attendanceState === "yes"} 
        onChange={() => {
          startTransition(() => {
            handleAttendance(userId, scheduleId, "yes");
            setAttendanceState("yes");
          });
        }} disabled={isPending} />
        <label htmlFor={`yes-${scheduleId}`}><FiCheckCircle /></label>

        <input type="radio" id={`no-${scheduleId}`} name={`${scheduleId}`} checked={attendanceState === "no"}
        onChange={() => {
          startTransition(() => {
            handleAttendance(userId, scheduleId, "no");
          });
          setAttendanceState("no");
        }} disabled={isPending} />
        <label htmlFor={`no-${scheduleId}`}><FiXCircle /></label>

        <input type="radio" id={`undecided-${scheduleId}`} name={`${scheduleId}`} checked={attendanceState === "undecided"}
        onChange={() => {
          startTransition(() => {
            handleAttendance(userId, scheduleId, "undecided");
          });
          setAttendanceState("undecided");
        }} disabled={isPending} />
        <label htmlFor={`undecided-${scheduleId}`}><FiMinusCircle /></label>
      </td>
    </>
  );
}

export default SetAttendance;
