import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get("accessToken");
    if (!cookie) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const token = await prisma.accessToken.findUnique({
      where: {
        token: cookie.value,
        expiresAt: {
          gte: new Date(),
        },
      },
      include: {
        user: true,
      },
    });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    return NextResponse.json({ message: "Test route accessed successfully", user: token.user });
  } catch {
    return NextResponse.json(
      { message: "Error accessing test route", error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}
