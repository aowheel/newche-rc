import Loading from "@/app/loading";
import OverallSchedule from "@/components/OverallSchedule";
import SetMonth from "@/components/SetMonth";
import { Suspense } from "react";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    start?: string;
    end?: string;
  };
}) => {
  const start = searchParams?.start;
  const end = searchParams?.end;
  const startKey = start || "";
  const endKey = end || ""

  return (
    <>
      <Suspense key={startKey + endKey} fallback={<Loading />}>
        <OverallSchedule start={start} end={end} />
      </Suspense>
      <SetMonth />
    </>
  );
}

export default Page;