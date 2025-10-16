import { NextResponse } from "next/server"

// TODO: Install and configure Firebase or Supabase
// For Firebase:
// import { initializeApp } from 'firebase/app'
// import { getFirestore, collection, addDoc } from 'firebase/firestore'
//
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   // ... other config
// }
//
// const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)

// For Supabase:
// import { createClient } from '@supabase/supabase-js'
//
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// )

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    // Validate input
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // TODO: Save to Firebase
    // await addDoc(collection(db, 'submissions'), {
    //   name,
    //   email,
    //   createdAt: new Date().toISOString(),
    // })

    // TODO: Save to Supabase
    // const { error } = await supabase
    //   .from('submissions')
    //   .insert([{ name, email, created_at: new Date().toISOString() }])
    //
    // if (error) throw error

    console.log("[v0] Form submission saved:", { name, email })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving form submission:", error)
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
  }
}
