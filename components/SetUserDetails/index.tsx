"use client";

import { useActionState } from "react";
import handleUserDetails from "./action";
import { IoMdAlert } from "react-icons/io";
import { LoadingCircle } from "../Common";
import { FaCheckCircle } from "react-icons/fa";

const SetUserDetails = ({ isFirst }: { isFirst: boolean }) => {
  const initialState: {
    isFirst: boolean;
    ok?: string;
    error?: string;
  } = { isFirst: isFirst };
  const [state, formAction, isPending] = useActionState(handleUserDetails, initialState);
  return (
    <>
      <form
        action={formAction}
        className="p-8 flex flex-col items-center gap-y-8 rounded-lg border border-slate-300"
      >
        <input type="text" name="displayName" placeholder="表示名 (必須)" className="px-2 py-1 rounded" />
        <input type="number" name="period" placeholder="期 (現役生は必須)" className="rounded px-2 py-1" />
        {
          !!state.ok &&
          <div className="flex items-center gap-x-2 text-green-400">
            <FaCheckCircle className="text-xl" />
            <p>{state.ok}</p>
          </div>
        }
        {
          !!state.error &&
          <div className="flex items-center gap-x-2 text-yellow-400">
            <IoMdAlert className="text-xl" />
            <p>{state.error}</p>
          </div>
        }
        <button type="submit" className="flex items-center justify-center gap-x-2 px-4 py-2 rounded-lg bg-slate-800 text-white" disabled={isPending}>
          {
            isPending &&
            <LoadingCircle />
          }
          <label>
            { isFirst && <>詳細を登録</> }
            { !isFirst && <>詳細を更新</> }
          </label>
        </button>
      </form>
    </>
  );
}

export default SetUserDetails;
