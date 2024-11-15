'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Book, Trophy, Medal, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for the leaderboard
const leaderboardData = [
  { id: 1, name: "Alice Johnson", score: 15000, avatar: "/avatars/alice.jpg" },
  { id: 2, name: "Bob Smith", score: 14500, avatar: "/avatars/bob.jpg" },
  { id: 3, name: "Charlie Brown", score: 14000, avatar: "/avatars/charlie.jpg" },
  { id: 4, name: "Diana Prince", score: 13500, avatar: "/avatars/diana.jpg" },
  { id: 5, name: "Ethan Hunt", score: 13000, avatar: "/avatars/ethan.jpg" },
  { id: 6, name: "Fiona Apple", score: 12500, avatar: "/avatars/fiona.jpg" },
  { id: 7, name: "George Lucas", score: 12000, avatar: "/avatars/george.jpg" },
  { id: 8, name: "Hannah Montana", score: 11500, avatar: "/avatars/hannah.jpg" },
  { id: 9, name: "Ian McKellen", score: 11000, avatar: "/avatars/ian.jpg" },
  { id: 10, name: "Julia Roberts", score: 10500, avatar: "/avatars/julia.jpg" },
]

export default function LeaderboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(leaderboardData.length / itemsPerPage)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const paginatedData = leaderboardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <header className="bg-white py-4 px-6 shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold flex items-center text-purple-600">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Book className="mr-2 h-8 w-8" />
            </motion.div>
            <span>Learnzy</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/quests" className="text-purple-600 hover:text-purple-800 transition-colors">Quests</Link>
            <Link href="/profile" className="text-purple-600 hover:text-purple-800 transition-colors">Profile</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center p-6">
        <motion.div 
          className="w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-purple-100">
            <CardHeader className="bg-purple-600 text-white p-6">
              <CardTitle className="text-3xl font-bold flex items-center justify-center">
                <Trophy className="mr-2 h-8 w-8" />
                Overall Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {paginatedData.map((user, index) => (
                  <motion.li 
                    key={user.id}
                    className="flex items-center justify-between bg-purple-50 p-4 rounded-lg"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-purple-800 w-8">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </span>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-purple-800">{user.name}</p>
                        <p className="text-sm text-purple-600">{user.score.toLocaleString()} points</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      <Medal className="mr-1 h-4 w-4" />
                      Rank {(currentPage - 1) * itemsPerPage + index + 1}
                    </Badge>
                  </motion.li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-6">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <span className="text-purple-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <footer className="bg-white text-purple-600 py-4 text-center border-t border-purple-100">
        <p className="text-sm">&copy; {new Date().getFullYear()} Learnzy. All rights reserved. Keep learning and climbing the ranks!</p>
      </footer>
    </div>
  )
}