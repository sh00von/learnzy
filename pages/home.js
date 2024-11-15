import Link from 'next/link'
import { motion } from 'framer-motion'
import { Book, Rocket, Palette, Music, Globe, Calculator, ChevronRight, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const MotionLink = motion(Link)

const PixelBorder = ({ children }) => (
  <div className="relative p-1 bg-gray-800">
    <div className="absolute inset-0 bg-gray-800 border-2 border-gray-600" style={{ clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)' }}></div>
    <div className="relative bg-white z-10">{children}</div>
  </div>
)

export default function LearnzyLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-pixel">
      <header className="bg-gray-800 py-4 px-6 border-b-4 border-gray-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold flex items-center text-green-400">
            <Book className="mr-2 h-8 w-8" />
            <span>Learnzy</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#subjects" className="text-gray-300 hover:text-green-400 transition-colors">Subjects</Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-green-400 transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-gray-300 hover:text-green-400 transition-colors">Pricing</Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-green-400 transition-colors">Testimonials</Link>
          </nav>
          <Button asChild className="bg-green-500 hover:bg-green-600 text-black font-bold">
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-green-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Level Up Your Childs Learning
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Embark on an 8-bit adventure through education!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-black font-bold text-lg">
                <Link href="/explore">
                  Start Your Quest <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="subjects" className="py-16 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-green-400">Choose Your Class</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { icon: Rocket, title: "Science", color: "bg-blue-500 text-white" },
                { icon: Calculator, title: "Math", color: "bg-green-500 text-white" },
                { icon: Globe, title: "Geography", color: "bg-yellow-500 text-white" },
                { icon: Palette, title: "Art", color: "bg-pink-500 text-white" },
                { icon: Music, title: "Music", color: "bg-purple-500 text-white" },
                { icon: Book, title: "Literature", color: "bg-red-500 text-white" },
              ].map((subject, index) => (
                <motion.div
                  key={subject.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PixelBorder>
                    <div className={`p-6 ${subject.color}`}>
                      <subject.icon className="h-12 w-12 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{subject.title}</h3>
                      <p className="text-sm">Level up in {subject.title.toLowerCase()} through lessons!</p>
                    </div>
                  </PixelBorder>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 px-6 bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-green-400">Game Mechanics</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Select Your Avatar", description: "Choose your character and customize their skills." },
                { title: "Complete Quests", description: "Tackle challenges and earn experience points as you learn." },
                { title: "Track Your Progress", description: "Watch your character level up as you master new concepts." },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <PixelBorder>
                    <div className="bg-gray-800 p-6">
                      <div className="bg-green-500 text-black rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">{index + 1}</div>
                      <h3 className="text-xl font-semibold mb-2 text-center text-green-400">{step.title}</h3>
                      <p className="text-gray-300 text-center">{step.description}</p>
                    </div>
                  </PixelBorder>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16 px-6 bg-gray-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-green-400">Choose Your Power-Up</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Novice", price: "Free", features: ["Access to 5 subjects", "Limited quests", "Basic character customization", "Email support"] },
                { title: "Adventurer", price: "$9.99/month", features: ["Access to all subjects", "Unlimited quests", "Advanced character customization", "Priority email support", "Monthly boss battles"] },
                { title: "Legend", price: "$19.99/month", features: ["All Adventurer features", "1-on-1 mentoring", "Exclusive legendary quests", "Custom quest creation", "VIP game events"] },
              ].map((plan, index) => (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <PixelBorder>
                    <div className={`bg-gray-900 p-6 ${index === 1 ? 'border-4 border-green-500' : ''}`}>
                      <h3 className="text-2xl font-bold mb-4 text-green-400">{plan.title}</h3>
                      <p className="text-3xl font-bold mb-6 text-white">{plan.price}</p>
                      <ul className="mb-6 space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-300">
                            <Star className="h-5 w-5 text-yellow-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-black font-bold">
                        <Link href={`/signup/${plan.title.toLowerCase().replace(' ', '-')}`}>
                          Select
                        </Link>
                      </Button>
                    </div>
                  </PixelBorder>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 px-6 bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-green-400">Player Reviews</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: "Sarah, Parent", content: "Learnzy turned my daughter into a learning superhero! She's conquering subjects like never before!" },
                { name: "Mike, 10 years old", content: "Learnzy is my favorite game! I love leveling up my brain while having fun!" },
                { name: "Emily, Teacher", content: "As an educator, I'm impressed by Learnzy's curriculum. It's like an educational RPG!" },
                { name: "Tom, Parent", content: "The progress tracking is fantastic. I can see my son's skills improving in real-time!" },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PixelBorder>
                    <div className="bg-gray-800 p-6">
                      <p className="mb-4 text-gray-300 italic">{testimonial.content}</p>
                      <p className="font-semibold text-green-400">{testimonial.name}</p>
                    </div>
                  </PixelBorder>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-green-500 text-black text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Epic Learning Quest?</h2>
            <p className="text-xl mb-8">Join Learnzy today and watch your child level up in knowledge and skills!</p>
            <Button asChild size="lg" className="bg-black text-green-500 hover:bg-gray-800 text-lg font-bold">
              <Link href="/get-started">
                Begin Your Adventure <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8 border-t-4 border-gray-600">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">About Learnzy</h3>
            <p className="text-sm">Learnzy transforms learning into an epic 8-bit adventure for children across all educational realms.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/subjects" className="text-sm hover:text-green-400 transition-colors">Subjects</Link></li>
              <li><Link href="/how-it-works" className="text-sm hover:text-green-400 transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="text-sm hover:text-green-400 transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-green-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm hover:text-green-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-green-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-green-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-green-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Connect with Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Learnzy. All rights reserved. Empowering young minds through pixel-perfect learning.</p>
        </div>
      </footer>
    </div>
  )
}