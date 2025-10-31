"use client";
import { useState, useEffect } from "react";

interface User {
  username: string;
  email: string;
  avatar?: string;
  profileComplete: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token is valid by checking profile
      const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/authors/me/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUser({
          username: profileData.name || "Author",
          email: profileData.email || "",
          avatar: profileData.avatar,
          profileComplete: profileData.profile_complete || false,
        });
        setIsAuthenticated(true);
      } else {
        // Token invalid, clear it
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (profileData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...profileData } : null);
  };

  return {
    user,
    isAuthenticated,
    loading,
    checkAuth,
    login,
    logout,
    updateProfile,
  };
}