import {
  FileText,
  Users,
  ShieldAlert,
  FolderOpen,
  Globe,
  Lock,
} from "lucide-react";

import StatCard from "./StatCard";

const DashboardStats = () => {
  return (
    <div
      className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
2xl:grid-cols-4
gap-7
mt-10
"
    >
      <StatCard
        title="Total Logs"
        value="12,458"
        trend="18.7%"
        subtitle="from last upload"
        icon={FileText}
        iconBg="rgba(37,99,235,.18)"
        iconColor="#3B82F6"
      />

      <StatCard
        title="Users"
        value="320"
        trend="12.5%"
        subtitle="unique users"
        icon={Users}
        iconBg="rgba(34,197,94,.18)"
        iconColor="#22C55E"
      />

      <StatCard
        title="Threats"
        value="24"
        trend="33.3%"
        subtitle="detected"
        icon={ShieldAlert}
        iconBg="rgba(245,158,11,.18)"
        iconColor="#F59E0B"
        positive={false}
      />

      <StatCard
        title="Cases"
        value="8"
        trend="14.3%"
        subtitle="investigations"
        icon={FolderOpen}
        iconBg="rgba(168,85,247,.18)"
        iconColor="#A855F7"
      />

      <StatCard
        title="Countries"
        value="54"
        trend="6.2%"
        subtitle="active"
        icon={Globe}
        iconBg="rgba(6,182,212,.18)"
        iconColor="#06B6D4"
      />

      <StatCard
        title="Failed Logins"
        value="178"
        trend="8.9%"
        subtitle="today"
        icon={Lock}
        iconBg="rgba(239,68,68,.18)"
        iconColor="#EF4444"
        positive={false}
      />
    </div>
  );
};

export default DashboardStats;
