import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const cookie = request.cookies.get("accessToken");

    if (!cookie) {
      return NextResponse.json(
        { authenticated: false, message: "No cookie found" },
        { status: 200 }
      );
    }

    return NextResponse.next();
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
