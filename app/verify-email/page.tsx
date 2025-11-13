'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'success') {
      setMessage('Email verified successfully!');
      const timer = setTimeout(() => {
        router.push('/auth?message=email_verified&tab=signin');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Your email has been successfully verified. You can now sign in to your account.
          </p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  // Default view when no status
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Email Verification</h2>
        <p className="text-gray-600 mt-2">Please check your email for the verification link.</p>
      </div>
    </div>
  );
}