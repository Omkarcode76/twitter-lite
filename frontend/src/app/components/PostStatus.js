"use client";
import { ArrowLeft } from "lucide-react";
import Postcard from "./Postcard";
import { useEffect } from "react";
import apiFetch from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
const PostStatus = ({ username, postId }) => {
  const router = useRouter();

  const [parentPost, setParentPost] = useState(null);

  useEffect(() => {
    getParentPost();
  }, []);
  const getParentPost = async () => {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`,
      { method: "GET" },
      router,
    );
    const data = await res.json();
    if (res.ok) {
      setParentPost(data);
    }
  };

  return (
    <div>
      <div className="sticky gap-6 px-2 text-xl items-center top-0 backdrop-blur-md bg-black/40 flex font-bold h-14">
        <button
          onClick={() => router.back()}
          className="cursor-pointer p-2 rounded-full hover:bg-gray-900 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <span>Post</span>
      </div>
      {parentPost && <Postcard post={parentPost} />}
    </div>
  );
};

export default PostStatus;
