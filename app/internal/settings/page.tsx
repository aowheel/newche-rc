import SetUserDetails from "@/components/SetUserDetails";
import SignOut from "@/components/SignOut";
import { IoSettingsOutline } from "react-icons/io5";

const Page = async () => {
  return (
    <>
      <IoSettingsOutline className="text-white text-5xl" />
      <SetUserDetails isFirst={false} />
      <SignOut />
    </>
  );
}

export default Page;