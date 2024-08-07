"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaRegCalendar, FaRegCalendarCheck } from "react-icons/fa6";
import { MdDoubleArrow } from "react-icons/md";

const SetMode = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const isEditMode = params.get("mode") === "edit";

  const pathname = usePathname();
  const { push } = useRouter();

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
      onClick={handleSearch}
      className="p-2 rounded flex justify-center gap-x-4 bg-white text-2xl"
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

export default SetMode;
