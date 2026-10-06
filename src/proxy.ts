import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const rol = req.auth?.user?.rol;

  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (req.auth.user.debeCambiarPassword && !pathname.startsWith("/cuenta")) {
    return NextResponse.redirect(new URL("/cuenta/password", req.url));
  }

  if (pathname.startsWith("/joven") && rol !== "JOVEN") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.startsWith("/asesor") && rol !== "ASESOR") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.startsWith("/nacional") && rol !== "NACIONAL") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/joven/:path*", "/asesor/:path*", "/nacional/:path*", "/cuenta/:path*"],
};
