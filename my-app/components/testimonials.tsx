"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "TechCorp",
    content: "GROEI transformed my job search. The AI matching was incredibly accurate and I found my dream role within weeks. The platform is intuitive and the support team is amazing.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "UX Designer",
    company: "Design Studio",
    content: "As a freelancer, finding quality projects was always a challenge. GROEI connected me with top-tier clients that match my skills perfectly. Highly recommend!",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emily Johnson",
    role: "Product Manager",
    company: "StartupXYZ",
    content: "The resume parsing feature saved me hours of work. The AI understood my experience perfectly and matched me with opportunities I wouldn't have found otherwise.",
    rating: 5,
    avatar: "EJ"
  },
  {
    name: "David Kim",
    role: "Data Scientist",
    company: "DataLabs",
    content: "The mock interview feature helped me prepare for my current role. The AI feedback was detailed and actionable. This platform is a game-changer for job seekers.",
    rating: 5,
    avatar: "DK"
  },
  {
    name: "Lisa Wang",
    role: "Marketing Director",
    company: "BrandCo",
    content: "I've tried many job platforms, but GROEI stands out. The matching algorithm is sophisticated and the interface is clean and professional. Found my perfect match!",
    rating: 5,
    avatar: "LW"
  },
  {
    name: "James Thompson",
    role: "Full Stack Developer",
    company: "DevSolutions",
    content: "The heatmap analytics gave me insights into my application performance. Combined with the smart matching, I landed multiple interviews and chose the best offer.",
    rating: 5,
    avatar: "JT"
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${200 + i * 30}px`,
              height: `${200 + i * 30}px`,
              background: `radial-gradient(circle, rgba(4, 31, 43, ${0.07 + i * 0.01}) 0%, transparent 70%)`,
              left: `${i * 14}%`,
              top: `${10 + (i % 3) * 25}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 16 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm border-0 mb-3 sm:mb-4">
          <Quote className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-600 dark:text-slate-400" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            Testimonials
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 tracking-tight px-4">
          What Our Users
          <br />
          <span className="text-slate-600 dark:text-slate-400">Say About Us</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto px-4">
          Join thousands of professionals who found their perfect match with GROEI
        </p>
      </motion.div>

      <div 
        className="overflow-hidden relative py-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex testimonials-scroll"
          style={{
            willChange: "transform",
            gap: "3rem",
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              className="flex-shrink-0 w-[90vw] sm:w-[450px] md:w-[480px] lg:w-[420px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: (index % testimonials.length) * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Card className="group relative overflow-hidden border-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md hover:bg-white dark:hover:bg-slate-950 hover:shadow-2xl hover:shadow-[#041F2B]/15 dark:hover:shadow-[#041F2B]/25 transition-all duration-700 h-full">
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#041F2B]/8 to-transparent rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (index % testimonials.length) * 0.3,
                  }}
                />
                
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#041F2B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <CardContent className="p-8 lg:p-10 relative">
                  <motion.div 
                    className="flex items-center gap-1.5 mb-5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ delay: (index % testimonials.length) * 0.1 + 0.2 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0 }}
                        transition={{ delay: (index % testimonials.length) * 0.1 + 0.3 + i * 0.05, type: "spring", stiffness: 200 }}
                      >
                        <Star className="h-5 w-5 fill-[#041F2B] text-[#041F2B] dark:fill-[#041F2B] dark:text-[#041F2B]" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                    transition={{ delay: (index % testimonials.length) * 0.1 + 0.4 }}
                  >
                    <Quote className="h-10 w-10 text-[#041F2B]/25 dark:text-[#041F2B]/35 mb-5" />
                  </motion.div>

                  <motion.p 
                    className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed text-base"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ delay: (index % testimonials.length) * 0.1 + 0.5 }}
                  >
                    "{testimonial.content}"
                  </motion.p>

                  <motion.div 
                    className="flex items-center gap-5 pt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ delay: (index % testimonials.length) * 0.1 + 0.6 }}
                  >
                    <motion.div 
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-[#041F2B] to-[#0d4a63] flex items-center justify-center text-white font-semibold text-base shadow-lg shadow-[#041F2B]/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>

                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#041F2B] via-[#0d4a63] to-[#041F2B] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
