"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Building2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { 
    label: "Total Jobs", 
    value: 50, 
    suffix: "K+", 
    icon: TrendingUp, 
    delay: 0, 
    iconColor: "from-[#041F2B] to-[#0a3d52]",
    hoverGlow: "hover:shadow-[#041F2B]/20"
  },
  { 
    label: "Freelancers", 
    value: 25, 
    suffix: "K+", 
    icon: Users, 
    delay: 0.1, 
    iconColor: "from-[#041F2B] to-[#0d4a63]",
    hoverGlow: "hover:shadow-[#041F2B]/20",
    hasQuarterCircle: true
  },
  { 
    label: "Companies", 
    value: 5, 
    suffix: "K+", 
    icon: Building2, 
    delay: 0.2, 
    iconColor: "from-[#041F2B] to-[#063a4f]",
    hoverGlow: "hover:shadow-[#041F2B]/20"
  },
  { 
    label: "Successful Matches", 
    value: 100, 
    suffix: "K+", 
    icon: CheckCircle2, 
    delay: 0.3, 
    iconColor: "from-[#041F2B] to-[#052a3a]",
    hoverGlow: "hover:shadow-[#041F2B]/20"
  },
];

function AnimatedNumber({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 mb-2 sm:mb-3"
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0 }}
      transition={{ duration: 0.5, delay: delay + 0.3, type: "spring", stiffness: 200 }}
    >
      {count}{suffix}
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-20 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${250 + i * 40}px`,
              height: `${250 + i * 40}px`,
              background: `radial-gradient(circle, rgba(4, 31, 43, ${0.08 + i * 0.02}) 0%, transparent 70%)`,
              left: `${i * 20}%`,
              top: `${10 + (i % 2) * 40}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
          const Icon = stat.icon;
          const position = index % 2 === 0 ? "top" : "bottom";
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: position === "top" ? -30 : 30, scale: 0.95, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: stat.delay, type: "spring", stiffness: 150 }}
              whileHover={{ y: -12, scale: 1.03, rotateY: 2 }}
              className="relative"
            >
              <Card className="group relative overflow-visible border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-950 hover:shadow-2xl hover:shadow-[#041F2B]/10 dark:hover:shadow-[#041F2B]/20 transition-all duration-500 h-full">
                {stat.hasQuarterCircle && (
                  <motion.div
                    className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#041F2B] to-[#0d4a63] rounded-full opacity-70 dark:opacity-50 z-10"
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={isInView ? { scale: 1, rotate: 0, opacity: 0.7 } : { scale: 0 }}
                    transition={{ duration: 0.8, delay: stat.delay + 0.4, type: "spring", stiffness: 150 }}
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: stat.delay,
                    }}
                  />
                )}
                
                <motion.div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.iconColor} opacity-0 group-hover:opacity-8 rounded-full blur-2xl transition-opacity duration-500`}
                  animate={{
                    scale: isInView ? [1, 1.3, 1] : 1,
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: stat.delay,
                    ease: "easeInOut",
                  }}
                />
                
                <CardContent className="p-4 sm:p-6 md:p-8 text-center relative z-0">
                  <motion.div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.iconColor} mb-6 shadow-lg shadow-[#041F2B]/30 relative`}
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    initial={{ scale: 0, rotate: -180, y: -50 }}
                    animate={isInView ? { scale: 1, rotate: 0, y: 0 } : { scale: 0 }}
                    transition={{ duration: 0.8, delay: stat.delay + 0.2, type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: stat.delay,
                      }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.iconColor} rounded-xl opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300`}
                    />
                  </motion.div>
                  
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={stat.delay} />
                  
                  <motion.div
                    className="text-xs sm:text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: stat.delay + 0.6 }}
                  >
                    {stat.label}
                  </motion.div>
                  
                  {stat.hasQuarterCircle && (
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 0 } : { scaleX: 0 }}
                      style={{ originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                    />
                  )}
                  
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: stat.delay + 0.5, duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#041F2B]/0 group-hover:to-[#041F2B]/5 rounded-lg transition-all duration-500 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: stat.delay + 0.3 }}
                  />
                </CardContent>
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
