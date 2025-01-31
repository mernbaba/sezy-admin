import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

type Admin = {
  admin: boolean;
};

export const middleware = async (request: NextRequest) => {
  const userCookie = await getCookie("sezy", { cookies });
  const user = userCookie ? (JSON.parse(userCookie) as Admin) : undefined;

  if (!user) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*"],
};
