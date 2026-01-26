"use client";

import { useState, useEffect } from "react";
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
  AlertCircle,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";

export function ResumeContent() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumes, setResumes] = useState<any[]>([]);
  const [currentResume, setCurrentResume] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setIsLoading(true);
      const { resumeAPI } = await import("@/lib/api");
      const response = await resumeAPI.getMyResumes();
      if (response.resumes) {
        setResumes(response.resumes);
        // Find active resume or the most recent one
        const active = response.resumes.find((r: any) => r.is_active) || response.resumes[0];
        setCurrentResume(active || null);
      }
    } catch (err) {
      console.error("Failed to load resumes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const { resumeAPI } = await import("@/lib/api");
      await resumeAPI.uploadResume(file);
      // Reload to get updated list and new active resume
      await loadResumes();
    } catch (err: any) {
      setError(err.message || "Failed to upload resume");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      const { resumeAPI } = await import("@/lib/api");
      await resumeAPI.deleteResume(id);
      setResumes(resumes.filter((resume) => resume.id !== id));
      if (currentResume?.id === id) {
        setCurrentResume(resumes.find(r => r.id !== id) || null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete resume");
    }
  };

  // Helper to get score from parsed data (if analysis exists)
  const getScore = (resume: any) => {
    if (!resume?.parsed_data) return 0;
    // parsed_data might be the analysis object (with overallScore) or just scraped data
    // Based on our controller update, we saved full analysis!
    // So if it has overallScore, use it.
    return resume.parsed_data.overallScore || 0;
  };

  const getSuggestions = (resume: any) => {
    if (!resume?.parsed_data?.suggestions) return [];
    return resume.parsed_data.suggestions.map((text: string) => ({ type: "info", text }));
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
                {isLoading ? (
                  <div className="text-center py-8 text-[#9ca3af]">Loading resumes...</div>
                ) : currentResume ? (
                  <div className="border-2 border-dashed border-[#2a2a3a] rounded-lg p-8 text-center hover:border-[#6366f1]/50 transition-all">
                    <FileText className="h-16 w-16 text-[#6366f1] mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold text-[#e8e8f0] mb-2">{currentResume.file_name}</h3>
                    <p className="text-sm text-[#9ca3af] mb-4">
                      Uploaded on {new Date(currentResume.uploaded_at).toLocaleDateString()} • {(currentResume.file_size / 1024).toFixed(2)} KB
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="outline"
                        className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                        onClick={() => window.open(currentResume.file_url, '_blank')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                        onClick={() => window.open(currentResume.file_url, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#9ca3af]">
                    No resume uploaded. Upload a resume to see it here.
                  </div>
                )}
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
                {currentResume ? (
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
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - getScore(currentResume) / 100)}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - getScore(currentResume) / 100) }}
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
                          {getScore(currentResume)}
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#9ca3af]">Upload a resume to see your score</div>
                )}
              </CardContent>
            </Card>
          </div>

          {currentResume && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-[#6366f1]" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getSuggestions(currentResume).length > 0 ? (
                    getSuggestions(currentResume).slice(0, 5).map((suggestion: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]"
                      >
                        <Sparkles className="h-5 w-5 text-[#6366f1] mt-0.5 flex-shrink-0" />
                        <p className="text-[#e8e8f0] flex-1">{suggestion.text}</p>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-[#9ca3af]">No suggestions available yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

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
                  PDF, DOC, or DOCX (Max 5MB) - AI will automatically extract your information
                </p>
                {error && (
                  <p className="text-sm text-[#ef4444] mb-4">{error}</p>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  <Button
                    asChild
                    disabled={isUploading}
                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 cursor-pointer"
                  >
                    <span>{isUploading ? "Uploading & Analyzing..." : "Choose File"}</span>
                  </Button>
                </label>
              </div>
              {resumes.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-[#e8e8f0]">Your Resumes History</h3>
                  {resumes.map((resume) => (
                    <Card key={resume.id} className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-[#e8e8f0] font-medium">{resume.file_name}</p>
                          <p className="text-sm text-[#9ca3af]">
                            {new Date(resume.uploaded_at).toLocaleDateString()} •
                            {(resume.file_size / 1024).toFixed(2)} KB
                            {resume.is_active && (
                              <span className="ml-2 px-2 py-0.5 bg-[#10b981]/20 text-[#10b981] rounded text-xs">
                                Active
                              </span>
                            )}
                          </p>
                          {resume.parsed_data && (
                            <p className="text-xs text-[#6366f1] mt-1">
                              ✓ AI Analyzed
                            </p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(resume.id)}
                          className="border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

