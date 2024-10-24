import { NextRequest, NextResponse } from "next/server";
import prisma from "../../database";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();

    // Check if the required fields are present in the request body
    if (!requestData) {
      return NextResponse.json(
        { message: "Missing required fields: userId and transactionId" },
        {
          headers: {
            "content-type": "application/json",
          },
          status: 400,
        }
      );
    }

    const { userId, transactionId, chainId, status } = requestData;
    // Create the transaction
    await prisma.transaction.create({
      data: {
        userId: userId,
        transactionId: transactionId,
        chainId: chainId,
        status: status
      }
    });

    return NextResponse.json(
      { message: "Transaction has been successfully created." },
      {
        headers: {
          "content-type": "application/json",
        },
        status: 201, // Changed to 201 Created
      }
    );

  } catch (err) {
    console.error("Error creating transaction:", err);
    return NextResponse.json(
      {
        message: "Failed to create transaction",
        success: false,
        error: err,
      },
      {
        headers: {
          "content-type": "application/json",
        },
        status: 500,
      }
    );
  }
}