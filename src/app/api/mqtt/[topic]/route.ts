import { PrismaClient } from "@/generated/prisma/default";
import { IoTDataSchema } from "@/types/schema";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const parsed = IoTDataSchema.safeParse(req.body);

  if (parsed.error) {
    return NextResponse.json({
      message: "Invalid data",
      error: "Validation failed",
      status: 400,
    });
  }

  const data = parsed.data;

  await prisma.observation.create({
    data: {
      sensorId: data.sensorId,
      value: data.ObservationValue,
    },
  });

  return NextResponse.json({ success: true, received: parsed.data });
}
