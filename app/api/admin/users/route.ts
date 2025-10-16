import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Check admin authentication
    const cookieStore = await cookies()
    const adminAuth = cookieStore.get('admin-auth')
    
    if (!adminAuth || adminAuth.value !== 'true') {
      return NextResponse.json({ 
        error: "Unauthorized" 
      }, { status: 401 })
    }

    // Fetch all downloads from database
    const downloads = await prisma.download.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ 
      success: true, 
      downloads,
      total: downloads.length 
    })
  } catch (error) {
    console.error("Error fetching downloads:", error)
    return NextResponse.json({ 
      error: "Failed to fetch downloads" 
    }, { status: 500 })
  }
}
