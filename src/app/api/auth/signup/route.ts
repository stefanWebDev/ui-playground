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
      return NextResponse.json({ message: "Invalid data", error: "Validation failed", status: 400 });
    }

    const password = parsed.data?.password;

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const user = await prisma.user.create({
      data: { ...parsed.data, password: hashedPassword },
    });

    return NextResponse.json({ message: "User created", user });
  } catch {
    return NextResponse.json({ message: "Invalid data", error: "Server error", status: 500 });
  }
}
