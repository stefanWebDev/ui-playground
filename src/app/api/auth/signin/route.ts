import { PrismaClient } from "@/generated/prisma/client";
import { FormDataUserSchema } from "@/types/schema";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const parsed = FormDataUserSchema.safeParse(data);

    if (parsed.error) {
      return NextResponse.json({
        message: "Invalid data",
        error: "Validation failed",
        status: 400,
      });
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: data.email,
        password: crypto.createHash("sha256").update(parsed.data.password).digest("hex"),
      },
      include: {
        accessToken: {
          select: {
            token: true,
            expiresAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "Something went wrong",
        error: "Something went wrong",
        status: 500,
      });
    }

    const accessToken = user.accessToken;
    let token: string;
    let expiresAt: Date;

    // 30 days expiration
    expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // If no access token exists, create one
    if (!accessToken) {
      token = crypto.randomBytes(32).toString("hex");
      await prisma.accessToken.create({
        data: {
          token,
          userId: user.id,
          expiresAt,
        },
      });
    }
    // If access token exists and is still valid, use it
    else if (accessToken.expiresAt > new Date()) {
      token = accessToken.token;
      expiresAt = accessToken.expiresAt;
    }
    // If access token exists but is expired, generate a new one
    else {
      token = crypto.randomBytes(32).toString("hex");
      await prisma.accessToken.update({
        where: { userId: user.id },
        data: {
          token,
          expiresAt,
        },
      });
    }

    // Create response and set cookie
    const response = NextResponse.json({
      message: "Sign in successful",
      user: {
        id: user.id,
        email: user.email,
        surname: user.surname,
      },
      signedIn: true,
    });

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Server error", error: "Server error", status: 500 });
  }
}
