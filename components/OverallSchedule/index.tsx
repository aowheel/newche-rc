"use server";

import dateFormat from "@/lib/date-format";
import { inter } from "@/lib/fonts";
import prisma from "@/lib/prisma";
import clsx from "clsx";
import { z } from "zod";

const OverallSchedule = async ({start, end}: { start?: string, end?: string }) => {
  let restricted = true;
  const splitStart = start?.split("-");
  const startDate = new Date(Number(splitStart?.[0]), Number(splitStart?.[1]) - 1);
  const splitEnd = end?.split("-");
  const endDate = new Date(Number(splitEnd?.[0]), Number(splitEnd?.[1]));
  const date = {
    gte: z.date().safeParse(startDate).data,
    lt: z.date().safeParse(endDate).data
  };
  if (!date.gte || !date.lt) {
    date.gte = new Date();
    delete date.lt;
    restricted = false;
  }
  const schedule = await prisma.schedule.findMany({
    where: { date },
    orderBy: { date: "asc" },
    select: {
      type: true,
      date: true,
      start: true,
      end: true,
      description: true
    }
  });

  const dateOption = {
    month: "numeric",
    day: "numeric",
    weekday: "short"
  };
  const timeOption =  {
    hour: "numeric",
    minute: "2-digit"
  }
  const formattedSchedule = []
  for (let i = 0; i <= schedule.length; i++) {
    const formattedDate = dateFormat(schedule[i]?.date, dateOption);
    const formattedStart = dateFormat(schedule[i]?.start || undefined, timeOption);
    const formattedEnd = dateFormat(schedule[i]?.end || undefined, timeOption);
    formattedSchedule[i] = {
      type: schedule[i]?.type,
      date: formattedDate,
      start: formattedStart,
      end: formattedEnd,
      description: schedule[i]?.description
    }
  }

  let caption = "UP TO DATE";
  if (restricted) {
    caption = `${splitStart?.[0]} / ${splitStart?.[1]} -> ${splitEnd?.[0]} / ${splitEnd?.[1]}`
  }

  const weekday = ["日","月","火","水","木","金","土"];

  return (
    <>
      <div className="w-full p-2 rounded bg-white">
        <table className="w-full text-slate-700 text-lg">
          <caption className={`${inter.className} p-2 bg-slate-50 text-xl`}>{caption}</caption>
          <thead>
            <tr className="text-sm">
              <th>日付</th>
              <th>開始</th>
              <th>終了</th>
            </tr>
          </thead>
          <tbody>
            {formattedSchedule?.map((item, index) => {
              return (
                <tr key={index} className="odd:bg-slate-50 even:bg-white">
                  <td>{item.date}</td>
                  <td>{item.start}</td>
                  <td>{item.end}</td>
                  <td className={clsx({ "p-0": !item.description })}>{item.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OverallSchedule;
