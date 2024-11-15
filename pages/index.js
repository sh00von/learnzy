'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Brain, Rocket, Trophy, Star, Menu, Search, ChevronRight, X, Check, RotateCcw, Heart, Zap, User, Calculator } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from 'next/link';

const stemCategories = {
  science: ["Biology", "Chemistry", "Physics", "Earth Science"],
  technology: ["Computers", "Robotics", "Coding", "Internet"],
  engineering: ["Mechanical", "Electrical", "Civil", "Aerospace"],
  math: ["Algebra", "Geometry", "Arithmetic", "Statistics"],
};

const categoryIcons = {
  science: Brain,
  technology: Rocket,
  engineering: Zap,
  math: Calculator,
};

const PixelBorder = ({ children, className = "" }) => (
  <div className={`relative p-1 bg-gray-800 ${className}`}>
    <div className="absolute inset-0 bg-gray-800 border-2 border-gray-600" style={{ clipPath: 'polygon(0 25%, 25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%)' }}></div>
    <div className="relative bg-white z-10">{children}</div>
  </div>
);

export default function LearnzyQuest() {
  const [category, setCategory] = useState('science');
  const [difficulty, setDifficulty] = useState('easy');
  const [topic, setTopic] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [hasPreviousQuiz, setHasPreviousQuiz] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const storedQuiz = localStorage.getItem('learnzyQuiz');
    
    if (storedQuiz) {
      const quizData = JSON.parse(storedQuiz);
      
      if (!quizData.completed) {
        setHasPreviousQuiz(true);
      } else {
        setHasPreviousQuiz(false);
        localStorage.removeItem('learnzyQuiz'); // Clear completed quiz from localStorage
      }
    } else {
      setHasPreviousQuiz(false); // No stored quiz, ensure button is hidden
    }
    
    const storedPoints = localStorage.getItem('learnzyPoints');
    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints, 10));
    }
  }, []);
  
  useEffect(() => {
    if (topic) {
      const filteredSuggestions = stemCategories[category].filter(t =>
        t.toLowerCase().includes(topic.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [topic, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/generate-quiz', {
        category,
        difficulty,
        topic,
      });
      const newQuestions = response.data;
      setQuestions(newQuestions);
      setCurrentQuestion(0);
      setQuizActive(true);
      setQuizCompleted(false);
      setScore(0);
      setLives(5);
      localStorage.setItem('learnzyQuiz', JSON.stringify({
        questions: newQuestions,
        currentQuestion: 0,
        score: 0,
        lives: 5,
        completed: false
      }));
    } catch (error) {
      setError("Oops! Our learning engine encountered a glitch. Let's try again!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
  
    const currentQuestionData = questions[currentQuestion];
    const correctAnswer = currentQuestionData?.answer;
    
    if (!correctAnswer) {
      console.error("Correct answer not available for this question.");
      return;
    }
  
    const isCorrect = selectedAnswer.toLowerCase() === correctAnswer.toLowerCase();
    setIsAnswerCorrect(isCorrect);
  
    if (isCorrect) {
      const pointsGained = 100 * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3);
      setScore(prevScore => prevScore + pointsGained);
      setTotalPoints(prevTotal => {
        const newTotal = prevTotal + pointsGained;
        localStorage.setItem('learnzyPoints', newTotal.toString());
        return newTotal;
      });
    } else {
      setLives(prevLives => prevLives - 1);
    }
  
    setTimeout(() => {
      if (lives > 1 && currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setIsAnswerCorrect(null);
      } else {
        setQuizCompleted(true);
        setQuizActive(false);
      }
      
      localStorage.setItem('learnzyQuiz', JSON.stringify({
        questions,
        currentQuestion: currentQuestion + 1,
        score: isCorrect ? score + 100 : score,
        lives: isCorrect ? lives : lives - 1,
        completed: currentQuestion === questions.length - 1 || lives <= 1
      }));
    }, 1500);
  };

  const handleCloseQuiz = () => {
    setQuizActive(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setIsAnswerCorrect(null);
    setScore(0);
    setLives(3);
    localStorage.removeItem('learnzyQuiz');
    setHasPreviousQuiz(false);
  };

  const handleResumePreviousQuiz = () => {
    const storedQuiz = JSON.parse(localStorage.getItem('learnzyQuiz'));
    if (storedQuiz) {
      setQuestions(storedQuiz.questions);
      setCurrentQuestion(storedQuiz.currentQuestion);
      setScore(storedQuiz.score);
      setLives(storedQuiz.lives);
      setQuizCompleted(storedQuiz.completed);
      setQuizActive(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-pixel">
      <header className="bg-gray-800 py-4 px-6 border-b-4 border-gray-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center text-green-400">
            <Book className="mr-2 h-6 w-6" />
            <span>Learnzy</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/subjects" className="text-gray-300 hover:text-green-400 transition-colors">Subjects</Link>
            <Link href="/achievements" className="text-gray-300 hover:text-green-400 transition-colors">Achievements</Link>
            <Link href="/profile" className="text-gray-300 hover:text-green-400 transition-colors">Profile</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-green-400 hover:text-green-500">
                    <Search className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="ghost" size="icon" className="text-green-400 hover:text-green-500 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="text-green-400 font-medium">{totalPoints}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row gap-8 max-w-7xl mx-auto w-full p-6">
        <section className="md:w-2/3">
          <PixelBorder className="w-full">
            <Card className="w-full bg-gray-800 shadow-md overflow-hidden border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-400">Create Your Learning Quest</CardTitle>
                <CardDescription className="text-gray-400">Customize your learning experience and embark on an educational adventure!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="category" className="text-lg font-medium text-green-400 py-4">
                      Choose Your Learning Category
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                      {Object.keys(stemCategories).map((cat) => {
                        const Icon = categoryIcons[cat];
                        return (
                          <Button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setCategory(cat);
                              setTopic('');
                              setSuggestions([]);
                            }}
                            variant={category === cat ? "default" : "outline"}
                            className={`flex items-center justify-center py-6 transition-all duration-300 ease-in-out ${
                              category === cat 
                                ? 'bg-green-500 hover:bg-green-600 text-black' 
                                : 'bg-gray-700 hover:bg-gray-600 text-green-400 border border-green-500'
                            }`}
                          >
                            <Icon className="mr-2 h-6 w-6" />
                            <span className="text-lg capitalize">{cat}</span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="difficulty" className="text-lg font-medium text-green-400 mb-2">
                      Select Difficulty
                    </Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="w-full bg-gray-700 border border-green-500  text-green-400">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Beginner</SelectItem>
                        <SelectItem value="medium">Intermediate</SelectItem>
                        <SelectItem value="hard">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="topic" className="text-lg font-medium text-green-400 mb-2">
                      Learning Topic (Optional)
                    </Label>
                    <div className="relative">
                      <Input
                        id="topic"
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter a learning topic"
                        className="w-full bg-gray-700 border border-green-500 rounded-md text-green-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <AnimatePresence>
                        {suggestions.length > 0 && (
                          <motion.ul
                            className="absolute z-10 mt-1 w-full border border-green-500 rounded-md bg-gray-800 shadow-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {suggestions.map((suggestion, index) => (
                              <motion.li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                                onClick={() => {
                                  setTopic(suggestion);
                                  setSuggestions([]);
                                }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Book className="inline-block mr-2 text-green-400" size={16} />
                                {suggestion}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="flex-1 text-lg bg-green-500 hover:bg-green-600 text-black rounded-md py-3 transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? (
                        <Book className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <Book className="mr-2 h-5 w-5" />
                      )}
                      {loading ? 'Loading Quest...' : 'Start Learning Quest!'}
                    </Button>

                    {hasPreviousQuiz && (
                      <Button
                        type="button"
                        onClick={handleResumePreviousQuiz}
                        className="flex-1 text-lg bg-blue-500 hover:bg-blue-600 text-black rounded-md py-3 transition-all duration-300"
                      >
                        <RotateCcw className="mr-2 h-5 w-5" />
                        Continue Quest
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </PixelBorder>
        </section>

        <section className="md:w-1/3">
          <PixelBorder className="w-full">
            <Card className="w-full bg-gray-800 shadow-md overflow-hidden border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-400">Quest Progress</CardTitle>
                <CardDescription className="text-gray-400">Track your learning journey and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                {quizActive ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-green-400">Question {currentQuestion + 1}/{questions.length}</h2>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-gray-700 text-green-400">
                          <Star className="mr-1 h-4 w-4" />
                          {score}
                        </Badge>
                        <div className="flex items-center">
                          {Array.from({ length: lives }).map((_, index) => (
                            <Heart key={index} className="h-5 w-5 text-red-500" fill="currentColor" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Progress value={(currentQuestion / questions.length) * 100} className="w-full bg-gray-700" indicatorClassName="bg-green-500" />
                    {questions[currentQuestion] && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-green-400">{questions[currentQuestion].question}</h3>
                        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                          {questions[currentQuestion].options.map((option, idx) => (
                            <div key={idx} className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem 
                                value={option}
                                id={`question-${currentQuestion}-option-${idx}`}
                                className="border-2 border-green-500 text-green-400 focus:border-green-400"
                              />
                              <Label 
                                htmlFor={`question-${currentQuestion}-option-${idx}`}
                                className="text-gray-300"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <Button 
                          onClick={handleAnswerSubmit} 
                          className="w-full bg-green-500 hover:bg-green-600 text-black transition-all duration-300"
                          disabled={!selectedAnswer}
                        >
                          Submit Answer
                        </Button>
                      </div>
                    )}
                    {isAnswerCorrect !== null && (
                      <motion.div 
                        className={`mt-4 p-4 rounded-md ${isAnswerCorrect ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {isAnswerCorrect ? (
                          <p className="flex items-center">
                            <Check className="mr-2 h-5 w-5" /> Correct! You gained {100 * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3)} points!
                          </p>
                        ) : (
                          <p className="flex items-center">
                            <X className="mr-2 h-5 w-5" /> Oops! The correct answer was: {questions[currentQuestion].answer}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>
                ) : quizCompleted ? (
                  <div className="text-center space-y-4">
                    <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
                    <h2 className="text-2xl font-bold text-green-400">Quest Completed!</h2>
                    <p className="text-lg text-green-400">You scored {score} points!</p>
                    <p className="text-md text-gray-400">Great job, young learner! Keep exploring and growing!</p>
                    <Button 
                      onClick={handleCloseQuiz} 
                      className="w-full bg-green-500 hover:bg-green-600 text-black transition-all duration-300"
                    >
                      Start New Quest
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Book className="mx-auto h-16 w-16 text-green-400" />
                    <h2 className="text-2xl font-bold text-green-400">Ready to Learn?</h2>
                    <p className="text-gray-400">Set up your quest and start your learning adventure!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </PixelBorder>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8 border-t-4 border-gray-600">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">About Learnzy</h3>
            <p className="text-sm">Learnzy is your ultimate destination for interactive learning across all educational sectors. Explore, learn, and grow with fun quizzes!</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/subjects" className="text-sm hover:text-green-400 transition-colors">Subjects</Link></li>
              <li><Link href="/achievements" className="text-sm hover:text-green-400 transition-colors">Achievements</Link></li>
              <li><Link href="/profile" className="text-sm hover:text-green-400 transition-colors">Profile</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-green-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">Connect with Us</h3>
            <div className="flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-green-400 hover:text-green-500 transition-colors">
                      <Book className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-green-400 hover:text-green-500 transition-colors">
                      <Rocket className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-green-400 hover:text-green-500 transition-colors">
                      <Brain className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Learnzy. All rights reserved. Learn responsibly!</p>
        </div>
      </footer>

      <AnimatePresence>
        {error && (
          <motion.div 
            className="fixed bottom-4 right-4 bg-red-800 text-red-200 p-4 rounded-md shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}