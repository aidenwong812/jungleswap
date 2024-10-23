import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../database";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: userId,
          username: '', // You might want to generate a unique username here
        },
      });
    }

    return NextResponse.json(
      { message: "User processed successfully.", userId },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing user:", error);
    return NextResponse.json(
      { message: "An error occurred while processing the user.", error: error },
      { status: 500 }
    );
  }
}