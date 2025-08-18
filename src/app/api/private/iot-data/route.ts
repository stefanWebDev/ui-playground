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
        user: {
          include: {
            things: {
              include: {
                topics: {
                  include: {
                    sensors: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const userId = token?.user.id;

    if (!userId) {
      return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    return NextResponse.json({
      user: token.user,
    });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
