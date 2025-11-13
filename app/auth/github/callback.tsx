"use client";
import { useEffect } from 'react';

export default function GitHubCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const storedState = sessionStorage.getItem('github_oauth_state');

      console.log('GitHub Callback - Code:', code);
      console.log('GitHub Callback - State:', state);

      if (!code || state !== storedState) {
        window.opener?.postMessage({ 
          type: 'GITHUB_OAUTH_ERROR', 
          error: 'Invalid state or code' 
        }, window.location.origin);
        window.close();
        return;
      }

      try {
        // Exchange code for access token
        const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/github/exchange-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, state }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.access_token) {
          window.opener?.postMessage({
            type: 'GITHUB_OAUTH_SUCCESS',
            access_token: tokenData.access_token
          }, window.location.origin);
        } else {
          window.opener?.postMessage({
            type: 'GITHUB_OAUTH_ERROR',
            error: tokenData.error || 'Failed to get access token'
          }, window.location.origin);
        }
      } catch (error) {
        window.opener?.postMessage({
          type: 'GITHUB_OAUTH_ERROR',
          error: 'Failed to exchange token'
        }, window.location.origin);
      }

      window.close();
    };

    handleCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Completing GitHub Sign In...</h2>
        <p>Please wait while we redirect you.</p>
      </div>
    </div>
  );
}