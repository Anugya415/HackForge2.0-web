"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  UserCog,
  Shield,
  Users,
  Building2,
  Briefcase,
  Settings,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Plus,
  Check,
  X,
  Key,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full platform access with all permissions",
    users: 2,
    permissions: ["all"],
    color: "from-[#ec4899] to-[#8b5cf6]",
  },
  {
    id: 2,
    name: "Company Admin",
    description: "Manage company-specific data and applications",
    users: 8,
    permissions: ["view_users", "manage_applications", "view_analytics", "manage_company"],
    color: "from-[#6366f1] to-[#8b5cf6]",
  },
  {
    id: 3,
    name: "Recruiter",
    description: "View and manage applications for assigned company",
    users: 15,
    permissions: ["view_applications", "manage_applications", "view_analytics"],
    color: "from-[#8b5cf6] to-[#ec4899]",
  },
  {
    id: 4,
    name: "User",
    description: "Standard user with basic access",
    users: 1223,
    permissions: ["view_profile", "apply_jobs", "view_applications"],
    color: "from-[#10b981] to-[#6366f1]",
  },
];

const allPermissions = [
  { id: "all", label: "All Permissions", category: "System" },
  { id: "view_users", label: "View Users", category: "Users" },
  { id: "manage_users", label: "Manage Users", category: "Users" },
  { id: "delete_users", label: "Delete Users", category: "Users" },
  { id: "view_companies", label: "View Companies", category: "Companies" },
  { id: "manage_companies", label: "Manage Companies", category: "Companies" },
  { id: "delete_companies", label: "Delete Companies", category: "Companies" },
  { id: "view_applications", label: "View Applications", category: "Applications" },
  { id: "manage_applications", label: "Manage Applications", category: "Applications" },
  { id: "view_analytics", label: "View Analytics", category: "Analytics" },
  { id: "manage_analytics", label: "Manage Analytics", category: "Analytics" },
  { id: "view_profile", label: "View Profile", category: "Profile" },
  { id: "apply_jobs", label: "Apply to Jobs", category: "Jobs" },
  { id: "manage_company", label: "Manage Company", category: "Companies" },
  { id: "system_settings", label: "System Settings", category: "System" },
];

export function SuperAdminRolesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedRoleData = selectedRole ? roles.find(r => r.id === selectedRole) : null;

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
                    Roles & Permissions
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  Manage user roles and their permissions
                </p>
              </div>
              <Button className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white hover:from-[#d946ef] hover:to-[#7c3aed] border-0">
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
              <Input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#151520] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#ec4899]"
              />
            </div>
          </motion.div>

          <div className="grid gap-4">
            {filteredRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:border-[#ec4899]/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-[#ec4899]/30`}>
                          <Shield className="h-8 w-8" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-[#e8e8f0]">{role.name}</h3>
                                <Badge className={`bg-gradient-to-r ${role.color} text-white border-0`}>
                                  {role.users} users
                                </Badge>
                              </div>
                              <p className="text-sm text-[#9ca3af] mb-3">{role.description}</p>
                              <div className="flex flex-wrap items-center gap-2">
                                {role.permissions.includes("all") ? (
                                  <Badge className="bg-[#ec4899]/20 text-[#ec4899] border-[#ec4899]/30">
                                    All Permissions
                                  </Badge>
                                ) : (
                                  role.permissions.slice(0, 5).map((perm, idx) => (
                                    <Badge
                                      key={idx}
                                      className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]"
                                    >
                                      {perm.replace(/_/g, " ")}
                                    </Badge>
                                  ))
                                )}
                                {!role.permissions.includes("all") && role.permissions.length > 5 && (
                                  <Badge className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]">
                                    +{role.permissions.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        <Button
                          onClick={() => setSelectedRole(role.id)}
                          variant="outline"
                          className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#ec4899]/50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedRole(role.id);
                            setIsEditing(true);
                          }}
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
              </motion.div>
            ))}
          </div>

          {filteredRoles.length === 0 && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <UserCog className="h-16 w-16 text-[#ec4899] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">No roles found</h3>
                <p className="text-[#9ca3af]">Try adjusting your search criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {selectedRole && selectedRoleData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-sm"
          onClick={() => {
            setSelectedRole(null);
            setIsEditing(false);
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
                  <CardTitle className="text-2xl font-bold text-[#e8e8f0]">
                    {isEditing ? "Edit Role" : "Role Details"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedRole(null);
                      setIsEditing(false);
                    }}
                    className="text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-6">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${selectedRoleData.color} flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-[#ec4899]/30`}>
                    <Shield className="h-12 w-12" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#e8e8f0] mb-2">{selectedRoleData.name}</h3>
                    <p className="text-[#9ca3af] mb-4">{selectedRoleData.description}</p>
                    <Badge className={`bg-gradient-to-r ${selectedRoleData.color} text-white border-0`}>
                      {selectedRoleData.users} users assigned
                    </Badge>
                  </div>
                </div>

                <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                      <Key className="h-5 w-5 text-[#ec4899]" />
                      Permissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedRoleData.permissions.includes("all") ? (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-[#ec4899]/10 border border-[#ec4899]/30">
                        <Check className="h-5 w-5 text-[#ec4899]" />
                        <span className="text-[#e8e8f0] font-semibold">All Permissions Granted</span>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-3">
                        {selectedRoleData.permissions.map((perm, idx) => {
                          const permData = allPermissions.find(p => p.id === perm);
                          return permData ? (
                            <div
                              key={idx}
                              className="flex items-center gap-2 p-3 rounded-lg bg-[#151520] border border-[#2a2a3a]"
                            >
                              <Check className="h-4 w-4 text-[#10b981]" />
                              <span className="text-sm text-[#e8e8f0]">{permData.label}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {isEditing && (
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white hover:from-[#d946ef] hover:to-[#7c3aed] border-0">
                      <Check className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#ec4899]/50"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

