import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;

  // If ?page=0 is present
  if (
    url.searchParams.get("page") === "0" ||
    url.searchParams.get("page") === "1"
  ) {
    url.searchParams.delete("page"); // remove it

    return NextResponse.redirect(url, 301); // permanent redirect
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)", // applies to all routes
};
