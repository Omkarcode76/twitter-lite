"use client";
import { Search, MoreHorizontal, User } from "lucide-react";
import apiFetch from "@/utils/api";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
const RightSection = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const searchRef = useRef();
  const [topUsers, setTopUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  const [loadingMap, setLoadingMap] = useState({});
  useEffect(() => {
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

  const searchUser = async () => {
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
  const handleFollow = async (id) => {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/follow/${id}`,
      { method: "POST" },
      router,
    );
    const data = await res.json();
    if (res.ok) {
      const targetUserId = data;
      setUser((prev) => ({
        ...prev,
        following: [...prev.following, targetUserId],
      }));
    }
  };
  const handleUnfollow = async (id) => {
    const res = await apiFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/follow/${id}`,
      { method: "DELETE" },
      router,
    );
    const data = await res.json();
    if (res.ok) {
      const targetUserId = data;
      setUser((prev) => ({
        ...prev,
        following: prev.following.filter((id) => id !== targetUserId),
      }));
    }
  };
  const handleToggleFollow = async (id, isFollowing) => {
  if (loadingMap[id]) return;

  setLoadingMap((prev) => ({ ...prev, [id]: true }));

  try {
    if (isFollowing) {
      await handleUnfollow(id);
    } else {
      await handleFollow(id);
    }
  } finally {
    setLoadingMap((prev) => ({ ...prev, [id]: false }));
  }
};
  return (
    <div className=" min-h-screen w-[350px] p-1">
      <div className="ml-7 flex flex-col gap-4">
        <div className="relative">
          <div ref={searchRef} className="relative ">
            <Search
              size={16}
              className="text-gray-500 absolute top-[14px] left-3"
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
            <div className="border flex  flex-col border-gray-700 min-h-26 absolute top-11 z-50 w-full  bg-black rounded-xl items-center text-gray-400 text-sm ">
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
        <div className="border p-3 border-gray-700 rounded-2xl ">
          <div>
            <h3 className="font-bold my-2 text-xl">Subscribe to premium</h3>
          </div>{" "}
          <span>
            Get rid of ads, see your analytics, boost your replies and unlock
            20+ features.
          </span>
          <button className="bg-blue-500 cursor-pointer rounded-full my-3 px-3 py-2 font-bold">
            Subscribe
          </button>
        </div>
        <div className="border p-3 border-gray-700 rounded-2xl flex flex-col gap-4">
          <h3 className="font-bold my-2 text-xl"> Whats happening</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <div className="text-sm text-gray-400">polictics . Treanding</div>
              <span className="font-bold">#PakistanAgentGauravGogoi</span>
            </li>
            <li>
              <div className="text-sm text-gray-400">polictics . Treanding</div>
              <span className="font-bold">#PakistanAgentGauravGogoi</span>
            </li>
            <li>
              <div className="text-sm text-gray-400">polictics . Treanding</div>
              <span className="font-bold">#PakistanAgentGauravGogoi</span>
            </li>
            <li>
              <div className="text-sm text-gray-400">polictics . Treanding</div>
              <span className="font-bold">#PakistanAgentGauravGogoi</span>
            </li>
          </ul>
        </div>
        <div className="border p-3 border-gray-700 rounded-2xl flex flex-col">
          <h3 className="font-bold my-2 text-xl">Who To Follow</h3>
          {topUsers &&
  topUsers.map((topUser) => {
    const isFollowing = user?.following.some(
      (id) => id.toString() === topUser._id.toString()
    );

    return (
      <div
        key={topUser._id}
        className="flex items-center gap-4 justify-between py-2 w-full cursor-pointer"
      >
        <div
          onClick={() => router.push(`/${topUser.username}`)}
          className="flex items-center gap-4"
        >
          <img
            src={topUser.profilePic || "/default-avatar.png"}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="hover:underline">{topUser.name}</span>
            <span className="text-gray-500">@{topUser.username}</span>
          </div>
        </div>

        <button
          onClick={() => handleToggleFollow(topUser._id, isFollowing)}
          disabled={loadingMap[topUser._id]}
          className=" "
        >
          {!loadingMap[topUser._id]
            && isFollowing
            ? <span className="text-white bg-black rounded-full border border-gray-700 py-1.5 font-bold cursor-pointer text-sm px-2">Following</span>
            : <span className="text-black bg-white rounded-full py-1.5 font-bold cursor-pointer text-sm px-3">Follow</span>}
        </button>
      </div>
    );
  })}
        </div>
      </div>
    </div>
  );
};

export default RightSection;
