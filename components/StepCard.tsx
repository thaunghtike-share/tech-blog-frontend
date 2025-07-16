"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileText, Terminal, RefreshCw } from "lucide-react";

interface StepCardProps {
  step: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function StepCard({
  step,
  title,
  desc,
  icon: Icon,
  color,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Number(step) * 0.1 }}
      className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all duration-300 group"
    >
      <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 mb-2">
        {step}
      </div>
      <div
        className={`p-2 bg-${color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mb-2`}
      >
        <Icon className={`w-4 h-4 text-${color}-600`} />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 mb-1 text-base">{title}</h4>
        <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
      </div>
    </motion.div>
  );
}
