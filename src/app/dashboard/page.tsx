"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  picture: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (!userData) {
        router.replace("/");
      } else {
        setUser(JSON.parse(userData));
      }
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("user");
    router.replace("/");
  }

  if (!user) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1>Hello, {user.name}!</h1>
      <p>Welcome to your dashboard.</p>
      <button onClick={handleLogout} style={{ marginTop: 24, padding: "10px 20px", fontSize: "1rem" }}>
        Logout
      </button>
    </div>
  );
} 