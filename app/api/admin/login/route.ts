import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    console.log('Login attempt:', { username, password })
    console.log('Expected:', { 
      username: process.env.ADMIN_USERNAME, 
      password: process.env.ADMIN_PASSWORD 
    })

    // Check admin credentials
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // Set admin session cookie
      const cookieStore = await cookies()
      cookieStore.set('admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      })

      console.log('Login successful')
      return NextResponse.json({ success: true })
    } else {
      console.log('Login failed - invalid credentials')
      return NextResponse.json({ 
        error: "Invalid credentials" 
      }, { status: 401 })
    }
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ 
      error: "Login failed" 
    }, { status: 500 })
  }
}

