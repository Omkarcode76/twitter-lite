"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import {
  Smile,
  CalendarClock,
  LocationEdit,
  FlagTriangleRight,
  GalleryThumbnails,
} from "lucide-react";
import apiFetch from "@/utils/api";
const PostReplyCard = ({ post, setShowReply }) => {
  const router = useRouter();
  const [postText, setPostText] = useState("");
  const { user } = useUser();

  const handleReply = async (postId) => {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/reply/${postId}`,
      { method: "POST", body: JSON.stringify({ content: postText }) },
      router,
    );
    const data = await res.json()
    if(res.ok){
      console.log(data)
    }
  };
  return (
    <div className="fixed inset-0  bg-black/70 flex items-center justify-center z-50 ">
      <div className="absolute top-15 left-[33.6vw] bg-black w-[600px] min-h-[350px]  rounded-2xl">
        <button
          className="cursor-pointer p-2 rounded-full hover:bg-gray-900 mb-4 mx-2 mt-2"
          onClick={() => setShowReply(false)}
        >
          <X size={20} />
        </button>
        <div className="relative flex flex-col gap-3">
          <div className="absolute top-14 left-9 w-px bottom-28 bg-gray-700"></div>

          <div className="flex w-fit items-start gap-2 mx-4 my-2 cursor-pointer">
            <img
              src={post.user.profilePic || "/default-avatar.png"}
              className="rounded-full object-cover w-10 h-10"
            />

            <div className="flex flex-col">
              <div className="flex gap-2">
                <span className="font-bold hover:underline">
                  {post.user.name}
                </span>
                <span className="text-gray-400">@{post.user.username}</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-700 min-h-20 ml-16 mr-4 rounded-2xl p-4">
            <span>{post.content}</span>
          </div>
          <div className=" mx-16 text-gray-600">
            Replying to{" "}
            <span className="text-blue-400">@{post.user.username}</span>
          </div>

          <div className="flex mx-4 my-2 gap-2 ">
            <img
              className="rounded-full object-cover w-10 h-10"
              src={`${user.profilePic}` || "/default-avatar.png"}
            />
            <textarea
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              className="outline-none resize-none placeholder:text-xl min-h-24 text-xl w-full"
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
              type="text"
              placeholder="Post your reply"
            />
          </div>
        </div>
        <div className="flex justify-between w-full px-4 items-center ">
          <div className="flex text-blue-400 gap-4 ">
            <Smile size={18} className="cursor-pointer" />
            <CalendarClock size={18} className="cursor-pointer" />
            <LocationEdit size={18} className="cursor-pointer" />
            <FlagTriangleRight size={18} className="cursor-pointer" />
            <GalleryThumbnails size={18} className="cursor-pointer" />
          </div>
          <button
            onClick={() => handleReply(post._id)}
            disabled={!postText}
            className={
              postText
                ? "font-bold  text-black rounded-full cursor-pointer bg-white w-18 py-2"
                : "font-bold  text-black/70 rounded-full bg-gray-600 w-18 py-2"
            }
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReplyCard;
