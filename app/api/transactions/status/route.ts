import { NextRequest, NextResponse } from "next/server";
import { GetRequests } from "@/app/services/relay";

export async function POST(req: NextRequest) {
  try {
    const { transactionId } = await req.json();

    const requests: any = await GetRequests();

    for (const request of requests) {
      if (request.transactionId === transactionId) {
        const transactionStatus = request.status;
        return NextResponse.json(
          {
            message: "Transaction confirmed",
            data: transactionStatus
          },
          {
            status: 200
          }
        );
      }
    }

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