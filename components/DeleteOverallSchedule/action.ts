"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

export default async function deleteOverallSchedule(prevState: { ok?: string, error?: string}, formData: FormData) {
  const date = z.string().date().safeParse(formData.get("date"));
  const ISODate = z.coerce.date().safeParse(date.data);
  if (!ISODate.success) return { error: "Error!" };
  else {
    const schedule = await prisma.schedule.findUnique({
      where: {
        date: ISODate.data
      },
      select: {
        id: true
      }
    });
    if (!schedule) return { error: "No such data." };
    await prisma.schedule.delete({
      where: {
        date: ISODate.data
      },
      select: {
        id: true
      }
    });
    return { ok: `Success! -> DELETED ${schedule.id}` };
  }
}