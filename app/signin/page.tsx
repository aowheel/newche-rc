import { auth } from "@/auth";
import SetUserDetails from "@/components/SetUserDetails";
import SignIn from "@/components/SignIn";
import { cookies } from "next/headers";
import Link from "next/link";
import { FaLightbulb } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdLogin } from "react-icons/md";

const Page = async () => {
  const session = await auth();
  const details = cookies().has("displayName");
  if (!session) {
    return (
      <>
        <MdLogin className="text-5xl text-white" />
        <div className="p-4 flex items-center justify-center gap-x-4 text-yellow-300">
          <IoInformationCircleOutline className="text-3xl" />
          <span>Googleアカウントのプロフィール画像を使用します。</span>
        </div>
        <SignIn />
      </>
    );
  }
  else if (!details) {
    return (
      <>
        <MdLogin className="text-5xl text-white" />
        <SetUserDetails isFirst={true} />
      </>
    );
  }
  else {
    return (
      <>
        <FaLightbulb className="text-yellow-200 text-4xl" />
        <p className="text-white">サインイン済みです。</p>
        <p className="text-white">詳細の変更、サインアウトは
          <Link href="/internal/settings" className="underline text-teal-300">こちら</Link>
        。
        </p>
      </>
    );
  }
}

export default Page;
