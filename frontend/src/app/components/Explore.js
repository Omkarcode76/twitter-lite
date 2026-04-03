"use client";
import { useEffect, useState, useRef } from "react";
import { Search,  } from "lucide-react";
import Postcard from "./Postcard";
import apiFetch from "@/utils/api";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
const Explore = () => {
  const searchRef = useRef();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("forYou");
  const tabs = [
    { key: "forYou", label: "For You", width: "w-14" },
    { key: "trending", label: "Trending", width: "w-17" },
    { key: "news", label: "News", width: "w-11" },
    { key: "sports", label: "Sports", width: "w-14" },
    { key: "entertainment", label: "Entertainment", width: "w-28" },
  ];
  const [topUsers, setTopUsers] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [postLoader, setPostLoader] = useState(false)
  const [topUserLoader, setTopUserLoader] = useState(false)
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    getTopUsers();
  }, []);
  useEffect(() => {
    if (!search) return;
    searchUser();
  }, [search]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const getPosts = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      setPostLoader(true);
      const res = await apiFetch(
        `${API_URL}/post`,
        {
          method: "GET",
        },
        router,
      );
      setPostLoader(false);

      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    };

    getPosts();
  }, []);
  const getTopUsers = async () => {
    setTopUserLoader(true)
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/topusers`,
      { method: "GET" },
      router,
    );
    const data = await res.json();
    if (res.ok) {
      setTopUsers(data);
    }
    setTopUserLoader(false)
  };

  const searchUser = async () => {
    console.log("search user");
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/find?search=${search}`,
      { method: "GET" },
      router,
    );
    const data = await res.json();
    if (res.ok) {
      setSearchedUser(data);
    }
  };

  return (
    <div className="relative w-[600px] min-h-screen border-x border-gray-700">
      <div className="sticky top-0 backdrop-blur-md bg-black/40">
        <div ref={searchRef}>
          <div className="relative p-1">
            <Search
              size={16}
              className="text-gray-500 absolute top-[18px] left-4"
            />
            <input
              onFocus={() => setShowSearch(true)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search"
              className="rounded-full cursor-auto px-8 py-2 border-2 caret-blue-500 border-gray-700 w-full focus:border-blue-400 focus:outline-none"
            />
          </div>
          {showSearch && (
            <div className="border flex  flex-col border-gray-700 min-h-26 absolute top-12 z-50 w-[80%] left-14.5 bg-black rounded-xl items-center text-gray-400 text-sm ">
              {searchedUser ? (
                searchedUser.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => router.push(`/${user.username}`)}
                    className="flex items-center gap-4 hover:bg-gray-900 justify-between px-4  transition py-3 w-full cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={user.profilePic || "/default-avatar.png"}
                        alt=""
                        className="h-10 w-10 rounded-full cursor-pointer object-cover bg-center"
                      />
                      <div className="flex flex-col">
                        <span>{user?.name}</span>
                        <span className="text-gray-500">
                          {" "}
                          @{user?.username}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="my-5">
                  Try searching for people, lists, or keywords
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex font-bold justify-center h-14 border-b border-gray-700 relative">
          <div className="flex font-bold justify-center h-14 border-b border-gray-700 relative">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="h-full flex justify-center items-center cursor-pointer hover:bg-gray-800 px-[26.4999px] transition"
              >
                {activeTab === tab.key ? (
                  <div>
                    <span>{tab.label}</span>
                    <div
                      className={`h-1 ${tab.width} absolute bottom-0 rounded-full bg-blue-400`}
                    ></div>
                  </div>
                ) : (
                  <span className="text-gray-700">{tab.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-72 border-b border-gray-700 ">
        <h2 className="text-3xl font-bold m-5">Top Profiles</h2>
        {topUsers && !topUserLoader ?
          topUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => router.push(`/${user.username}`)}
              className="flex items-center gap-4 hover:bg-gray-900 justify-between px-4  transition py-3 w-full cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.profilePic || "/default-avatar.png"}
                  alt=""
                  className="h-10 w-10 rounded-full cursor-pointer object-cover bg-center"
                />
                <div className="flex flex-col">
                  <span>{user?.name}</span>
                  <span className="text-gray-500"> @{user?.username}</span>
                </div>
              </div>
            </div>
          ))
        :
        (
          <div className="h-72 flex justify-center " ><Loader /></div>
        )}
      </div>
      <div>
        <h2 className="font-bold text-3xl text-center w-full py-4 border-b border-gray-700">
          Posts for you
        </h2>
        {postLoader ? (
         <div className="w-full h-full flex justify-center items-center"><Loader/></div>
        ) : !posts ? (
          <h2 className="text-3xl font-bold text-center h-full p-5">
            No posts yet
          </h2>
        ) : (
          posts.map((post) => <Postcard key={post._id} post={post} />)
        )}
      </div>
      </div>
  );
};

export default Explore;
