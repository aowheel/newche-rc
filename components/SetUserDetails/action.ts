"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export default async function handleUserDetails(prevState: { isFirst: boolean, ok?: string, error?: string }, formData: FormData) {
  const displayName = z.string().min(2).max(5).safeParse(formData.get("displayName"));
  const intPeriod = z.coerce.number().int().safeParse(formData.get("period"));
  if (!displayName.success) {
    return { isFirst: prevState.isFirst, error: "表示名は2字以上5字以内です。" };
  } else if (!intPeriod.success) {
    return { isFirst: prevState.isFirst, error: "期は整数で入力してください。" };
  } else {
    try {
      const session = await auth();
      const user = await prisma.user.findFirst({
        where: {
          displayName: displayName.data,
          id: {
            not: session?.user?.id,
          }
        },
        select: {
          id: true,
        },
      });
      if (!!user) return { isFirst: prevState.isFirst, error: "この表示名は使用できません。" }
      await prisma.user.update({
        data: {
          displayName: displayName.data,
          period: intPeriod.data,
        },
        where: { id: session?.user?.id },
      });
      const stringPeriod = z.coerce.string().safeParse(intPeriod.data);
      if (stringPeriod.success) {
        cookies().set("displayName", displayName.data, { maxAge: 60*60*24*365 });
        cookies().set("period", stringPeriod.data, { maxAge: 60*60*24*365 });
        if (prevState.isFirst) redirect("/internal");
        return { isFirst: prevState.isFirst, ok: "変更を反映しました。" };
      }
      return { isFirst: prevState.isFirst };
    } catch(error) {
      throw error;
    }
  }
}
