"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Activity,
  User,
  Building2,
  Briefcase,
  Settings,
  Shield,
  Clock,
  Filter,
  Download,
  Eye,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

const activityLogs = [
  {
    id: 1,
    user: "Super Admin",
    action: "User Created",
    target: "Alex Johnson",
    type: "user",
    status: "success",
    timestamp: "2 hours ago",
    ip: "192.168.1.1",
    details: "Created new user account with email alex.johnson@example.com",
  },
  {
    id: 2,
    user: "Company Admin",
    action: "Application Reviewed",
    target: "Senior Developer Position",
    type: "application",
    status: "info",
    timestamp: "3 hours ago",
    ip: "192.168.1.2",
    details: "Reviewed application from Sarah Chen",
  },
  {
    id: 3,
    user: "Super Admin",
    action: "Company Updated",
    target: "TechCorp",
    type: "company",
    status: "success",
    timestamp: "5 hours ago",
    ip: "192.168.1.1",
    details: "Updated company information and settings",
  },
  {
    id: 4,
    user: "System",
    action: "Backup Completed",
    target: "Database Backup",
    type: "system",
    status: "success",
    timestamp: "1 day ago",
    ip: "System",
    details: "Automated daily backup completed successfully",
  },
  {
    id: 5,
    user: "Super Admin",
    action: "Role Modified",
    target: "Company Admin Role",
    type: "role",
    status: "warning",
    timestamp: "2 days ago",
    ip: "192.168.1.1",
    details: "Modified permissions for Company Admin role",
  },
  {
    id: 6,
    user: "Recruiter",
    action: "Application Rejected",
    target: "Product Manager Position",
    type: "application",
    status: "error",
    timestamp: "3 days ago",
    ip: "192.168.1.3",
    details: "Rejected application from Michael Brown",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-[#10b981]" />;
    case "error":
      return <XCircle className="h-4 w-4 text-[#ef4444]" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-[#f59e0b]" />;
    default:
      return <Info className="h-4 w-4 text-[#6366f1]" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "user":
      return <User className="h-4 w-4 text-[#6366f1]" />;
    case "company":
      return <Building2 className="h-4 w-4 text-[#8b5cf6]" />;
    case "application":
      return <Briefcase className="h-4 w-4 text-[#ec4899]" />;
    case "role":
      return <Shield className="h-4 w-4 text-[#f59e0b]" />;
    default:
      return <Settings className="h-4 w-4 text-[#9ca3af]" />;
  }
};

export function SuperAdminActivityContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || log.status === statusFilter.toLowerCase();
    const matchesType = typeFilter === "All" || log.type === typeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusCounts = {
    All: activityLogs.length,
    Success: activityLogs.filter(l => l.status === "success").length,
    Error: activityLogs.filter(l => l.status === "error").length,
    Warning: activityLogs.filter(l => l.status === "warning").length,
    Info: activityLogs.filter(l => l.status === "info").length,
  };

  const typeCounts = {
    All: activityLogs.length,
    User: activityLogs.filter(l => l.type === "user").length,
    Company: activityLogs.filter(l => l.type === "company").length,
    Application: activityLogs.filter(l => l.type === "application").length,
    System: activityLogs.filter(l => l.type === "system").length,
    Role: activityLogs.filter(l => l.type === "role").length,
  };

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
                    Activity Logs
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  Monitor all platform activities and events
                </p>
              </div>
              <Button className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white hover:from-[#d946ef] hover:to-[#7c3aed] border-0">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                <Input
                  type="text"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#151520] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#ec4899]"
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
                        ? "bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white border-0"
                        : "border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                    }`}
                  >
                    {status} ({count})
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {Object.entries(typeCounts).map(([type, count]) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? "default" : "outline"}
                  onClick={() => setTypeFilter(type)}
                  className={`whitespace-nowrap ${
                    typeFilter === type
                      ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0"
                      : "border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                  }`}
                >
                  {type} ({count})
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4">
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:border-[#ec4899]/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-[#1e1e2e] border border-[#2a2a3a] flex items-center justify-center">
                          {getTypeIcon(log.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold text-[#e8e8f0]">{log.action}</h3>
                                {getStatusIcon(log.status)}
                                <Badge className={`text-xs ${
                                  log.status === "success" ? "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30" :
                                  log.status === "error" ? "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30" :
                                  log.status === "warning" ? "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30" :
                                  "bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30"
                                }`}>
                                  {log.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-[#a5b4fc] mb-2">{log.target}</p>
                              <p className="text-sm text-[#9ca3af] mb-3">{log.details}</p>
                              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b7280]">
                                <div className="flex items-center gap-2">
                                  <User className="h-3 w-3" />
                                  <span>{log.user}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3" />
                                  <span>{log.timestamp}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Activity className="h-3 w-3" />
                                  <span>{log.ip}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Activity className="h-16 w-16 text-[#ec4899] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">No activities found</h3>
                <p className="text-[#9ca3af]">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

