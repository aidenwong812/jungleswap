import { NextRequest, NextResponse } from "next/server";
import prisma from "../../database";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    // Convert BigInt fields to numbers
    const serializedTransactions = transactions.map(transaction => ({
      ...transaction,
      userId: Number(transaction.userId),
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString()
    }));

    return NextResponse.json(
      {
        message: "Transactions fetched successfully",
        data: serializedTransactions
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch transactions",
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