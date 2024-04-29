import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    const token = req.cookies.get('jwt')

    if (token) {
        req.headers.set('Authorization', `Bearer ${token}`)
    }

    return NextResponse.next()
}