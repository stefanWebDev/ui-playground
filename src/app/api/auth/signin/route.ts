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

    // If no access token exists, create one
    // 30 days expiration
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    if (!accessToken) {
      const token = crypto.randomBytes(32).toString("hex");
      await prisma.accessToken.create({
        data: {
          token,
          userId: user.id,
          expiresAt,
        },
      });
      return NextResponse.json({ message: "No access token found", token, expiresAt });
    }

    // If access token exists and is still valid, return it
    if (accessToken.expiresAt > new Date()) {
      return NextResponse.json({
        message: "Token still valid",
        token: accessToken.token,
        expiresAt: accessToken.expiresAt,
      });
    }

    // If access token exists but is expired, generate a new one
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.accessToken.update({
      where: { userId: user.id },
      data: {
        token,
        expiresAt,
      },
    });

    return NextResponse.json({ message: "Received!", token, expiresAt });
  } catch {
    return NextResponse.json({ message: "Received!", error: "Server error", status: 500 });
  }
}
