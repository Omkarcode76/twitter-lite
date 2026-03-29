"use client";
import { use, useEffect, useState } from "react";
import Loader from "./Loader";
import {
  User,
  Globe2,
  Smile,
  CalendarClock,
  FlagTriangleRight,
  LocationEdit,
  GalleryThumbnails,
} from "lucide-react";
import Postcard from "../components/Postcard";
const Feed = () => {
  const [showWhoCanReply, setshowWhoCanReply] = useState(false);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [feedloader, setFeedLoader] = useState(false);
  const [postingLoader, setPostingLoader] = useState(false)
  useEffect(() => {
    const getPosts = async () => {
      
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      setFeedLoader(true);
      const res = await fetch(`${API_URL}/post`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedLoader(false);
      const data = await res.json();
      if (res.ok) {
        setPosts(data);
      }
     
    };
    
    getPosts();
    
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPostingLoader(true)
    const token = localStorage.getItem("token");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: postText,
      }),
    });
   
    const data = await res.json();
    const newPost = data
    setPosts((prev)=>[newPost, ...prev])
    setPostText("");
    setPostingLoader(false)
  };

  return (
    <>
      <div className="relative w-[600px] min-h-screen border-x border-gray-700">
        <div className="sticky top-0 backdrop-blur-md bg-black/40">
          <div className="flex font-bold justify-around py-5 border-b border-gray-700 relative">
            <div className="">
              <span className="">For you</span>
              <div className="h-1 w-14 absolute bottom-0 rounded-full bg-blue-400"></div>
            </div>
            <div>
              <span>Following</span>
              <div className="h-1 w-18 absolute bottom-0 rounded-full bg-blue-400"></div>
            </div>
          </div>
        </div>
        <div className="what'shappening? border-b border-gray-700">
          <div className="p-4">
            <form onSubmit={(e) => handlePostSubmit(e)}>
              <div className="flex gap-3 items-center">
                <img
                  src="/default-avatar.png"
                  alt=""
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
                <input
                  onClick={() => setshowWhoCanReply(true)}
                  onChange={(e) => setPostText(e.target.value)}
                  value={postText}
                  type="text"
                  placeholder="What's happening?"
                  className="focus:outline-none text-xl placeholder:text-2xl w-full placeholder-gray-400"
                />
              </div>

              {showWhoCanReply && (
                <div className="text-blue-400 flex font-bold text-sm gap-1  mx-10 my-5">
                  <Globe2 size={18} />
                  <span className="cursor-pointer">Everyone can reply</span>
                </div>
              )}
              <div
                className={
                  !showWhoCanReply
                    ? "flex items-center justify-between pt-4 ml-10"
                    : "flex items-center justify-between pt-4 ml-10 border-t border-gray-700 "
                }
              >
                <div className="flex text-blue-400 gap-4">
                  <Smile size={18} className="cursor-pointer" />
                  <CalendarClock size={18} className="cursor-pointer" />
                  <LocationEdit size={18} className="cursor-pointer" />
                  <FlagTriangleRight size={18} className="cursor-pointer" />
                  <GalleryThumbnails size={18} className="cursor-pointer" />
                </div>
                <button
                  type="submit"
                  disabled={!postText || postingLoader}
                  className={
                    postText
                      ? "font-bold text-sm text-black rounded-full cursor-pointer bg-white px-3 py-2"
                      : "font-bold text-sm text-black rounded-full cursor-pointer bg-gray-400 px-3 py-2"
                  }
                >
                 {postingLoader ? (<span>Posting..</span>) : (<span>Post</span>)}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center itemms-center py-4 border-y cursor-pointer border-gray-700">
          <span className="text-blue-400">show posts</span>
        </div>
        {feedloader ? (
          <Loader />
        ) : (
          posts.map((post) => <Postcard key={post._id} post={post} />)
        )}
      </div>
    </>
  );
};

export default Feed;
