"use client";
import { motion } from "framer-motion";
import type React from "react";

import { cn } from "@/lib/utils"; // Ensure cn utility is imported

interface StepCardProps {
  step: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  className?: string;
}

export default function StepCard({
  step,
  title,
  desc,
  icon: Icon,
  color,
  className,
}: StepCardProps) {
  const iconWrapperStyle = (bgColor: string) =>
    `p-2 bg-${bgColor}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`;
  const iconStyle = (textColor: string) => `w-4 h-4 text-${textColor}-600`;
  const titleStyle = "font-bold text-sm md:text-base text-gray-900 mb-1";
  const descStyle = "text-xs md:text-sm text-gray-600 leading-relaxed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Number.parseInt(step) * 0.1 }}
      className={cn(
        "flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all duration-300 group",
        className
      )}
    >
      <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 mb-2">
        {step}
      </div>
      <div className={iconWrapperStyle(color)}>
        <Icon className={iconStyle(color)} />
      </div>
      <div>
        <h4 className={titleStyle}>{title}</h4>
        <p className={descStyle}>{desc}</p>
      </div>
    </motion.div>
  );
}