"use client";

import clsx  from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FaRegCalendar, FaRegCalendarCheck, FaXmark } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";
import { LoadingDots } from "../Common";

export const ChangeMode = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const isEditMode = params.get("mode") === "edit";

  const pathname = usePathname();
  const { push } = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    if (isEditMode) {
      params.delete("mode");
    } else {
      params.set("mode", "edit");
    }
    push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <button
      type="button"
      onClick={() => startTransition(handleSearch)}
      className={clsx("m-1 p-2 rounded border-double outline outline-offset-2 outline-2 outline-white transition-colors duration-1000 flex justify-center gap-x-4 bg-white text-2xl", {
        "outline-teal-300": isPending
      })}
    >
      {!isEditMode ? <>
        <FaRegCalendar className="text-slate-900" />
        <MdDoubleArrow className="text-slate-900" />
        <FaRegCalendarCheck className="text-teal-300" />
      </> : <>
        <FaRegCalendarCheck className="text-slate-900" />
        <MdDoubleArrow className="text-slate-900" />
        <FaRegCalendar className="text-teal-300" />
      </>}
    </button>
  );
}

export const FinishEditMode = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <div className="fixed w-screen h-8 bottom-0 flex items-center justify-center bg-teal-500 opacity-75">
      <span className="text-white"><LoadingDots text={"入力中"} /></span>
      <button type="button" className="fixed right-2" onClick={() => {
        params.delete("mode");
        push(`${pathname}?${params.toString()}`, { scroll: false });
      }}>
        <FaXmark className="text-white" />
      </button>
    </div>
  );
};
