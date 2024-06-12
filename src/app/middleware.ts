import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export function withAuth(req: NextRequest) {
    const token = cookies().get('token');
    if (!token && req.nextUrl.pathname.startsWith('/books')) {
        return NextResponse.redirect(new URL('/', req.url))
    } else {
        return NextResponse.next()
    }
}
