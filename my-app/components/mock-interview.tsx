"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Video, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Brain,
  Zap,
  Target,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const interviewTypes = [
  {
    id: 1,
    title: "Technical Interview",
    description: "Practice coding challenges, system design, and technical problem-solving",
    duration: "30-60 min",
    difficulty: "All Levels",
    icon: Brain,
    features: ["Live Coding", "System Design", "Algorithm Questions", "Real-time Feedback"],
    color: "from-[#041F2B] to-[#0d4a63]",
  },
  {
    id: 2,
    title: "Behavioral Interview",
    description: "Master your answers to common behavioral questions and STAR method",
    duration: "20-45 min",
    difficulty: "All Levels",
    icon: MessageSquare,
    features: ["STAR Method", "Common Questions", "Personality Assessment", "Feedback"],
    color: "from-[#041F2B] to-[#063a4f]",
  },
  {
    id: 3,
    title: "Video Interview",
    description: "Practice video interviews with AI-powered analysis of your performance",
    duration: "15-30 min",
    difficulty: "All Levels",
    icon: Video,
    features: ["Video Recording", "Body Language Analysis", "Voice Tone Analysis", "Tips"],
    color: "from-[#041F2B] to-[#052a3a]",
  },
  {
    id: 4,
    title: "Case Study Interview",
    description: "Practice business case studies and problem-solving scenarios",
    duration: "45-90 min",
    difficulty: "Mid-Senior",
    icon: Target,
    features: ["Business Cases", "Problem Solving", "Analytical Thinking", "Solutions"],
    color: "from-[#041F2B] to-[#0a3d52]",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description: "Get detailed feedback on your answers, tone, and body language",
  },
  {
    icon: CheckCircle2,
    title: "Practice Anytime",
    description: "24/7 access to mock interviews with instant feedback",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor your improvement with detailed analytics and insights",
  },
  {
    icon: Brain,
    title: "Personalized Questions",
    description: "Questions tailored to your role, industry, and experience level",
  },
];

export function MockInterviewContent() {
  const [selectedType, setSelectedType] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${200 + i * 50}px`,
                height: `${200 + i * 50}px`,
                background: `radial-gradient(circle, rgba(4, 31, 43, ${0.08 + i * 0.02}) 0%, transparent 70%)`,
                left: `${10 + i * 18}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm border-0 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                AI-Powered Practice
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Ace Your Interviews
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Practice with AI-powered mock interviews and get detailed feedback to improve your performance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="h-14 px-8 bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white hover:from-[#052a3a] hover:to-[#0a3d52] border-0 shadow-lg text-base font-semibold"
            >
              <Mic className="h-5 w-5 mr-2" />
              Start Practice Interview
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-base font-semibold"
            >
              View Sample Questions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Interview Types */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Choose Your Interview Type
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Practice different types of interviews tailored to your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {interviewTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-950 transition-all duration-500 hover:shadow-2xl hover:shadow-[#041F2B]/10 dark:hover:shadow-[#041F2B]/20 h-full">
                  <motion.div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    whileHover={{ scaleX: 1 }}
                  />
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl sm:text-2xl mb-2 text-slate-900 dark:text-slate-100 group-hover:text-[#041F2B] dark:group-hover:text-[#0d4a63] transition-colors">
                          {type.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                          {type.description}
                        </CardDescription>
                        
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            {type.duration}
                          </Badge>
                          <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0">
                            {type.difficulty}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Features:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {type.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <CheckCircle2 className="h-4 w-4 text-[#041F2B]" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button
                      className="w-full bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white hover:from-[#052a3a] hover:to-[#0a3d52] border-0 shadow-lg"
                      onClick={() => setSelectedType(type.id)}
                    >
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Why Practice with GROEI?
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Get the confidence and skills you need to succeed in your next interview
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-950 transition-all duration-500 text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#041F2B] to-[#0d4a63] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2 text-slate-900 dark:text-slate-100">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="text-slate-700 dark:text-slate-300">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <Card className="border-0 bg-gradient-to-br from-[#041F2B] to-[#0d4a63] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[#041F2B]/20 backdrop-blur-sm" />
          <CardContent className="relative p-8 sm:p-12 md:p-16">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">95%</div>
                <div className="text-lg text-white/90">Success Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">10K+</div>
                <div className="text-lg text-white/90">Interviews Practiced</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">4.9/5</div>
                <div className="text-lg text-white/90">User Rating</div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

