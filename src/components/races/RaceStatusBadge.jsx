import React from "react";
import { Clock, Play, CheckCircle2, XCircle, FileText, UserPlus, ShieldAlert, Award } from "lucide-react";

const STATUS_CONFIGS = {
  "Draft": {
    label: "Draft",
    badge: "bg-zinc-100 text-zinc-600 border-zinc-200/50",
    icon: FileText,
  },
  "Open Registration": {
    label: "Open Registration",
    badge: "bg-blue-50 text-blue-600 border-blue-200/50",
    icon: UserPlus,
  },
  "Registration Closed": {
    label: "Registration Closed",
    badge: "bg-amber-50 text-amber-700 border-amber-200/50",
    icon: Clock,
  },
  "Ready To Start": {
    label: "Ready To Start",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/50",
    icon: ShieldAlert,
  },
  "Racing": {
    label: "Racing",
    badge: "bg-red-50 text-red-600 border-red-200/50",
    icon: Play,
    pulse: true,
  },
  "Finished": {
    label: "Finished",
    badge: "bg-purple-50 text-purple-700 border-purple-200/50",
    icon: CheckCircle2,
  },
  "Completed": {
    label: "Completed",
    badge: "bg-purple-50 text-purple-700 border-purple-200/50",
    icon: CheckCircle2,
  },
  "Awarded": {
    label: "Awarded",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200/50",
    icon: Award,
  },
  "Cancelled": {
    label: "Cancelled",
    badge: "bg-rose-50 text-rose-600 border-rose-200/50",
    icon: XCircle,
  }
};

function RaceStatusBadge({ status }) {
  const cfg = STATUS_CONFIGS[status] || {
    label: status || "Unknown",
    badge: "bg-zinc-100 text-zinc-600 border-zinc-200",
    icon: Clock,
  };

  const Icon = cfg.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${cfg.badge}`}>
      {cfg.pulse ? (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
      ) : (
        <Icon className="w-3.5 h-3.5" />
      )}
      {cfg.label}
    </span>
  );
}

export default RaceStatusBadge;
