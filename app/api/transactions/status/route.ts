import { NextRequest, NextResponse } from "next/server";
import { GetRequests } from "@/app/services/relay";

export async function POST(req: NextRequest) {
  try {
    const { transactionId } = await req.json();

    let transactionStatus = '';

    const requests: any = await GetRequests();

    for (const request of requests.requests) {
      if (request.id === transactionId) {
        transactionStatus = request.status;
        break;

      }
      console.log(transactionStatus);
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