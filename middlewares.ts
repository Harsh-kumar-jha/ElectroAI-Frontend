import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for a dashboard route
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // For now, we'll simulate authentication check
    // In a real app, you'd check for a valid JWT token or session
    const isAuthenticated =
      request.cookies.get("auth-token") || request.headers.get("authorization");

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
