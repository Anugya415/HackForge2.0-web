"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  CheckCircle2,
  XCircle,
  Sparkles,
  FileCheck,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

const mockResume = {
  fileName: "Alex_Johnson_Resume.pdf",
  uploadDate: "Dec 10, 2024",
  lastUpdated: "Dec 10, 2024",
  status: "Active",
  score: 92,
  suggestions: [
    { type: "success", text: "Strong technical skills section" },
    { type: "success", text: "Well-formatted experience section" },
    { type: "warning", text: "Consider adding more quantifiable achievements" },
    { type: "info", text: "Add links to your portfolio projects" },
  ],
};

export function ResumeContent() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-8">
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                My Resume
              </span>
            </h1>
            <p className="text-lg text-[#9ca3af]">
              Upload, manage, and optimize your resume
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2 border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#6366f1]" />
                  Current Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-[#2a2a3a] rounded-lg p-8 text-center hover:border-[#6366f1]/50 transition-all">
                  <FileText className="h-16 w-16 text-[#6366f1] mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-[#e8e8f0] mb-2">{mockResume.fileName}</h3>
                  <p className="text-sm text-[#9ca3af] mb-4">
                    Uploaded on {mockResume.uploadDate} • Last updated {mockResume.lastUpdated}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#6366f1]" />
                  Resume Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#2a2a3a"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - mockResume.score / 100)}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - mockResume.score / 100) }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                        {mockResume.score}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {mockResume.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-[#6366f1]" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockResume.suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]"
                  >
                    {suggestion.type === "success" && (
                      <CheckCircle2 className="h-5 w-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                    )}
                    {suggestion.type === "warning" && (
                      <AlertCircle className="h-5 w-5 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    )}
                    {suggestion.type === "info" && (
                      <Sparkles className="h-5 w-5 text-[#6366f1] mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-[#e8e8f0] flex-1">{suggestion.text}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                <Upload className="h-5 w-5 text-[#6366f1]" />
                Upload New Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-[#2a2a3a] rounded-lg p-12 text-center hover:border-[#6366f1]/50 transition-all">
                <Upload className="h-12 w-12 text-[#6366f1] mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-[#e8e8f0] mb-2">Upload your resume</h3>
                <p className="text-sm text-[#9ca3af] mb-6">
                  PDF, DOC, or DOCX (Max 5MB)
                </p>
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                >
                  {isUploading ? "Uploading..." : "Choose File"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

