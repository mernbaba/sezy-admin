"use server";

import prisma from "@/lib/prisma";
import { TransactionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateTransaction = async (
  id: string,
  status: TransactionStatus
) => {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { transactionId: id },
      data: {
        status: status,
      },
    });

    revalidatePath("/admin/transactions");
    return { transaction: updatedTransaction };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
