"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users, Calendar } from "lucide-react"
import { format } from "date-fns"

interface AdminDashboardProps {
  downloads: {
    id: string
    name: string
    email: string
    created_at: string
  }[]
}

export function AdminDashboard({ downloads }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDownloads = downloads.filter(
    (download) =>
      download.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      download.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Date"]
    const rows = downloads.map((d) => [d.name, d.email, format(new Date(d.created_at), "PPpp")])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lumingpt-downloads-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Manage LuminGPT download requests</p>
            </div>
            <Button
              onClick={exportToCSV}
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
            >
              <Search className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Downloads</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{downloads.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Today</CardTitle>
                <Calendar className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {
                    downloads.filter(
                      (d) => format(new Date(d.created_at), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
                    ).length
                  }
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">This Week</CardTitle>
                <Search className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {
                    downloads.filter((d) => {
                      const downloadDate = new Date(d.created_at)
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return downloadDate >= weekAgo
                    }).length
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Table */}
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Download Requests</CardTitle>
              <CardDescription className="text-gray-400">View and manage all user download requests</CardDescription>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">Email</TableHead>
                      <TableHead className="text-gray-300">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDownloads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-gray-400 py-8">
                          No downloads found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDownloads.map((download) => (
                        <TableRow key={download.id} className="border-white/10 hover:bg-white/5 transition-colors">
                          <TableCell className="font-medium text-white">{download.name}</TableCell>
                          <TableCell className="text-gray-300">{download.email}</TableCell>
                          <TableCell className="text-gray-400">
                            {format(new Date(download.created_at), "PPpp")}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
