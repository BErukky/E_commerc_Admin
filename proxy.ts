import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authMiddleware = withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
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
  matcher: ["/dashboard/:path*"],
};
