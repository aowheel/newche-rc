"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SetMonth = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleSearch = (month: string) => {
    const params = new URLSearchParams(searchParams);
    if (!month) {
      params.delete("month");      
    } else {
      params.set("month", month);
    }
    push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <input
      id="month"
      type="month"
      defaultValue={searchParams.get("month") || undefined}
      onChange={(event) => {handleSearch(event.target.value)}}
      className="fixed top-1 right-4 p-1 rounded border border-white bg-slate-900 bg-opacity-75 text-white"
    />
  );
}

export default SetMonth;
