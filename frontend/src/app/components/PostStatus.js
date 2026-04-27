"use client";
import { ArrowLeft } from "lucide-react";
import Postcard from "./Postcard";
import { useEffect } from "react";
import apiFetch from "@/utils/api";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { useState } from "react";

import {
  Globe2,
  Smile,
  CalendarClock,
  FlagTriangleRight,
  LocationEdit,
  GalleryThumbnails,
} from "lucide-react";
const PostStatus = ({ username, postId }) => {
  const { user } = useUser();
  const router = useRouter();

  const [parentPost, setParentPost] = useState(null);
  const [replies, setReplies] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [inputClicked, setInputClicked] = useState(false);
  useEffect(() => {
    getParentPost();
    getReplies();
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

  const getReplies = async () => {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/replies/${postId}`,
      { method: "GET" },
      router,
    );
    const data = await res.json();

    if (res.ok) {
      setReplies(data);
    }
  };

  const handleReply = async () => {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/reply/${postId}`,
      { method: "POST", body: JSON.stringify({ content: replyText }) },
      router,
    );
    const data = await res.json()
    if(res.ok){
      const newReply = data
      setReplies((prev)=>[newReply, ...prev])
      setInputClicked(false)
      setReplyText("")
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
      <div className="min-h-25 border-b border-gray-700 py-2 px-5">
        {inputClicked && (
          <div className="mx-13 mb-4">
            Replying to <span className="text-blue-400">@{username}</span>
          </div>
        )}
        <form className="mt-5" onSubmit={(e) => {e.preventDefault() 
                                                  handleReply()}}>
          <div className="flex gap-3 ">
            <img
              src={user?.profilePic || "/default-avatar.png"}
              alt=""
              className="h-10 w-10 rounded-full cursor-pointer object-cover bg-center"
            />
            <textarea
              rows={1}
              onClick={() => setInputClicked(true)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              className="outline-none resize-none text-xl placeholder:text-2xl w-full placeholder-gray-400"
              onChange={(e) => setReplyText(e.target.value)}
              value={replyText}
              type="text"
              placeholder="Post your reply"
            />

            {!inputClicked && (
              <button
                disabled={true}
                className="font-bold text-sm text-black rounded-full bg-gray-700 w-20 py-2"
              >
                <span>Reply</span>
              </button>
            )}
          </div>
          {inputClicked && (
            <div className="flex items-center justify-between pt-4 ml-10">
              <div className="flex text-blue-400 gap-4">
                <Smile size={18} className="cursor-pointer" />
                <CalendarClock size={18} className="cursor-pointer" />
                <LocationEdit size={18} className="cursor-pointer" />
                <FlagTriangleRight size={18} className="cursor-pointer" />
                <GalleryThumbnails size={18} className="cursor-pointer" />
              </div>
              <button
                type="submit"
                disabled={!replyText}
                className={
                  replyText
                    ? "font-bold text-sm text-black rounded-full cursor-pointer bg-white w-16 py-2"
                    : "font-bold text-sm text-black rounded-full bg-gray-700 w-16 py-2"
                }
              >
                <span>Reply</span>
              </button>
            </div>
          )}
        </form>
      </div>
      {replies &&
        replies.map((post) => <Postcard key={post._id} post={post} />)}
    </div>
  );
};

export default PostStatus;
