"use server";

import prisma from "@/lib/prisma";

const handleAttendance = async (userId: string, scheduleId: number, attendance: string) => {
  try {
    const hasAttendance = await prisma.attendance.findUnique({
      where: {
        userId_scheduleId: {
          userId: userId || "",
        scheduleId: scheduleId
        }
      },
      select: {
        attendance: true
      }
    });
    if (hasAttendance) {
      await prisma.attendance.update({
        data: {
          attendance: attendance
        },
        where: {
          userId_scheduleId: {
            userId: userId || "",
            scheduleId: scheduleId
          }
        }
      })
    } else {
      await prisma.attendance.create({
        data: {
          userId: userId || "",
          scheduleId: scheduleId,
          attendance: attendance
        }
      })
    }
  } catch(error) {
    throw error;
  }
}

export default handleAttendance;
