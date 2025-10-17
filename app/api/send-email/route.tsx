import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, email, country } = await request.json()

    console.log('API called with:', { name, email, country })

    // Validate environment variables
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not found')
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    // Save user data to database
    const download = await prisma.download.create({
      data: {
        name,
        email,
      },
    })

    console.log('User data saved to database:', download.id)

    // Return success without sending email
    return NextResponse.json({ success: true, messageId: download.id })
  } catch (error) {
    console.error("Error saving user data:", error)
    return NextResponse.json({ error: "Failed to save user data" }, { status: 500 })
  }
}
