import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get("accessToken");

    const token = await prisma.accessToken.findUnique({
      where: {
        token: cookie?.value,

        expiresAt: {
          gte: new Date(),
        },
      },

      include: {
        user: true,
      },
    });

    const userId = token?.user.id;
    const userName = token?.user.surname;
    const userEmail = token?.user.email;

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: userId,
        name: userName,
        email: userEmail,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal Server Errorsss" }, { status: 500 });
  }
}
