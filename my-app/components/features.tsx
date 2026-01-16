"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles, MessageSquare, TrendingUp, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: FileText,
    title: "Resume Parsing",
    description: "Advanced AI-powered resume parsing extracts and analyzes key information with 99% accuracy",
  },
  {
    icon: Sparkles,
    title: "Smart Skill Matching",
    description: "Machine learning algorithms match your skills with perfect job opportunities in real-time",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description: "Practice with AI-powered mock interviews powered by advanced language models to ace your real interviews",
  },
  {
    icon: TrendingUp,
    title: "Heatmap Analytics",
    description: "Track your application performance with detailed analytics, insights, and comprehensive success metrics",
  },
  {
    icon: MapPin,
    title: "Interview Location Map",
    description: "Find interview locations easily with integrated maps, directions, and intelligent route optimization",
  },
  {
    icon: Briefcase,
    title: "Freelance + Full-time",
    description: "Access both freelance gigs and full-time opportunities in one unified, comprehensive platform",
  },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${150 + i * 30}px`,
              height: `${150 + i * 30}px`,
              background: `radial-gradient(circle, rgba(4, 31, 43, ${0.05 + i * 0.01}) 0%, transparent 70%)`,
              left: `${i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm border-0 mb-3 sm:mb-4">
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-600 dark:text-slate-400" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            Platform Features
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 tracking-tight px-4">
          Powerful Features for
          <br />
          <span className="text-slate-600 dark:text-slate-400">Modern Professionals</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto px-4">
          Everything you need to land your dream job or find the perfect freelancer in one place
        </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className="group relative overflow-hidden border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-950 transition-all duration-500 h-full"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#041F2B] to-[#0d4a63] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  whileHover={{ scaleX: 1 }}
                />
                
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-[#041F2B]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
                
                <CardHeader className="relative pb-6">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center mb-6 group-hover:from-[#041F2B] group-hover:to-[#0d4a63] transition-all duration-500"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(4, 31, 43, 0)",
                        "0 0 20px rgba(4, 31, 43, 0.1)",
                        "0 0 0px rgba(4, 31, 43, 0)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    <Icon className="h-7 w-7 text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors duration-500" />
                  </motion.div>
                  <CardTitle className="text-xl mb-3 text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#041F2B]/5 dark:from-[#041F2B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#041F2B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                />
              </Card>
            </motion.div>
          );
        })}
          </div>
        </div>
      </div>
    </section>
  );
}
