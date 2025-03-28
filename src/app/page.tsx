"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
export default function Home() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  return (
    <>
      {isLoggedIn ? (
        <button onClick={() => router.push("/dashboard")}>Home</button>
      ) : (
        <button onClick={() => router.push("/login")}>Login</button>
      )}
    </>
  );
}
