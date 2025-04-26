"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      router.replace("/");
    } else {
      try {
        const decoded = JSON.parse(atob(token));
        if (decoded.exp < Date.now()) {
          localStorage.removeItem("token");
          router.replace("/");
        } else {
          setAuthorized(true); // Only after fully validated
        }
      } catch (error) {
        localStorage.removeItem("token");
        router.replace("/");
      }
    }
  }, [router]);

  if (!authorized) {
    return null; // ❌ Don't show anything until authorized
  }

  return <>{children}</>; // ✅ Now safe to show page
}
