"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const benefits = [
  "24/7 AI Support",
  "100% Free to Start",
  "Instant Matching",
];

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden border-0 bg-white dark:bg-slate-950"
      >
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-[#041F2B]/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-[#041F2B]/8 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        <div className="relative p-6 sm:p-8 md:p-12 lg:p-20 text-center space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight max-w-4xl mx-auto px-4">
              Start your career smarter today
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
              Join thousands of freelancers and job seekers who found their perfect match using AI-powered technology
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4"
          >
            <Button 
              size="lg" 
              className="group bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-2xl px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base md:text-lg font-semibold border-0 w-full sm:w-auto" 
              asChild
            >
              <Link href="/signup" className="flex items-center justify-center gap-2">
                Create Free Account
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto" 
              asChild
            >
              <Link href="/demo">Watch Demo</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-8 text-slate-600 dark:text-slate-400"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <Check className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
        </div>
      </div>
    </section>
  );
}
