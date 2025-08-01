"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => initializeGoogleSignIn();
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      (window as any).google.accounts.id.initialize({
        client_id:
          "588363886976-b1vchi7rt4bif974kpr076dl47po8tor.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("google-signin-button")!,
        { theme: "outline", size: "large" }
      );
    };

    if (typeof window !== "undefined") {
      if (!(window as any).google) {
        loadGoogleScript();
      } else {
        initializeGoogleSignIn();
      }
    }
  }, []);

  async function handleGoogleResponse(response: any) {
    const id_token = response.credential;
    console.log("Google ID Token:", id_token); // 📌 You'll see this in DevTools console

    setIdToken(id_token); // for testing with curl
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/google/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token }), // <-- MUST use `id_token`
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend error:", errorData);
        throw new Error("Google login failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token || data.access_token);
      router.push("/admin/new-article");
    } catch (error: any) {
      alert("Google login failed. See console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Login with Google</h1>

      <div id="google-signin-button" className="mb-4" />

      {loading && (
        <p className="text-blue-600 mb-4">Logging in with Google...</p>
      )}

      <button
        onClick={() => setTokenVisible((v) => !v)}
        className="text-sm text-blue-500 underline mb-4"
      >
        {tokenVisible ? "Hide Token" : "Show ID Token for curl"}
      </button>

      {tokenVisible && idToken && (
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded text-xs"
          value={idToken}
          readOnly
        />
      )}

      <p className="text-gray-500 text-sm mt-6">
        Make sure your backend is running at{" "}
        <code className="bg-gray-100 px-1">http://localhost:8000</code>
      </p>
    </main>
  );
}
