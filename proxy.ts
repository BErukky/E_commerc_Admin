import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authMiddleware = withAuth(
  function middleware(req) {
    // If the user is authenticated and visits /login, redirect to /dashboard
    if (req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow unauthenticated access to /login
        if (req.nextUrl.pathname.startsWith("/login")) {
          return true;
        }
        // Dashboard routes require a valid token
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Next.js 16 uses "proxy" as the exported function name (renamed from "middleware")
export function proxy(request: NextRequest) {
  return (authMiddleware as unknown as (req: NextRequest) => Response)(request);
}

export const config = {
  // Only run on dashboard and login routes — never on /api/auth/* to avoid loops
  matcher: ["/dashboard/:path*", "/login"],
};
