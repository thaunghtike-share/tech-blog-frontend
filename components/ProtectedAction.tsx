// components/ProtectedAction.tsx - KEEP ONLY THIS VERSION
"use client";
import { useState, useEffect, ReactNode } from 'react';
import { ShieldOff, AlertTriangle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface BanStatus {
  is_banned: boolean;
  banned_reason?: string;
}

interface ProtectedActionProps {
  children: ReactNode;
  action?: string;
  className?: string;
  fallback?: ReactNode;
}

export default function ProtectedAction({ 
  children, 
  action = "perform this action",
  className = "",
  fallback
}: ProtectedActionProps) {
  const [isBanned, setIsBanned] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkBan();
  }, []);

  const checkBan = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setChecking(false);
        return;
      }

      // Try both API endpoints
      const endpoints = [
        `${API_BASE_URL}/check-ban-status/`,
        `${API_BASE_URL}/api/check-ban-status/`
      ];

      let response = null;
      for (const endpoint of endpoints) {
        try {
          response = await fetch(endpoint, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (response.ok) break;
        } catch (error) {
          console.warn(`Failed to fetch from ${endpoint}:`, error);
        }
      }

      if (response && response.ok) {
        const data: BanStatus = await response.json();
        setIsBanned(data.is_banned);
        setBanReason(data.banned_reason || '');
      }
    } catch (error) {
      console.error('Error checking ban status:', error);
    } finally {
      setChecking(false);
    }
  };

  if (checking) {
    return <div className={className}>{children}</div>;
  }

  if (isBanned) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center p-4">
          <div className="text-center">
            <ShieldOff className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              Action Restricted
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              You cannot {action} while banned
            </p>
            {banReason && (
              <div className="flex items-center gap-1 justify-center text-xs text-red-600 dark:text-red-400">
                <AlertTriangle className="w-3 h-3" />
                <span>Reason: {banReason}</span>
              </div>
            )}
          </div>
        </div>
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  return <div className={className}>{children}</div>;
}