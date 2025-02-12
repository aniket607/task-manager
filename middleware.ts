import { auth } from "@/auth"

export default auth((req) => {
  const isPublicRoute = ['/login', '/register', '/'].includes(req.nextUrl.pathname)

  // Redirect authenticated users trying to access public routes
  if (isPublicRoute && req.auth) {
    return Response.redirect(new URL('/dashboard', req.nextUrl))
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isPublicRoute && !req.auth) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 