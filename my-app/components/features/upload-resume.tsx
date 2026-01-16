"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, Sparkles, X, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function UploadResumeContent() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type.includes("word"))) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    setIsComplete(true);
  };

  return (
    <div className="min-h-screen">
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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm border-0 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  AI Resume Parser
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Upload Your Resume
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Let our AI extract and analyze your skills, experience, and achievements instantly
              </p>
            </motion.div>

            {!isComplete ? (
              <Card className="border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm shadow-xl">
                <CardContent className="p-6 sm:p-8 md:p-12">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
                      isDragging
                        ? "border-[#041F2B] bg-[#041F2B]/5 dark:bg-[#041F2B]/10"
                        : "border-slate-300 dark:border-slate-700 hover:border-[#041F2B]/50 dark:hover:border-[#041F2B]/50"
                    }`}
                  >
                    {file ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4"
                      >
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#041F2B] to-[#0d4a63] flex items-center justify-center mx-auto">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                            {file.name}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFile(null)}
                          className="mt-4"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove File
                        </Button>
                      </motion.div>
                    ) : (
                      <div className="space-y-6">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#041F2B] to-[#0d4a63] flex items-center justify-center mx-auto shadow-lg"
                        >
                          <Upload className="h-10 w-10 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            Drag & drop your resume
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 mb-4">
                            or click to browse
                          </p>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                          />
                          <label htmlFor="file-upload">
                            <Button
                              as="span"
                              className="bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white hover:from-[#052a3a] hover:to-[#0a3d52] border-0 shadow-lg cursor-pointer"
                            >
                              Select File
                            </Button>
                          </label>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          Supported formats: PDF, DOC, DOCX (Max 10MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {file && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      <Button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white hover:from-[#052a3a] hover:to-[#0a3d52] border-0 shadow-lg py-6 text-base font-semibold"
                      >
                        {isUploading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="mr-2"
                            >
                              <Upload className="h-5 w-5" />
                            </motion.div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 mr-2" />
                            Upload & Parse Resume
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="border-0 bg-gradient-to-br from-[#041F2B] to-[#0d4a63] text-white shadow-xl">
                  <CardContent className="p-8 sm:p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4">Resume Uploaded Successfully!</h2>
                    <p className="text-white/90 mb-8 max-w-md mx-auto">
                      Your resume has been parsed and analyzed. Your profile has been updated with extracted information.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        asChild
                        className="bg-white text-[#041F2B] hover:bg-white/90 border-0 shadow-lg"
                      >
                        <Link href="/dashboard">Go to Dashboard</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Link href="/profile/edit">Edit Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { icon: FileText, title: "AI Parsing", desc: "99% accuracy" },
                { icon: Sparkles, title: "Instant Analysis", desc: "Real-time processing" },
                { icon: CheckCircle2, title: "Auto-Update", desc: "Profile synced" },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm text-center">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#041F2B] to-[#0d4a63] flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {feature.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
