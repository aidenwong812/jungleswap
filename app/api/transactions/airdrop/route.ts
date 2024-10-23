import { NextRequest, NextResponse } from "next/server";
import prisma from "../../database";
import { getTransactionStatus } from "@/app/services/change-now";
import { checkTransactionStatus } from "@/app/services/status.feature";

export async function POST(req: NextRequest) {
    try {
      const { userId } = await req.json();

      if (!userId) {
        return NextResponse.json(
          {
            message: "User ID is required",
            error: "Missing userId"
          },
          {
            status: 400,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
  
      const transactions = await prisma.transaction.findMany({ where: { userId: userId } });
      for (const transaction of transactions) {
        if (transaction.status === 'waiting') {
          const transactionStatus = await getTransactionStatus(atob(transaction.transactionId));
          if(transactionStatus.status === "finished")
          checkTransactionStatus(transactionStatus, userId); // Pass the userId here
        }
      }
  
      const user :any = await prisma.user.findUnique({ where: { id: userId } });
      const airdrop = user.airdrop;
      return NextResponse.json(
        {
          message: "Transaction status checked.",
          data: airdrop,
        },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        });
    } catch (error) {
      console.error("Error checking transaction status:", error);
      return NextResponse.json(
        {
          message: "Failed to check transaction status",
          error: error
        },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  }

  