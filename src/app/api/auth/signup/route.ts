import { PrismaClient } from "@/generated/prisma/client";
import { FormDataUserSchema } from "@/types/schema";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();

  const parsed = FormDataUserSchema.safeParse(data);

  const users = await prisma.user.findMany();

  console.log("Users:", users);

  if (parsed.success) {
    const user = await prisma.user.create({
      data: parsed.data,
    });
    return NextResponse.json({ message: "User created", user });
  }

  return NextResponse.json({ message: "Received!", error: parsed.error?.message });
}
