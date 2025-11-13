'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function VerifyEmailKey() {
  const params = useParams();
  const key = params.key as string;

  useEffect(() => {
    if (key) {
      // Redirect to Django's confirmation endpoint
      // Django will handle verification and redirect to /verify-email?status=success
      window.location.href = `http://localhost:8000/accounts/confirm-email/${key}/`;
    }
  }, [key]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900">Verifying your email...</h2>
        <p className="text-gray-600 mt-2">Please wait while we confirm your email address.</p>
      </div>
    </div>
  );
}