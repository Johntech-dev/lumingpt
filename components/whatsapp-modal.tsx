"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface WhatsAppModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WhatsAppModal({ open, onOpenChange }: WhatsAppModalProps) {
  // TODO: Replace with your WhatsApp group link
  const whatsappLink = "https://wa.me/YOURGROUPID"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a0f] border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Thank You! 🎉</DialogTitle>
          <DialogDescription className="text-gray-300 text-center text-base">
            Thank you for downloading the IA Prompt! Join our WhatsApp community to connect with other IA pioneers.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={() => {
              window.open(whatsappLink, "_blank")
              onOpenChange(false)
            }}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-6 text-lg rounded-xl shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Join WhatsApp Community
          </Button>

          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full border-white/10 text-gray-300 hover:bg-white/5 py-6 text-lg rounded-xl"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
