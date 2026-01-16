"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Star, 
  Briefcase, 
  DollarSign, 
  Filter,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const skills = ["All Skills", "Web Development", "Design", "Writing", "Marketing", "Data Science", "Mobile App"];
const rates = ["All Rates", "$20-50/hr", "$50-100/hr", "$100-200/hr", "$200+/hr"];
const availability = ["All", "Available Now", "Within 1 Week", "Within 2 Weeks"];

const freelancers = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    rate: "$120/hr",
    rating: 4.9,
    reviews: 127,
    availability: "Available Now",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    description: "Experienced full-stack developer with 8+ years building scalable web applications.",
    completed: 89,
    responseTime: "< 1 hour",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "UX/UI Designer",
    location: "Remote",
    rate: "$95/hr",
    rating: 4.8,
    reviews: 94,
    availability: "Available Now",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    description: "Creative designer specializing in user-centered design and modern interfaces.",
    completed: 67,
    responseTime: "< 2 hours",
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: "Emily Johnson",
    title: "Content Writer & Strategist",
    location: "New York, NY",
    rate: "$65/hr",
    rating: 4.7,
    reviews: 156,
    availability: "Within 1 Week",
    skills: ["Content Writing", "SEO", "Copywriting", "Blogging", "Social Media"],
    description: "Versatile content creator with expertise in digital marketing and brand storytelling.",
    completed: 112,
    responseTime: "< 3 hours",
    verified: true,
  },
  {
    id: 4,
    name: "David Kim",
    title: "Data Scientist",
    location: "Remote",
    rate: "$150/hr",
    rating: 5.0,
    reviews: 43,
    availability: "Available Now",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Analysis"],
    description: "Data science expert helping businesses make data-driven decisions.",
    completed: 34,
    responseTime: "< 1 hour",
    verified: true,
  },
  {
    id: 5,
    name: "Lisa Wang",
    title: "Digital Marketing Specialist",
    location: "Toronto, ON",
    rate: "$80/hr",
    rating: 4.6,
    reviews: 78,
    availability: "Within 1 Week",
    skills: ["SEO", "PPC", "Social Media", "Analytics", "Email Marketing"],
    description: "Results-driven marketer with proven track record in growth strategies.",
    completed: 56,
    responseTime: "< 4 hours",
    verified: true,
  },
  {
    id: 6,
    name: "James Thompson",
    title: "Mobile App Developer",
    location: "London, UK",
    rate: "$110/hr",
    rating: 4.9,
    reviews: 89,
    availability: "Available Now",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    description: "Mobile development specialist creating cross-platform applications.",
    completed: 72,
    responseTime: "< 2 hours",
    verified: true,
  },
];

export function FreelancersContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All Skills");
  const [selectedRate, setSelectedRate] = useState("All Rates");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredFreelancers = freelancers.filter((freelancer) => {
    const matchesSearch = 
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSkill = selectedSkill === "All Skills" || 
      freelancer.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()));
    
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${200 + i * 50}px`,
                height: `${200 + i * 50}px`,
                background: `radial-gradient(circle, rgba(4, 31, 43, ${0.08 + i * 0.02}) 0%, transparent 70%)`,
                left: `${10 + i * 20}%`,
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
                Top Talent Pool
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Find Expert Freelancers
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Connect with verified professionals ready to bring your projects to life
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md shadow-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search freelancers, skills, or expertise..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base border-2 border-slate-200 dark:border-slate-800 focus:border-[#041F2B] dark:focus:border-[#041F2B]"
                    />
                  </div>
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="h-12 px-6 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white hover:from-[#052a3a] hover:to-[#0a3d52] border-0 shadow-lg"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                {/* Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4"
                  >
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                          Skills
                        </label>
                        <select
                          value={selectedSkill}
                          onChange={(e) => setSelectedSkill(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#041F2B]"
                        >
                          {skills.map((skill) => (
                            <option key={skill} value={skill}>
                              {skill}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                          Hourly Rate
                        </label>
                        <select
                          value={selectedRate}
                          onChange={(e) => setSelectedRate(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#041F2B]"
                        >
                          {rates.map((rate) => (
                            <option key={rate} value={rate}>
                              {rate}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                          Availability
                        </label>
                        <select
                          value={selectedAvailability}
                          onChange={(e) => setSelectedAvailability(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#041F2B]"
                        >
                          {availability.map((avail) => (
                            <option key={avail} value={avail}>
                              {avail}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-slate-600 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#041F2B]" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">{freelancers.length}+</span>
              <span>Expert Freelancers</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#041F2B]" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">4.8+</span>
              <span>Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#041F2B]" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">100%</span>
              <span>Verified Profiles</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Freelancer Listings */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            {filteredFreelancers.length} Freelancers Found
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span>Sort by:</span>
            <select className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              <option>Best Match</option>
              <option>Highest Rated</option>
              <option>Most Reviews</option>
              <option>Lowest Rate</option>
              <option>Highest Rate</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredFreelancers.map((freelancer, index) => (
            <motion.div
              key={freelancer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-950 transition-all duration-500 hover:shadow-2xl hover:shadow-[#041F2B]/10 dark:hover:shadow-[#041F2B]/20 h-full flex flex-col">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#041F2B] to-[#0d4a63] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  whileHover={{ scaleX: 1 }}
                />
                
                {freelancer.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white border-0 z-10">
                    Featured
                  </Badge>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#041F2B] to-[#0d4a63] flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">
                        {freelancer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg sm:text-xl mb-1 text-slate-900 dark:text-slate-100 group-hover:text-[#041F2B] dark:group-hover:text-[#0d4a63] transition-colors">
                            {freelancer.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            {freelancer.title}
                          </CardDescription>
                        </div>
                        {freelancer.verified && (
                          <CheckCircle2 className="h-5 w-5 text-[#041F2B] flex-shrink-0" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{freelancer.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{freelancer.responseTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(freelancer.rating)
                                  ? "fill-[#041F2B] text-[#041F2B]"
                                  : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {freelancer.rating}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-500">
                          ({freelancer.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-4 w-4 text-[#041F2B]" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{freelancer.rate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4 text-slate-500" />
                          <span className="text-slate-600 dark:text-slate-400">{freelancer.completed} jobs</span>
                        </div>
                      </div>

                      <CardDescription className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
                        {freelancer.description}
                      </CardDescription>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {freelancer.skills.slice(0, 4).map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {freelancer.skills.length > 4 && (
                          <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 text-xs">
                            +{freelancer.skills.length - 4}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0">
                          {freelancer.availability}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 mt-auto">
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Link href={`/freelancers/${freelancer.id}`}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white hover:from-[#052a3a] hover:to-[#0a3d52] border-0 shadow-lg"
                    >
                      <Link href={`/freelancers/${freelancer.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredFreelancers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
              No freelancers found matching your criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedSkill("All Skills");
                setSelectedRate("All Rates");
                setSelectedAvailability("All");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  );
}

