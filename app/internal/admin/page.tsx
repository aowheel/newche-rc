import { auth } from "@/auth";
import DeleteOverallSchedule from "@/components/DeleteOverallSchedule";
import SetOverallSchedule from "@/components/SetOverallSchedule";
import { inter } from "@/lib/fonts";
import { FaUserSlash } from "react-icons/fa";

const Page = async () => {
  const session = await auth();
  if (session?.user?.email !== "aoimakino2003@gmail.com") {
    return (
      <>
        <FaUserSlash className="text-5xl text-slate-800" />
        <p className={`${inter.className} text-slate-800`}>You are not authorized to access this page.</p>
      </>
    );
  }
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const defaultDate = date.toISOString().split('T')[0];
  return (
    <>
      <SetOverallSchedule date={defaultDate} />
      <DeleteOverallSchedule date={defaultDate} />
    </>
  );
}

export default Page;
