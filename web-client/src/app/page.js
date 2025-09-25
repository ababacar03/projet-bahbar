"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/middleware/auth-middleware";
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const user = checkAuth();

    if (user) {
      router.replace("/home");
    } else {
      router.replace("/auth/login");
    }
  }, [router]);

  return null; // ou un petit loader visuel
}
