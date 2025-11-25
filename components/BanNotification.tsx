// components/BanNotification.tsx - CORRECT VERSION
"use client";
import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, UserX, Shield, X } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface BanDetails {
  is_banned: boolean;
  reason: string;
  banned_at: string;
  banned_by: string;
  banned_until?: string;
  is_temporary: boolean;
}

export default function BanNotification() {
  const [banDetails, setBanDetails] = useState<BanDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    checkBanStatus();
  }, []);

  const checkBanStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const endpoints = [
        `${API_BASE_URL}/ban-details/`,
        `${API_BASE_URL}/api/ban-details/`
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
        const data: BanDetails = await response.json();
        if (data.is_banned) {
          setBanDetails(data);
          const dismissedBans = localStorage.getItem('dismissed_bans') || '[]';
          const dismissedArray = JSON.parse(dismissedBans);
          if (!dismissedArray.includes(data.banned_at)) {
            setDismissed(false);
          } else {
            setDismissed(true);
          }
        }
      }
    } catch (error) {
      console.error('Error checking ban status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    if (banDetails) {
      const dismissedBans = localStorage.getItem('dismissed_bans') || '[]';
      const dismissedArray = JSON.parse(dismissedBans);
      dismissedArray.push(banDetails.banned_at);
      localStorage.setItem('dismissed_bans', JSON.stringify(dismissedArray));
      setDismissed(true);
    }
  };

  if (loading || !banDetails || dismissed) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-full mx-4">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Shield className="w-6 h-6 text-red-600 dark:text-red-400 mt-1" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <UserX className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                Account Banned
              </h3>
            </div>
            
            <p className="text-red-700 dark:text-red-300 mb-4 text-sm leading-relaxed">
              {banDetails.reason || "Your account has been suspended due to violations of our community guidelines."}
            </p>

            <div className="space-y-2 text-xs text-red-600 dark:text-red-400 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span><strong>Banned on:</strong> {formatDate(banDetails.banned_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" />
                <span><strong>By:</strong> {banDetails.banned_by}</span>
              </div>
              {banDetails.is_temporary && banDetails.banned_until && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span><strong>Ban expires:</strong> {formatDate(banDetails.banned_until)}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-red-200 dark:border-red-700">
              <p className="text-xs text-red-600 dark:text-red-400">
                <strong>Restrictions:</strong> You can view content but cannot create, edit, or delete articles.
                Contact support if you believe this is a mistake.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}