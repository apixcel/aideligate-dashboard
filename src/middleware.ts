import { createClient } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { supabase, response } = createClient(req);

  const publicRoutes = ["/login", "/register", "/forgot-password", "/verification"];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
