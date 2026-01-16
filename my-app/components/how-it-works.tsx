"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Upload, Sparkles, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds with your email or social account. No credit card required for basic features.",
  },
  {
    number: "02",
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your resume and let AI parse your skills, experience, and achievements instantly.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Get Matched",
    description: "Receive instant job matches based on your profile, skills, and preferences using AI algorithms.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Apply & Interview",
    description: "Apply to matched jobs, schedule interviews, and track your applications all in one place.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${180 + i * 35}px`,
              height: `${180 + i * 35}px`,
              background: `radial-gradient(circle, rgba(4, 31, 43, ${0.06 + i * 0.015}) 0%, transparent 70%)`,
              left: `${15 + i * 14}%`,
              top: `${15 + (i % 2) * 50}%`,
            }}
            animate={{
              scale: [1, 1.25, 1],
              x: [0, 40, -30, 0],
              y: [0, -40, 30, 0],
            }}
            transition={{
              duration: 14 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
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
          <Badge variant="secondary" className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm border-0 text-slate-700 dark:text-slate-300">
            Simple Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 tracking-tight px-4">
            How It
            <br />
            <span className="text-slate-600 dark:text-slate-400">Works</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto px-4">
            Get started in four easy steps and land your next opportunity faster than ever before
          </p>
          </motion.div>
          
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative lg:[&:nth-child(even)]:mt-16"
                >
                  <Card className="group relative overflow-hidden border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-950 transition-all duration-500 h-full">
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-[#041F2B]/10 dark:bg-[#041F2B]/20 rounded-full -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#041F2B]/0 to-[#041F2B]/0 group-hover:from-[#041F2B]/5 group-hover:to-transparent transition-all duration-500"
                    />
                    
                    <CardHeader className="relative pb-6">
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center group-hover:from-[#041F2B] group-hover:to-[#0d4a63] transition-all duration-500"
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(4, 31, 43, 0)",
                              "0 0 15px rgba(4, 31, 43, 0.2)",
                              "0 0 0px rgba(4, 31, 43, 0)",
                            ],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        >
                          <Icon className="h-8 w-8 text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors duration-500" />
                        </motion.div>
                        <span className="text-5xl font-black text-slate-200 dark:text-slate-800 group-hover:text-slate-300 dark:group-hover:text-slate-700 transition-colors duration-500">
                          {step.number}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-3 text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                        {step.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#041F2B] to-[#0d4a63] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      whileHover={{ scaleX: 1 }}
                    />
                  </Card>
                </motion.div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
