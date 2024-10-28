import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { transactionId } = await req.json();

    const status = await fetch(`https://api.relay.link/intents/status/v2?requestId=${transactionId}`, {method: 'GET'})
    .then(response => response.json())
    .then(response => {
      return response.status;
      
    })
    .catch(err => console.error(err)); 
    return NextResponse.json(
      {
        message: "Transaction confirmed",
        data: status,
      },
      {
        status: 200
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