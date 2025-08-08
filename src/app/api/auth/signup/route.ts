import { PrismaClient } from "@/generated/prisma/client";
import { FormDataUserSchema } from "@/types/schema";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.json();

  const users = await prisma.user.findMany();

  const parsed = FormDataUserSchema.safeParse(data);

  console.log("Users:", users);

  return NextResponse.json({ message: "Received!", error: parsed.error?.message });
}
