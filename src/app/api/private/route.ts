import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Private API route accessed");
  try {
    const userName = request.headers.get("x-user-name");
    const userId = request.headers.get("x-user-id");
    const userEmail = request.headers.get("x-user-email");

    console.log("User Name:", request.headers.get("x-user-name"));

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: userId,
        name: userName,
        email: userEmail,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal Server Errorsss" }, { status: 500 });
  }
}
