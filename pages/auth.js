'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Book, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <header className="py-6 px-6">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <motion.div 
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-purple-100">
            <Tabs value={isSignUp ? "sign-up" : "sign-in"} onValueChange={(value) => setIsSignUp(value === "sign-up")}>
              <TabsList className="grid w-full grid-cols-2 bg-purple-100">
                <TabsTrigger value="sign-in" className="data-[state=active]:bg-white">Sign In</TabsTrigger>
                <TabsTrigger value="sign-up" className="data-[state=active]:bg-white">Sign Up</TabsTrigger>
              </TabsList>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSignUp ? "sign-up" : "sign-in"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="sign-in">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-purple-800">Welcome back!</CardTitle>
                        <CardDescription className="text-purple-600">Sign in to continue your learning journey</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-purple-800">Email</Label>
                          <Input id="email" type="email" placeholder="Enter your email" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-purple-800">Password</Label>
                          <Input id="password" type="password" placeholder="Enter your password" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                          Sign In <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-purple-200" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-purple-600">Or continue with</span>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50 text-purple-800">
                            <Book className="mr-2 h-4 w-4" />
                            Github
                          </Button>
                          <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50 text-purple-800">
                            <Book className="mr-2 h-4 w-4" />
                            Google
                          </Button>
                        </div>
                      </CardFooter>
                    </form>
                  </TabsContent>
                  <TabsContent value="sign-up">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-purple-800">Create an account</CardTitle>
                        <CardDescription className="text-purple-600">Sign up to start your learning adventure</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-purple-800">Full Name</Label>
                          <Input id="name" placeholder="Enter your full name" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-purple-800">Email</Label>
                          <Input id="email" type="email" placeholder="Enter your email" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-purple-800">Password</Label>
                          <Input id="password" type="password" placeholder="Create a password" className="border-purple-200 focus:border-purple-400 focus:ring-purple-400" />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                          Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-purple-200" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-purple-600">Or sign up with</span>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50 text-purple-800">
                            <Book className="mr-2 h-4 w-4" />
                            Github
                          </Button>
                          <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50 text-purple-800">
                            <Book className="mr-2 h-4 w-4" />
                            Google
                          </Button>
                        </div>
                      </CardFooter>
                    </form>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </Card>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-purple-600">
        <p className="text-sm">&copy; {new Date().getFullYear()} Learnzy. All rights reserved. Start your learning journey today!</p>
      </footer>
    </div>
  )
}