"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  User,
  Bell,
  Shield,
  Mail,
  Lock,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Download,
  Upload,
  Key,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    jobMatches: true,
    applicationUpdates: true,
    interviewReminders: true,
    weeklyDigest: false,
    smsNotifications: false,
    darkMode: true,
    profileVisibility: "public",
    dataSharing: true,
    analyticsTracking: true,
  });
  const [userData, setUserData] = useState(mockUser);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveType, setSaveType] = useState<"account" | "notifications" | "privacy" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNotificationSettings = localStorage.getItem("notificationSettings");
      const savedPrivacySettings = localStorage.getItem("privacySettings");
      
      if (savedNotificationSettings) {
        const parsed = JSON.parse(savedNotificationSettings);
        setSettings(prev => ({
          ...prev,
          emailNotifications: parsed.emailNotifications ?? prev.emailNotifications,
          jobMatches: parsed.jobMatches ?? prev.jobMatches,
          applicationUpdates: parsed.applicationUpdates ?? prev.applicationUpdates,
          interviewReminders: parsed.interviewReminders ?? prev.interviewReminders,
          weeklyDigest: parsed.weeklyDigest ?? prev.weeklyDigest,
          smsNotifications: parsed.smsNotifications ?? prev.smsNotifications,
        }));
      }

      if (savedPrivacySettings) {
        const parsed = JSON.parse(savedPrivacySettings);
        setSettings(prev => ({
          ...prev,
          profileVisibility: parsed.profileVisibility ?? prev.profileVisibility,
          dataSharing: parsed.dataSharing ?? prev.dataSharing,
          analyticsTracking: parsed.analyticsTracking ?? prev.analyticsTracking,
        }));
      }
    }
  }, []);

  const handleSave = (type: "account" | "notifications" | "privacy") => {
    if (typeof window !== "undefined") {
      if (type === "notifications") {
        const notificationSettings = {
          emailNotifications: settings.emailNotifications,
          jobMatches: settings.jobMatches,
          applicationUpdates: settings.applicationUpdates,
          interviewReminders: settings.interviewReminders,
          weeklyDigest: settings.weeklyDigest,
          smsNotifications: settings.smsNotifications,
        };
        localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
      } else if (type === "privacy") {
        const privacySettings = {
          profileVisibility: settings.profileVisibility,
          dataSharing: settings.dataSharing,
          analyticsTracking: settings.analyticsTracking,
        };
        localStorage.setItem("privacySettings", JSON.stringify(privacySettings));
      } else if (type === "account") {
        localStorage.setItem("userAccountData", JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        }));
      }
    }
    setSaveType(type);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setSaveType(null);
    }, 3000);
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("appliedJobs");
        localStorage.removeItem("userApplications");
        window.location.href = "/";
      }
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
  ];

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
                Settings
              </span>
            </h1>
            <p className="text-lg text-[#9ca3af]">
              Manage your account settings and preferences
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            activeTab === tab.id
                              ? "bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 text-[#a5b4fc] border border-[#6366f1]/30"
                              : "text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-6">
              {activeTab === "account" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                        <User className="h-5 w-5 text-[#6366f1]" />
                        Account Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Full Name</label>
                        <Input
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Email</label>
                        <Input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Phone Number</label>
                        <Input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => handleSave("account")}
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        {saveSuccess && saveType === "account" && (
                          <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                            Saved successfully!
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                        <Download className="h-5 w-5 text-[#6366f1]" />
                        Data Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                        <div>
                          <p className="font-medium text-[#e8e8f0]">Export Your Data</p>
                          <p className="text-sm text-[#9ca3af]">Download all your account data</p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e]"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                        <div>
                          <p className="font-medium text-[#e8e8f0]">Delete Account</p>
                          <p className="text-sm text-[#9ca3af]">Permanently delete your account and all data</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleDeleteAccount}
                          className="border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/10 hover:border-[#ef4444]/50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                        <Bell className="h-5 w-5 text-[#6366f1]" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">Email Notifications</p>
                              <p className="text-sm text-[#9ca3af]">Receive notifications via email</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.emailNotifications}
                              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">Job Matches</p>
                              <p className="text-sm text-[#9ca3af]">Get notified about new job matches</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.jobMatches}
                              onChange={(e) => setSettings({ ...settings, jobMatches: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">Application Updates</p>
                              <p className="text-sm text-[#9ca3af]">Notifications about application status changes</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.applicationUpdates}
                              onChange={(e) => setSettings({ ...settings, applicationUpdates: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">Interview Reminders</p>
                              <p className="text-sm text-[#9ca3af]">Reminders before scheduled interviews</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.interviewReminders}
                              onChange={(e) => setSettings({ ...settings, interviewReminders: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">Weekly Digest</p>
                              <p className="text-sm text-[#9ca3af]">Weekly summary of your job search activity</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.weeklyDigest}
                              onChange={(e) => setSettings({ ...settings, weeklyDigest: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Smartphone className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">SMS Notifications</p>
                              <p className="text-sm text-[#9ca3af]">Receive important updates via SMS</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.smsNotifications}
                              onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => handleSave("notifications")}
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Preferences
                        </Button>
                        {saveSuccess && saveType === "notifications" && (
                          <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                            Preferences saved!
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === "privacy" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                        <Shield className="h-5 w-5 text-[#6366f1]" />
                        Privacy Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Profile Visibility</label>
                        <select
                          value={settings.profileVisibility}
                          onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                          className="w-full bg-[#1e1e2e] border border-[#2a2a3a] rounded-lg px-3 py-2 text-[#e8e8f0] focus:outline-none focus:border-[#6366f1]"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="recruiters-only">Recruiters Only</option>
                        </select>
                        <p className="text-xs text-[#9ca3af] mt-1">
                          {settings.profileVisibility === "public" && "Your profile is visible to everyone"}
                          {settings.profileVisibility === "private" && "Your profile is only visible to you"}
                          {settings.profileVisibility === "recruiters-only" && "Your profile is visible to verified recruiters"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                        <div>
                          <p className="font-medium text-[#e8e8f0]">Data Sharing</p>
                          <p className="text-sm text-[#9ca3af]">Allow sharing anonymized data for platform improvement</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.dataSharing}
                            onChange={(e) => setSettings({ ...settings, dataSharing: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                        <div>
                          <p className="font-medium text-[#e8e8f0]">Analytics Tracking</p>
                          <p className="text-sm text-[#9ca3af]">Help us improve by sharing usage analytics</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.analyticsTracking}
                            onChange={(e) => setSettings({ ...settings, analyticsTracking: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                        </label>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => handleSave("privacy")}
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Privacy Settings
                        </Button>
                        {saveSuccess && saveType === "privacy" && (
                          <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                            Privacy settings saved!
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                        <Lock className="h-5 w-5 text-[#6366f1]" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Current Password</label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={userData.currentPassword}
                            onChange={(e) => setUserData({ ...userData, currentPassword: e.target.value })}
                            className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] pr-10"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#e8e8f0]"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">New Password</label>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            value={userData.newPassword}
                            onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
                            className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] pr-10"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#e8e8f0]"
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-[#9ca3af] mt-1">Must be at least 8 characters long</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Confirm New Password</label>
                        <Input
                          type="password"
                          value={userData.confirmPassword}
                          onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                          placeholder="Confirm new password"
                        />
                        {userData.newPassword && userData.confirmPassword && userData.newPassword !== userData.confirmPassword && (
                          <p className="text-xs text-[#ef4444] mt-1">Passwords do not match</p>
                        )}
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSave}
                          disabled={userData.newPassword && userData.newPassword !== userData.confirmPassword}
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 disabled:opacity-50"
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Update Password
                        </Button>
                      </div>

                      <div className="pt-6 border-t border-[#2a2a3a]">
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30">
                          <AlertTriangle className="h-5 w-5 text-[#ef4444] mt-0.5" />
                          <div>
                            <p className="font-medium text-[#e8e8f0] mb-1">Two-Factor Authentication</p>
                            <p className="text-sm text-[#9ca3af] mb-3">Add an extra layer of security to your account</p>
                            <Button
                              variant="outline"
                              className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e]"
                            >
                              Enable 2FA
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

