import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
  try {
    const cookie = request.cookies.get("accessToken");

    if (!cookie) {
      return NextResponse.json({ message: "Unauthorized", status: 401 }, { status: 401 });
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
      return NextResponse.json({ message: "Unauthorized", status: 401 }, { status: 401 });
    }

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-user-id", token.user.id.toString());
    requestHeaders.set("x-user-email", token.user.email);
    requestHeaders.set("x-user-name", token.user.surname || token.user.name || "");

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Error in middleware", error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ["/api/private"],
};
