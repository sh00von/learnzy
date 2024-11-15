'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Book, Trophy, Star, Rocket, Microscope, Calculator, Brain, ChevronRight, LogOut, Atom } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const MotionCard = motion(Card)

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')

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

  const achievements = [
    { name: "Science Whiz", icon: Microscope, description: "Completed 10 science quests", progress: 80 },
    { name: "Tech Guru", icon: Rocket, description: "Solved 5 coding challenges", progress: 60 },
    { name: "Math Master", icon: Calculator, description: "Achieved 100% in 3 math quizzes", progress: 40 },
    { name: "Engineering Expert", icon: Brain, description: "Built 2 virtual machines", progress: 20 },
  ]

  const recentActivities = [
    { name: "Completed 'Introduction to Atoms' quest", date: "2 days ago", icon: Atom },
    { name: "Earned 'Science Explorer' badge", date: "1 week ago", icon: Trophy },
    { name: "Started 'Basic Coding' course", date: "2 weeks ago", icon: Rocket },
  ]

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
          <nav className="flex items-center space-x-4">
            <Link href="/quests" className="text-purple-600 hover:text-purple-800 transition-colors">Quests</Link>
            <Link href="/leaderboard" className="text-purple-600 hover:text-purple-800 transition-colors">Leaderboard</Link>
            <Button variant="ghost" className="text-purple-600 hover:text-purple-800">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center p-6">
        <motion.div 
          className="w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MotionCard className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden border border-purple-100" variants={itemVariants}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-purple-800">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-2 text-purple-800">Jane Doe</h2>
                <p className="text-purple-600 mb-4">Level 5 Explorer</p>
                <div className="w-full bg-purple-100 rounded-full h-4 mb-4">
                  <div className="bg-purple-600 h-4 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-purple-600">3000 XP to next level</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-800">42</p>
                  <p className="text-sm text-purple-600">Quests Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-800">15</p>
                  <p className="text-sm text-purple-600">Badges Earned</p>
                </div>
              </CardFooter>
            </MotionCard>

            <MotionCard className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden border border-purple-100" variants={itemVariants}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-purple-100">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white">Overview</TabsTrigger>
                  <TabsTrigger value="achievements" className="data-[state=active]:bg-white">Achievements</TabsTrigger>
                  <TabsTrigger value="activity" className="data-[state=active]:bg-white">Recent Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">Your STEM Progress</CardTitle>
                    <CardDescription className="text-purple-600">Track your journey across all STEM subjects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-purple-800">Science</span>
                        <span className="text-purple-600">75%</span>
                      </div>
                      <Progress value={75} className="bg-purple-100" indicatorClassName="bg-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-purple-800">Technology</span>
                        <span className="text-purple-600">60%</span>
                      </div>
                      <Progress value={60} className="bg-purple-100" indicatorClassName="bg-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-purple-800">Engineering</span>
                        <span className="text-purple-600">40%</span>
                      </div>
                      <Progress value={40} className="bg-purple-100" indicatorClassName="bg-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-purple-800">Mathematics</span>
                        <span className="text-purple-600">80%</span>
                      </div>
                      <Progress value={80} className="bg-purple-100" indicatorClassName="bg-purple-600" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Link href="/quests">
                        Start a New Quest <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </TabsContent>
                <TabsContent value="achievements">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">Your Achievements</CardTitle>
                    <CardDescription className="text-purple-600">Badges and milestones youve reached</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <motion.div 
                          key={index}
                          className="bg-purple-50 p-4 rounded-lg border border-purple-100"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center mb-2">
                            <achievement.icon className="h-6 w-6 text-purple-600 mr-2" />
                            <h3 className="text-lg font-semibold text-purple-800">{achievement.name}</h3>
                          </div>
                          <p className="text-sm text-purple-600 mb-2">{achievement.description}</p>
                          <Progress value={achievement.progress} className="bg-purple-100" indicatorClassName="bg-purple-600" />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </TabsContent>
                <TabsContent value="activity">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">Recent Activity</CardTitle>
                    <CardDescription className="text-purple-600">Your latest adventures in STEM</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <motion.li 
                          key={index}
                          className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <activity.icon className="h-6 w-6 text-purple-600 mr-4" />
                          <div>
                            <p className="text-purple-800">{activity.name}</p>
                            <p className="text-sm text-purple-600">{activity.date}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </MotionCard>
          </div>
        </motion.div>
      </main>

      <footer className="bg-white text-purple-600 py-4 text-center border-t border-purple-100">
        <p className="text-sm">&copy; {new Date().getFullYear()} Learnzy. All rights reserved. Keep exploring and learning!</p>
      </footer>
    </div>
  )
}