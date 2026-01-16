"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Star,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Users,
  Globe,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const jobDetails: { [key: number]: any } = {
  1: {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "₹10L - ₹15L",
    posted: "2 days ago",
    match: 98,
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    description: "Join our innovative team to build cutting-edge web applications using modern technologies.",
    fullDescription: "We are looking for an experienced Senior Full Stack Developer to join our dynamic team. You will be responsible for designing, developing, and maintaining scalable web applications. The ideal candidate should have strong expertise in React, Node.js, and cloud technologies.",
    requirements: [
      "5+ years of experience in full-stack development",
      "Strong proficiency in React, Node.js, and TypeScript",
      "Experience with AWS cloud services",
      "Knowledge of database design and optimization",
      "Excellent problem-solving and communication skills"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health insurance",
      "Flexible working hours and remote options",
      "Professional development opportunities",
      "401(k) matching program"
    ],
    companyInfo: "TechCorp is a leading technology company focused on innovation and excellence. We provide cutting-edge solutions to clients worldwide.",
  },
  2: {
    id: 2,
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Full-time",
    salary: "₹7.5L - ₹11L",
    posted: "1 day ago",
    match: 95,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    description: "Create beautiful and intuitive user experiences for our digital products.",
    fullDescription: "We're seeking a talented UX/UI Designer to join our creative team. You'll work on designing user interfaces and experiences for web and mobile applications, collaborating closely with product managers and developers.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma and Adobe XD",
      "Strong portfolio showcasing user-centered design",
      "Experience with user research and testing",
      "Knowledge of design systems and component libraries"
    ],
    benefits: [
      "Remote work flexibility",
      "Health and dental insurance",
      "Annual design conference budget",
      "Latest design tools and software",
      "Collaborative and creative work environment"
    ],
    companyInfo: "Design Studio is a creative agency specializing in digital product design and user experience.",
  },
  3: {
    id: 3,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "₹9L - ₹13L",
    posted: "3 days ago",
    match: 92,
    skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
    description: "Lead product development and work closely with engineering and design teams.",
    fullDescription: "Join our product team as a Product Manager and drive the vision and execution of our product roadmap. You'll work cross-functionally with engineering, design, and business teams to deliver exceptional products.",
    requirements: [
      "4+ years of product management experience",
      "Strong analytical and strategic thinking skills",
      "Experience with Agile methodologies",
      "Excellent communication and leadership abilities",
      "Technical background preferred"
    ],
    benefits: [
      "Competitive compensation package",
      "Stock options",
      "Health insurance",
      "Flexible PTO",
      "Learning and development budget"
    ],
    companyInfo: "StartupXYZ is a fast-growing startup focused on innovation and growth.",
  },
  4: {
    id: 4,
    title: "Data Scientist",
    company: "DataLabs",
    location: "Remote",
    type: "Full-time",
    salary: "₹11L - ₹16L",
    posted: "5 days ago",
    match: 89,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    description: "Build and deploy machine learning models to solve complex business problems.",
    fullDescription: "We're looking for a Data Scientist to join our analytics team. You'll work on developing machine learning models, analyzing large datasets, and providing data-driven insights to support business decisions.",
    requirements: [
      "Master's degree in Data Science, Statistics, or related field",
      "3+ years of experience in data science",
      "Strong programming skills in Python",
      "Experience with machine learning frameworks",
      "Knowledge of SQL and database systems"
    ],
    benefits: [
      "Remote work options",
      "Competitive salary",
      "Health and wellness programs",
      "Research publication support",
      "Access to cutting-edge tools and datasets"
    ],
    companyInfo: "DataLabs is a research-driven company specializing in data science and machine learning solutions.",
  },
};

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);
  const job = jobDetails[jobId];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      
      const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
      setIsApplied(appliedJobs.includes(jobId));
    }
  }, [jobId]);

  const handleApply = () => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/jobs/" + jobId);
      return;
    }

    if (!isApplied) {
      const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
      appliedJobs.push(jobId);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
      setIsApplied(true);

      const appliedJob = {
        id: Date.now(),
        jobTitle: job.title,
        company: job.company,
        status: "Application Sent",
        match: job.match,
        date: new Date().toISOString().split('T')[0],
        location: job.location,
        salary: job.salary,
        type: job.type,
        appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      
      const existingApplications = JSON.parse(localStorage.getItem("userApplications") || "[]");
      existingApplications.push(appliedJob);
      localStorage.setItem("userApplications", JSON.stringify(existingApplications));
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#e8e8f0] mb-4">Job Not Found</h1>
          <Button asChild>
            <Link href="/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-8 bg-[#0a0a0f]">
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-[#9ca3af] hover:text-[#e8e8f0] mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold text-[#e8e8f0] mb-4">
                      {job.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af] mb-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#6366f1] font-semibold">₹</span>
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-[#6366f1] fill-[#6366f1]" />
                      <span className="text-lg font-semibold text-[#6366f1]">{job.match}% Match</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#e8e8f0] mb-3">Job Description</h3>
                  <p className="text-[#9ca3af] leading-relaxed">{job.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#e8e8f0] mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-[#9ca3af]">
                        <CheckCircle2 className="h-5 w-5 text-[#6366f1] mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#e8e8f0] mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-[#9ca3af]">
                        <CheckCircle2 className="h-5 w-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#e8e8f0] mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm sticky top-24">
              <CardContent className="p-6 space-y-4">
                {isApplied ? (
                  <Button
                    disabled
                    className="w-full bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 cursor-not-allowed"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Applied
                  </Button>
                ) : (
                  <Button
                    onClick={handleApply}
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                  >
                    Apply Now
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e]"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Save Job
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">About Company</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{job.companyInfo}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

