"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Database,
  Shield,
  Bell,
  Mail,
  Globe,
  Key,
  Server,
  Save,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Download,
  Upload
} from "lucide-react";
import { motion } from "framer-motion";

const systemSettings = {
  general: {
    siteName: "GROEI",
    siteUrl: "https://groei.com",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true,
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "noreply@groei.com",
    emailFrom: "noreply@groei.com",
  },
  security: {
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    passwordMinLength: 8,
  },
  storage: {
    maxFileSize: 10,
    allowedFileTypes: ["pdf", "doc", "docx"],
    storageProvider: "local",
  },
};

export function SuperAdminSettingsContent() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState(systemSettings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "email", label: "Email", icon: Mail },
    { id: "security", label: "Security", icon: Shield },
    { id: "storage", label: "Storage", icon: Database },
  ];

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
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                  System Settings
                </span>
              </h1>
              <p className="text-lg text-[#9ca3af]">
                Configure platform-wide settings and preferences
              </p>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white border-0"
                        : "border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </motion.div>

          <div className="grid gap-6">
            {activeTab === "general" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                      <Globe className="h-5 w-5 text-[#ec4899]" />
                      General Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">Site Name</label>
                      <Input
                        value={settings.general.siteName}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, siteName: e.target.value }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">Site URL</label>
                      <Input
                        value={settings.general.siteUrl}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, siteUrl: e.target.value }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                      <div>
                        <p className="text-sm font-medium text-[#e8e8f0]">Maintenance Mode</p>
                        <p className="text-xs text-[#9ca3af]">Enable to put the site in maintenance mode</p>
                      </div>
                      <Button
                        variant={settings.general.maintenanceMode ? "default" : "outline"}
                        onClick={() => setSettings({
                          ...settings,
                          general: { ...settings.general, maintenanceMode: !settings.general.maintenanceMode }
                        })}
                        className={settings.general.maintenanceMode ? "bg-[#ef4444] hover:bg-[#dc2626]" : ""}
                      >
                        {settings.general.maintenanceMode ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                      <div>
                        <p className="text-sm font-medium text-[#e8e8f0]">Registration Enabled</p>
                        <p className="text-xs text-[#9ca3af]">Allow new user registrations</p>
                      </div>
                      <Button
                        variant={settings.general.registrationEnabled ? "default" : "outline"}
                        onClick={() => setSettings({
                          ...settings,
                          general: { ...settings.general, registrationEnabled: !settings.general.registrationEnabled }
                        })}
                        className={settings.general.registrationEnabled ? "bg-[#10b981] hover:bg-[#059669]" : ""}
                      >
                        {settings.general.registrationEnabled ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "email" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                      <Mail className="h-5 w-5 text-[#ec4899]" />
                      Email Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">SMTP Host</label>
                      <Input
                        value={settings.email.smtpHost}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, smtpHost: e.target.value }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">SMTP Port</label>
                      <Input
                        type="number"
                        value={settings.email.smtpPort}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, smtpPort: parseInt(e.target.value) }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">SMTP User</label>
                      <Input
                        value={settings.email.smtpUser}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, smtpUser: e.target.value }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">Email From</label>
                      <Input
                        value={settings.email.emailFrom}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, emailFrom: e.target.value }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                      <Shield className="h-5 w-5 text-[#ec4899]" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">Session Timeout (minutes)</label>
                      <Input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">Max Login Attempts</label>
                      <Input
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">Password Min Length</label>
                      <Input
                        type="number"
                        value={settings.security.passwordMinLength}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, passwordMinLength: parseInt(e.target.value) }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                      <div>
                        <p className="text-sm font-medium text-[#e8e8f0]">Two-Factor Authentication</p>
                        <p className="text-xs text-[#9ca3af]">Require 2FA for admin accounts</p>
                      </div>
                      <Button
                        variant={settings.security.twoFactorAuth ? "default" : "outline"}
                        onClick={() => setSettings({
                          ...settings,
                          security: { ...settings.security, twoFactorAuth: !settings.security.twoFactorAuth }
                        })}
                        className={settings.security.twoFactorAuth ? "bg-[#10b981] hover:bg-[#059669]" : ""}
                      >
                        {settings.security.twoFactorAuth ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "storage" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                      <Database className="h-5 w-5 text-[#ec4899]" />
                      Storage Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">Max File Size (MB)</label>
                      <Input
                        type="number"
                        value={settings.storage.maxFileSize}
                        onChange={(e) => setSettings({
                          ...settings,
                          storage: { ...settings.storage, maxFileSize: parseInt(e.target.value) }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">Allowed File Types</label>
                      <Input
                        value={settings.storage.allowedFileTypes.join(", ")}
                        onChange={(e) => setSettings({
                          ...settings,
                          storage: { ...settings.storage, allowedFileTypes: e.target.value.split(", ") }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#e8e8f0] mb-2 block">Storage Provider</label>
                      <Input
                        value={settings.storage.storageProvider}
                        onChange={(e) => setSettings({
                          ...settings,
                          storage: { ...settings.storage, storageProvider: e.target.value }
                        })}
                        className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      {saveSuccess && (
                        <div className="flex items-center gap-2 text-[#10b981] mb-2">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-sm">Settings saved successfully!</span>
                        </div>
                      )}
                      <p className="text-sm text-[#9ca3af]">Save your changes to apply them to the platform</p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white hover:from-[#d946ef] hover:to-[#7c3aed] border-0"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

