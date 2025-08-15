import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { topic: string } }) {
  const body = await req.json();
  console.log(`Received POST request for topic: blub`, body);
  return NextResponse.json({ success: true, topic: "blub", received: body.value });
}
