import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { GetRequests } from '@/app/services/relay';

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { transactions } = await req.json();

    const requests :any = await GetRequests();

    console.log(requests);

    for (const transaction of transactions) {
      const transactionId = transaction.transactionId;

      // Check if the transaction exists before updating
      const existingTransaction = await prisma.transaction.findUnique({
        where: { transactionId },
      });

      if (!existingTransaction) {
        console.warn(`No transaction found for ID: ${transactionId}`);
        continue;
      }
      
      for(const request of requests) {
        console.log(request); 
        if(request.id === transactionId) {
          await prisma.transaction.update({
            where: { transactionId },
            data: {
              status: request.status,
              updatedAt: new Date()
            }
          })
        }  else {
          console.log(`No request found for ID: ${transactionId}`);
        }  // End of else condition for request loop

        break; // Break the loop once the request is found and updated
      }
    }

    return NextResponse.json(
      {
        message: "Reset transactions",
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error reset transactions:", error);
    return NextResponse.json(
      {
        message: "Failed to reset transactions",
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