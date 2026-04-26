"use client";
import PostReplyCard from "./PostReplyCard";
import {
  MessageCircle,
  Heart,
  Bookmark,
  Share,
  BarChart2,
  Repeat,
} from "lucide-react";
import { formatDistanceToNowStrictk, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import apiFetch from "@/utils/api";
const Postcard = ({ post }) => {
  const { user } = useUser();
  const router = useRouter();
  const [likes, setLikes] = useState(post.likes || []);

  const [clickedLike, setClickedLike] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const isLiked = likes.some((id) => id.toString() === user?._id.toString());
  const formatTwitterTime = (date) => {
    const now = new Date();
    const postDate = new Date(date);

    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;

    // older → show date
    return format(postDate, "MMM d");
  };
  const handleLike = async (id) => {
    const postId = id.toString();
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/like/${postId}`,
      { method: "POST" },
      router,
    );
    const data = await res.json();
    if (res.ok) {
      setLikes((prev) => {
        if (data.liked) {
          return [...prev, data.userId];
        } else {
          return prev.filter((id) => id !== data.userId);
        }
      });
    }
    setClickedLike(false);
  };

  return (
    <>
      <div className="border-b border-gray-700">
        <div
          onClick={() =>
            router.push(`${post.user.username}/status/${post._id}`)
          }
          className="cursor-pointer"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/${post.user.username}`);
            }}
            className="flex w-fit items-center gap-2 mx-4 my-2 cursor-pointer"
          >
            <img
              src={post.user.profilePic || "/default-avatar.png"}
              alt=""
              className="rounded-full object-cover w-10 h-10"
            />

            <div className="flex flex-col">
              <div className="flex gap-2">
                <span className="font-bold hover:underline">
                  {post.user.name}
                </span>
                <span className="text-gray-400">@{post.user.username}</span>
                <span className="text-gray-400">
                  {formatTwitterTime(post.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-17 mr-5">
            <div className="border border-gray-700 min-h-20  rounded-2xl p-4">
              <span>{post.content}</span>
            </div>
            <div className="text-gray-400 flex gap-8 justify-around mb-2 mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReply(true);
                }}
                className="flex  group p-2 hover:text-blue-400 rounded-full cursor-pointer transition items-center text-sm "
              >
                <div className="p-2 rounded-full group-hover:bg-blue-400/15">
                  <MessageCircle size={18} />
                </div>
                1.3k
              </button>
              <button className="flex  group p-2 hover:text-green-300 rounded-full cursor-pointer transition items-center text-sm ">
                <div className="p-2 rounded-full group-hover:bg-green-300/12">
                  <Repeat size={18} />
                </div>{" "}
                1.3k
              </button>
              <button
                disabled={clickedLike}
                onClick={(e) => {
                  e.stopPropagation();
                  setClickedLike(true);
                  handleLike(post._id);
                }}
                className={
                  isLiked
                    ? "flex  group p-2 text-[#f91880] rounded-full cursor-pointer transition items-center text-sm"
                    : "flex  group p-2 hover:text-[#f91880] rounded-full cursor-pointer transition items-center text-sm "
                }
              >
                <div className="group-hover:bg-[#f91880]/15 rounded-full p-2 ">
                  <Heart fill={isLiked ? "currentColor" : ""} size={18} />
                </div>{" "}
                <span>{likes.length}</span>
              </button>
              <button className="flex  group p-2 hover:text-blue-400 rounded-full cursor-pointer transition items-center text-sm ">
                <div className="p-2 rounded-full group-hover:bg-blue-400/15">
                  <BarChart2 size={18} />
                </div>
                1.3k
              </button>
              <div className="flex justify-center items-center gap-2">
                <button className="flex  p-2 hover:bg-blue-400/15 hover:text-blue-400 rounded-full cursor-pointer transition items-center text-sm ">
                  <Bookmark size={18} />
                </button>
                <button className="flex hover:bg-blue-400/15 p-2 hover:text-blue-400 rounded-full cursor-pointer transition items-center text-sm ">
                  <Share size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showReply && <PostReplyCard post={post} setShowReply={setShowReply} />}
    </>
  );
};

export default Postcard;
