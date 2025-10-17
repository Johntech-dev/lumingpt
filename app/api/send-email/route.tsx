import { NextResponse } from "next/server"
import { Resend } from 'resend'
import { readFileSync } from 'fs'
import { join } from 'path'
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    // Save user data to database
    const download = await prisma.download.create({
      data: {
        name,
        email,
      },
    })

    console.log('User data saved to database:', download.id)

    // Read the PDF file
    const pdfPath = join(process.cwd(), 'public', 'AKEA GPT _ Activation Prompt.pdf')
    const pdfBuffer = readFileSync(pdfPath)

    // Send email with PDF attachment
    const { data, error } = await resend.emails.send({
      from: 'LuminGPT <onboarding@resend.dev>',
      to: [email],
      subject: 'Your AKEA GPT Activation Prompt is Ready! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #3b82f6; text-align: center;">Welcome to LuminGPT, ${name}! 🎉</h1>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin: 20px 0;">
            <h2 style="margin: 0; font-size: 24px;">Your AKEA GPT Activation Prompt</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Amplify Your Intelligence</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Thank you for joining the future of amplified intelligence! Your personalized AKEA GPT Activation Prompt is attached to this email.
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What's Next?</h3>
            <ul style="color: #374151; line-height: 1.6;">
              <li>Download and save the attached PDF</li>
              <li>Follow the activation steps in the prompt</li>
              <li>Join our WhatsApp community for support and updates</li>
              <li>Start amplifying your intelligence today!</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://chat.whatsapp.com/LgpXpfkOZC6ANUWNWxp3I8?mode=wwt" 
               style="background: #25d366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              📱 Join WhatsApp Community
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; text-align: center; margin-top: 30px;">
            Questions? Reply to this email or reach out to us on WhatsApp!
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'AKEA-GPT-Activation-Prompt.pdf',
          content: pdfBuffer,
        },
      ],
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log("Email sent successfully to:", email)
    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
