"use client";
import { useAuth } from "../../auth/hooks/use-auth";

interface EditorHeaderProps {
  lastSaved?: string | null;
}

export default function EditorHeader({ lastSaved }: EditorHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">New Article Editor</h1>
        <p className="text-gray-600 mt-2">
          {lastSaved && `Draft auto-saved at ${lastSaved}`}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center space-x-3 bg-white rounded-xl border border-gray-200 px-4 py-2">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-medium">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium text-gray-700">
              {user.username}
            </span>
          </div>
        )}

        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
