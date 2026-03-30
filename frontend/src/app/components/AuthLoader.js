"use client";

import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import apiFetch from "@/utils/api";
const AuthLoader = () => {
  const { setUser, userPosts, setUserPosts, setLoading } = useUser();

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const res = await apiFetch(
        `${API_URL}/user/me`,
        { method: "GET" },
        router,
      );
      if (!res) return;
      const data = await res.json();
      setUser(data.user);
      setUserPosts(data.posts)
      setLoading(false)

    };
    fetchUser();
    
  }, []);
  return null;
};

export default AuthLoader;
