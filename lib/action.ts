"use server";

import prisma from "./prisma";

export const getUserById = async (id?: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    return user;
  } catch(error) {
    throw error;
  }
}

export const getAccountById = async (id?: string) => {
  try {
    const account = await prisma.account.findFirst({ where: { userId: id } });
    return account;
  } catch(error) {
    throw error;
  }
}
