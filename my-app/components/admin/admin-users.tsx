"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Users,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Eye,
  X,
  Download,
  User,
  FileText,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  GraduationCap,
  Building2,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Full Stack Developer",
    experience: "5+ years",
    education: "BS Computer Science, Stanford University",
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"],
    bio: "Passionate full-stack developer with expertise in modern web technologies.",
    joinedDate: "2024-01-15",
    status: "Active",
    applications: 3,
    profileComplete: 85,
    resumeUploaded: true,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 234-5678",
    location: "Remote",
    title: "UX/UI Designer",
    experience: "3+ years",
    education: "BA Design, UC Berkeley",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    bio: "Creative designer focused on user-centered design and digital experiences.",
    joinedDate: "2024-02-20",
    status: "Active",
    applications: 1,
    profileComplete: 92,
    resumeUploaded: true,
    lastActive: "5 hours ago",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    title: "Product Manager",
    experience: "7+ years",
    education: "MBA, Harvard Business School",
    skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
    bio: "Strategic product leader with a track record of launching successful products.",
    joinedDate: "2024-03-10",
    status: "Active",
    applications: 2,
    profileComplete: 78,
    resumeUploaded: true,
    lastActive: "1 day ago",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    location: "Remote",
    title: "Data Scientist",
    experience: "4+ years",
    education: "MS Data Science, MIT",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    bio: "Data scientist specializing in machine learning and predictive analytics.",
    joinedDate: "2024-01-25",
    status: "Active",
    applications: 4,
    profileComplete: 95,
    resumeUploaded: true,
    lastActive: "3 hours ago",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    title: "Backend Engineer",
    experience: "6+ years",
    education: "BS Computer Science, University of Washington",
    skills: ["Java", "Spring Boot", "Microservices", "Kubernetes"],
    bio: "Backend engineer with expertise in distributed systems and cloud infrastructure.",
    joinedDate: "2024-02-05",
    status: "Active",
    applications: 2,
    profileComplete: 88,
    resumeUploaded: true,
    lastActive: "6 hours ago",
  },
];

export function AdminUsersContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [users, setUsers] = useState(mockUsers);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      if (userId) {
        const id = parseInt(userId);
        if (!isNaN(id)) {
          setSelectedUser(id);
        }
      }
    }
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    All: users.length,
    Active: users.filter(u => u.status === "Active").length,
    Inactive: users.filter(u => u.status === "Inactive").length,
  };

  const selectedUserData = selectedUser ? users.find(u => u.id === selectedUser) : null;

  return (
    <div className="min-h-screen pt-16 lg:pt-8">
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                    User Management
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  View and manage all users and applicants
                </p>
              </div>
              <Button className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                <Input
                  type="text"
                  placeholder="Search users by name, email, title, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#151520] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    onClick={() => setStatusFilter(status)}
                    className={`whitespace-nowrap ${
                      statusFilter === status
                        ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0"
                        : "border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                    }`}
                  >
                    {status} ({count})
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:border-[#6366f1]/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-[#6366f1]/30">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-[#e8e8f0]">{user.name}</h3>
                                <Badge className={`${
                                  user.status === "Active" 
                                    ? "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30"
                                    : "bg-[#9ca3af]/20 text-[#9ca3af] border-[#9ca3af]/30"
                                }`}>
                                  {user.status}
                                </Badge>
                              </div>
                              <p className="text-lg text-[#a5b4fc] mb-2">{user.title}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af]">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{user.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-4 w-4" />
                                  <span>{user.experience}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            {user.skills.slice(0, 5).map((skill, idx) => (
                              <Badge
                                key={idx}
                                className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {user.skills.length > 5 && (
                              <Badge className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]">
                                +{user.skills.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#9ca3af]">Applications</span>
                          <Badge className="bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30">
                            {user.applications}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#9ca3af]">Profile</span>
                          <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                            {user.profileComplete}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-[#9ca3af]">Resume</span>
                          {user.resumeUploaded ? (
                            <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                          ) : (
                            <XCircle className="h-4 w-4 text-[#ef4444]" />
                          )}
                        </div>
                        <Button
                          onClick={() => setSelectedUser(user.id)}
                          variant="outline"
                          className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 text-[#6366f1] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">No users found</h3>
                <p className="text-[#9ca3af]">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedUser && selectedUserData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-sm"
            onClick={() => {
              setSelectedUser(null);
              if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                url.searchParams.delete("userId");
                window.history.replaceState({}, "", url.pathname);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#151520] border border-[#2a2a3a] rounded-2xl shadow-2xl"
            >
              <Card className="border-0 bg-transparent">
                <CardHeader className="sticky top-0 bg-[#151520] border-b border-[#2a2a3a] z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-[#e8e8f0]">User Profile</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedUser(null);
                        if (typeof window !== "undefined") {
                          const url = new URL(window.location.href);
                          url.searchParams.delete("userId");
                          window.history.replaceState({}, "", url.pathname);
                        }
                      }}
                      className="text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-[#6366f1]/30">
                      {selectedUserData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-[#e8e8f0]">{selectedUserData.name}</h3>
                        <Badge className={`${
                          selectedUserData.status === "Active" 
                            ? "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30"
                            : "bg-[#9ca3af]/20 text-[#9ca3af] border-[#9ca3af]/30"
                        }`}>
                          {selectedUserData.status}
                        </Badge>
                      </div>
                      <p className="text-xl text-[#a5b4fc] mb-4">{selectedUserData.title}</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-[#9ca3af]">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#6366f1]" />
                          <span>{selectedUserData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#6366f1]" />
                          <span>{selectedUserData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#6366f1]" />
                          <span>{selectedUserData.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#6366f1]" />
                          <span>Joined {new Date(selectedUserData.joinedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-[#6366f1]" />
                          Experience
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#9ca3af]">{selectedUserData.experience}</p>
                      </CardContent>
                    </Card>

                    <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-[#6366f1]" />
                          Education
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#9ca3af]">{selectedUserData.education}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-[#e8e8f0]">Bio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#9ca3af] leading-relaxed">{selectedUserData.bio}</p>
                    </CardContent>
                  </Card>

                  <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-[#e8e8f0]">Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedUserData.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            className="bg-[#151520] text-[#9ca3af] border border-[#2a2a3a]"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-[#e8e8f0]">Profile Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-[#9ca3af] mb-1">Applications</p>
                          <p className="text-2xl font-bold text-[#e8e8f0]">{selectedUserData.applications}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#9ca3af] mb-1">Profile Complete</p>
                          <p className="text-2xl font-bold text-[#e8e8f0]">{selectedUserData.profileComplete}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#9ca3af] mb-1">Resume</p>
                          {selectedUserData.resumeUploaded ? (
                            <CheckCircle2 className="h-6 w-6 text-[#10b981]" />
                          ) : (
                            <XCircle className="h-6 w-6 text-[#ef4444]" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact User
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50">
                      <FileText className="h-4 w-4 mr-2" />
                      View Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
