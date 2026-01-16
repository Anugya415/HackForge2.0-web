"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserPlus,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Activity,
  Database,
  AlertCircle,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const platformStats = {
  totalUsers: 1248,
  totalCompanies: 45,
  totalApplications: 342,
  activeJobs: 128,
  interviewsScheduled: 28,
  newUsersToday: 12,
  newCompaniesToday: 2,
  pendingApplications: 89,
  rejectedApplications: 45,
  acceptedApplications: 15,
  usersGrowth: 8.5,
  companiesGrowth: 12.3,
  applicationsGrowth: 15.2,
  systemHealth: 99.8,
  activeAdmins: 8,
  totalRevenue: 125000,
};

const recentUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    title: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    joinedDate: "2 hours ago",
    status: "Active",
    applications: 3,
    role: "user",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    title: "UX/UI Designer",
    location: "Remote",
    joinedDate: "5 hours ago",
    status: "Active",
    applications: 1,
    role: "user",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    title: "Product Manager",
    location: "New York, NY",
    joinedDate: "1 day ago",
    status: "Active",
    applications: 2,
    role: "user",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    title: "Data Scientist",
    location: "Remote",
    joinedDate: "2 days ago",
    status: "Active",
    applications: 4,
    role: "user",
  },
];

const recentCompanies = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    employees: "500-1000",
    jobsPosted: 12,
    joinedDate: "1 week ago",
    status: "Active",
    admins: 3,
  },
  {
    id: 2,
    name: "Design Studio",
    industry: "Design",
    employees: "50-100",
    jobsPosted: 5,
    joinedDate: "2 weeks ago",
    status: "Active",
    admins: 2,
  },
  {
    id: 3,
    name: "StartupXYZ",
    industry: "Startup",
    employees: "10-50",
    jobsPosted: 8,
    joinedDate: "3 weeks ago",
    status: "Active",
    admins: 1,
  },
];

const recentApplications = [
  {
    id: 1,
    applicantName: "Alex Johnson",
    jobTitle: "Senior Full Stack Developer",
    company: "TechCorp",
    status: "Interview Scheduled",
    appliedDate: "2 days ago",
    match: 98,
  },
  {
    id: 2,
    applicantName: "Sarah Chen",
    jobTitle: "UX/UI Designer",
    company: "Design Studio",
    status: "Under Review",
    appliedDate: "3 days ago",
    match: 95,
  },
  {
    id: 3,
    applicantName: "Michael Brown",
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "Application Sent",
    appliedDate: "5 days ago",
    match: 92,
  },
];

const systemAlerts = [
  {
    id: 1,
    type: "info",
    message: "System backup completed successfully",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "warning",
    message: "High application volume detected",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "success",
    message: "New company registered: TechCorp",
    time: "1 day ago",
  },
];

const getStats = () => [
  {
    label: "Total Users",
    value: platformStats.totalUsers,
    icon: Users,
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    change: platformStats.usersGrowth,
    changeType: "increase",
    href: "/super-admin/users",
  },
  {
    label: "Total Companies",
    value: platformStats.totalCompanies,
    icon: Building2,
    gradient: "from-[#8b5cf6] to-[#ec4899]",
    change: platformStats.companiesGrowth,
    changeType: "increase",
    href: "/super-admin/companies",
  },
  {
    label: "Total Applications",
    value: platformStats.totalApplications,
    icon: Briefcase,
    gradient: "from-[#ec4899] to-[#f59e0b]",
    change: platformStats.applicationsGrowth,
    changeType: "increase",
    href: "/super-admin/applications",
  },
  {
    label: "System Health",
    value: `${platformStats.systemHealth}%`,
    icon: Activity,
    gradient: "from-[#10b981] to-[#6366f1]",
    change: 0.2,
    changeType: "increase",
    href: "/super-admin/settings",
  },
];

export function SuperAdminDashboardContent() {
  return (
    <div className="min-h-screen pt-16 lg:pt-8">
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${250 + i * 60}px`,
                height: `${250 + i * 60}px`,
                background: `radial-gradient(circle, rgba(236, 72, 153, ${0.12 - i * 0.015}) 0%, transparent 70%)`,
                left: `${10 + i * 15}%`,
                top: `${10 + i * 12}%`,
              }}
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 18 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            />
          ))}
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-8 w-8 text-[#ec4899]" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                    Super Admin Dashboard
                  </span>
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-[#9ca3af]">
                Platform-wide management and analytics
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {getStats().map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={stat.href}>
                    <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#ec4899]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#ec4899]/10 cursor-pointer">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-[#ec4899]/30`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className={`flex items-center gap-1 text-xs font-semibold ${
                            stat.changeType === "increase" ? "text-[#10b981]" : "text-[#ef4444]"
                          }`}>
                            {stat.changeType === "increase" ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {stat.change}%
                          </div>
                        </div>
                        <div className={`text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                          {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
                        </div>
                        <div className="text-sm text-[#9ca3af]">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            <Card className="lg:col-span-2 border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">Recent Users</CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-[#ec4899] hover:text-[#a5b4fc]">
                  <Link href="/super-admin/users">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1e1e2e] transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#6366f1]/30">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-[#e8e8f0] truncate">{user.name}</p>
                            <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30 text-xs">
                              {user.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-[#9ca3af] truncate">{user.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[#6b7280]">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {user.location}
                            </span>
                            <span>•</span>
                            <span>{user.joinedDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge className="bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30">
                            {user.applications} apps
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                            <Link href={`/super-admin/users?userId=${user.id}`}>
                              <Eye className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">System Alerts</CardTitle>
                <Zap className="h-5 w-5 text-[#ec4899]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === "success" ? "bg-[#10b981]" :
                        alert.type === "warning" ? "bg-[#f59e0b]" :
                        "bg-[#6366f1]"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#e8e8f0]">{alert.message}</p>
                        <p className="text-xs text-[#6b7280] mt-1">{alert.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">Recent Companies</CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-[#ec4899] hover:text-[#a5b4fc]">
                  <Link href="/super-admin/companies">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCompanies.map((company, index) => (
                    <motion.div
                      key={company.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1e1e2e] transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#8b5cf6]/30">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-[#e8e8f0]">{company.name}</p>
                            <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30 text-xs">
                              {company.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-[#9ca3af]">{company.industry}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[#6b7280]">
                            <span>{company.employees} employees</span>
                            <span>•</span>
                            <span>{company.jobsPosted} jobs</span>
                            <span>•</span>
                            <span>{company.admins} admins</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                          <Link href={`/super-admin/companies?companyId=${company.id}`}>
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-[#ec4899] hover:text-[#a5b4fc]">
                  <Link href="/super-admin/applications">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#1e1e2e] transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#f59e0b] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#ec4899]/30">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-[#e8e8f0]">{app.applicantName}</p>
                            <Badge className={`text-xs ${
                              app.status === "Interview Scheduled" ? "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30" :
                              app.status === "Under Review" ? "bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30" :
                              "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30"
                            }`}>
                              {app.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-[#a5b4fc] mb-1">{app.jobTitle}</p>
                          <p className="text-xs text-[#9ca3af]">{app.company}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[#6b7280]">
                            <span>{app.appliedDate}</span>
                            <span>•</span>
                            <span className="text-[#6366f1]">{app.match}% match</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                          <Link href={`/super-admin/applications?appId=${app.id}`}>
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#10b981]" />
                  Accepted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#10b981] to-[#6366f1] bg-clip-text text-transparent mb-2">
                  {platformStats.acceptedApplications}
                </div>
                <p className="text-sm text-[#9ca3af]">Applications accepted</p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#f59e0b]" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ec4899] bg-clip-text text-transparent mb-2">
                  {platformStats.pendingApplications}
                </div>
                <p className="text-sm text-[#9ca3af]">Applications pending</p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-[#ef4444]" />
                  Rejected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#ef4444] to-[#f59e0b] bg-clip-text text-transparent mb-2">
                  {platformStats.rejectedApplications}
                </div>
                <p className="text-sm text-[#9ca3af]">Applications rejected</p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#6366f1]" />
                  Active Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent mb-2">
                  {platformStats.activeJobs}
                </div>
                <p className="text-sm text-[#9ca3af]">Currently active</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

