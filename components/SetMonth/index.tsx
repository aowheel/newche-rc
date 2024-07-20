"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowDropright } from "react-icons/io";

const SetMonth = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (startOrEnd: string, month: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(startOrEnd, month);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="p-4 flex items-center gap-x-2 border rounded-lg border-teal-200">
      <input
        type="month"
        id="start"
        defaultValue={searchParams.get("start") || undefined}
        onChange={(event) => {handleSearch("start", event.target.value)}}
      />
      <IoIosArrowDropright className="text-teal-200 text-xl" />
      <input
        type="month"
        id="end"
        defaultValue={searchParams.get("end") || undefined}
        onChange={(event) => {handleSearch("end", event.target.value)}}
      />
    </div>
  );
}

export default SetMonth;
