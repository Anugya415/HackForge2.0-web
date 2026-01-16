"use client";

import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Hero() {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random values only on client side
    setParticles(
      Array.from({ length: 12 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-white dark:bg-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              background: `radial-gradient(circle, rgba(4, 31, 43, ${0.1 + i * 0.02}) 0%, transparent 70%)`,
              left: `${10 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              scale: [1, 1.3 + i * 0.1, 1],
              x: [0, 50 + i * 20, -30, 0],
              y: [0, -50 - i * 20, 30, 0],
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
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#041F2B]/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 150, -80, 0],
            y: [0, -150, 80, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0d4a63]/12 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -150, 80, 0],
            y: [0, 150, -80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {particles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[#041F2B]/20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center lg:min-h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 flex flex-col justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#041F2B]/10 to-[#0d4a63]/10 dark:from-[#041F2B]/20 dark:to-[#0d4a63]/20 backdrop-blur-md border border-[#041F2B]/20 dark:border-[#041F2B]/30 shadow-sm"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#041F2B] dark:text-[#0d4a63]" />
                </motion.div>
                <span className="text-xs font-semibold text-[#041F2B] dark:text-[#0d4a63] tracking-tight whitespace-nowrap">
                  AI-Powered Matchmaking
                </span>
              </motion.div>

              <div className="space-y-4 sm:space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight"
                >
                  Upload Once.
                  <br />
                  <span className="text-slate-600 dark:text-slate-400">Get Matched</span>
                  <br />
                  <motion.span
                    className="relative inline-block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Instantly.
                    <motion.span
                      className="absolute -bottom-2 left-0 right-0 h-2 sm:h-3 bg-white dark:bg-slate-950"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      style={{ originX: 0 }}
                    />
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
                >
                  AI-powered platform connecting talented professionals with perfect opportunities through intelligent matching.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
              >
                <Button 
                  size="lg" 
                  className="group bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 border-0 shadow-lg px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold w-full sm:w-auto" 
                  asChild
                >
                  <Link href="/signup" className="flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 w-full sm:w-auto" 
                  asChild
                >
                  <Link href="/upload-resume" className="flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                    Upload Resume
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-4 sm:pt-8 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">98% Match</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Accuracy</div>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-8 sm:h-12 bg-slate-200/50 dark:bg-slate-800/50"></div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">50K+ Jobs</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Available</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:flex items-center justify-center h-full"
            >
              <div className="relative w-full max-w-md">
                <motion.div
                  className="absolute inset-0 bg-slate-200 dark:bg-slate-800 rounded-3xl -rotate-6"
                  animate={{
                    rotate: [-6, -4, -6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-slate-300 dark:bg-slate-700 rounded-3xl rotate-6"
                  animate={{
                    rotate: [6, 4, 6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="relative bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm rounded-3xl border-0 p-8 sm:p-10 lg:p-12 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="space-y-8">
                    <motion.div
                      className="w-24 h-24 rounded-2xl bg-slate-900 dark:bg-slate-100 flex items-center justify-center mx-auto shadow-lg"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Upload className="h-12 w-12 text-white dark:text-slate-900" />
                    </motion.div>
                    
                    <div className="text-center space-y-3">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        AI Resume Parser
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                        Advanced parsing technology extracts and analyzes your professional profile with precision
                      </p>
                    </div>
                    
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
