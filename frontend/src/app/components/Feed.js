"use client";
import {  useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import apiFetch from "@/utils/api";
import { useUser } from "../context/UserContext";
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
  const {user, setUserPosts} = useUser()
  const router = useRouter();
  const [showWhoCanReply, setshowWhoCanReply] = useState(false);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [feedloader, setFeedLoader] = useState(false);
  const [postingLoader, setPostingLoader] = useState(false);
  const [showFeed, setShowFeed] = useState({
    showForYou: true,
    showFollowing: false,
  })
  useEffect(() => {
    const getPosts = async () => {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      setFeedLoader(true);
      const res = await apiFetch(
        `${API_URL}/post`,
        {
          method: "GET",
        },
        router,
      );
      setFeedLoader(false);

      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    };

    getPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPostingLoader(true);
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
    if (res.status === 401) {
      router.push("/");
      return;
    }
   if(res.ok){
     const data = await res.json();
    const newPost = data;
    setPosts((prev) => [newPost, ...prev]);
    setUserPosts((prev) => [newPost, ...prev])
    setPostText("");
    setPostingLoader(false);

   }
  };

  return (
    <>
      <div className="relative w-[600px] min-h-screen border-x border-gray-700">
        <div className="sticky top-0 backdrop-blur-md bg-black/40">
          <div className="flex font-bold h-14 border-b border-gray-700 relative">
            <div onClick={()=>setShowFeed({
              showForYou : true,
              showFollowing : false,
            })} className="h-full w-1/2 flex justify-center items-center cursor-pointer hover:bg-gray-800">
           {showFeed.showForYou ? (
            <div>
              <span className="">For you</span>
              <div className="h-1 w-14 absolute bottom-0 rounded-full bg-blue-400"></div>
            </div>
           )
          :
          (<span className="text-gray-700">For you</span>)
          } 
            </div>
            <div onClick={()=>setShowFeed({
              showForYou : false,
              showFollowing : true,
            })} className="h-full w-1/2 flex justify-center items-center cursor-pointer hover:bg-gray-800">
            {showFeed.showFollowing ? (<div>
              <span>Following</span>
              <div className="h-1 w-18 absolute bottom-0 rounded-full bg-blue-400"></div>
            </div>)
            : (
              <span className="text-gray-700">Following</span>
            )
          }
            </div>
          </div>
        </div>
        <div className="what'shappening? border-b border-gray-700">
          <div className="p-4">
            <form onSubmit={(e) => handlePostSubmit(e)}>
              <div className="flex gap-3 items-center">
               <img
                  src={user?.profilePic || "/default-avatar.png"}
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
                      : "font-bold text-sm text-black rounded-full bg-gray-400 px-3 py-2"
                  }
                >
                  {postingLoader ? <span>Posting..</span> : <span>Post</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center itemms-center py-4 border-y cursor-pointer border-gray-700">
          <span className="text-blue-400">show posts</span>
        </div>
        {feedloader ? (
         <div className="w-full my-10 flex justify-center items-center"><Loader/></div>
        ) : !posts ? (
          <h2 className="text-3xl font-bold text-center h-full p-5">
            No posts yet
          </h2>
        ) : (
          posts.map((post) => <Postcard key={post._id} post={post} />)
        )}
      </div>
    </>
  );
};

export default Feed;
