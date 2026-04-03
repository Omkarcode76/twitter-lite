"use client";
import { useEffect, useState, useRef } from "react";
import { Search, User, X } from "lucide-react";
import Postcard from "./Postcard";
import apiFetch from "@/utils/api";
import { useRouter } from "next/navigation";
const Explore = () => {
  const searchRef = useRef()
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
      console.log("clicked outside");
      setShowSearch(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  const getTopUsers = async () => {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/topusers`,
      { method: "GET" },
      router,
    );
    const data = await res.json();
    if (res.ok) {
      setTopUsers(data);
    }
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
        <div  className="relative p-1">
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
                    <span className="text-gray-500"> @{user?.username}</span>
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
        {topUsers &&
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
          ))}
      </div>
      <div>
        <h2 className="font-bold text-3xl text-center w-full py-4 border-b border-gray-700">
          Posts for you
        </h2>
      </div>
    </div>
  );
};

export default Explore;
