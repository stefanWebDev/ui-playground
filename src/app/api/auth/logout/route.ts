import { PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "No access token found" }, { status: 401 });
    }

    await prisma.accessToken.delete({
      where: {
        token: accessToken,
      },
    });

    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

    response.cookies.delete("accessToken");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
