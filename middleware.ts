import { NextRequest, NextResponse } from "next/server";
import { localStorageKeys } from "./app/utils/enum";

export default function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get(localStorageKeys.AUTH_TOKEN)?.value;
  const { pathname } = req.nextUrl;
  const token = tokenCookie ? JSON.parse(tokenCookie) : "";
  if (token?.accessToken && pathname !== "/home") {
    return NextResponse.redirect(new URL("/home", req.url));
  } else if (!token?.accessToken && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
};
