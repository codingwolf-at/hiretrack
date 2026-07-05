import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const AUTH_ROUTES = ["/login", "/signup"];

// Standard @supabase/ssr session-refresh pattern: getUser() re-validates the
// session and setAll writes any refreshed tokens onto both the request
// (for downstream RSCs) and the response (for the browser).
export default async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                );
                response = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });

    const { data: { user } } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

    if (user && (isAuthRoute || pathname === "/")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!user && !isAuthRoute && pathname !== "/") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
    ],
};
