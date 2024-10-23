import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { getTransactionStatus } from '@/app/services/change-now';
import { checkTransactionStatus } from '@/app/services/status.feature';

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { transactions } = await req.json();
    
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

      const transactionStatus = await getTransactionStatus(atob(transactionId));
      
      if (transactionStatus.status === 'error') {
        console.error(`Error fetching transaction status for ${transactionId}:`, transactionStatus.status);
        
        // Delete the transaction if it exists
        await prisma.transaction.delete({
          where: { transactionId },
        });
      }

      // Update only if the transaction exists
      if (existingTransaction) {
        await prisma.transaction.update({
          where: { transactionId },
          data: {
            status: transactionStatus.status,
            updatedAt: new Date()
          }
        })
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