"use client"
import { Search, MoreHorizontal, User } from "lucide-react";
import apiFetch from "@/utils/api";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
const RightSection = () => {
  const router = useRouter()
   const searchRef = useRef();
  const [topUsers, setTopUsers] = useState(null)
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [searchedUser, setSearchedUser] = useState(null)
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
          onFocus={()=>setShowSearch(true)}
          onChange={(e)=>setSearch(e.target.value)}
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
      <div className="border p-3 border-gray-700 rounded-2xl "><div><h3 className="font-bold my-2 text-xl">Subscribe to premium</h3></div> <span>Get rid of ads, see your analytics, boost your replies and unlock 20+ features.</span>
      <button className="bg-blue-500 cursor-pointer rounded-full my-3 px-3 py-2 font-bold">Subscribe</button></div>
      <div className="border p-3 border-gray-700 rounded-2xl flex flex-col gap-4"><h3 className="font-bold my-2 text-xl"> Whats happening</h3>
      <ul className="flex flex-col gap-3">
        <li><div className="text-sm text-gray-400">polictics . Treanding</div><span className="font-bold">#PakistanAgentGauravGogoi</span></li>
        <li><div className="text-sm text-gray-400">polictics . Treanding</div><span className="font-bold">#PakistanAgentGauravGogoi</span></li>
        <li><div className="text-sm text-gray-400">polictics . Treanding</div><span className="font-bold">#PakistanAgentGauravGogoi</span></li>
        <li><div className="text-sm text-gray-400">polictics . Treanding</div><span className="font-bold">#PakistanAgentGauravGogoi</span></li>
        </ul></div>
      <div className="border p-3 border-gray-700 rounded-2xl flex flex-col">
        <h3 className="font-bold my-2 text-xl">Who To Follow</h3>
{topUsers && 
 topUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => router.push(`/${user.username}`)}
              className="flex items-center gap-4 justify-between   transition py-2 w-full cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.profilePic || "/default-avatar.png"}
                  alt=""
                  className="h-10 w-10 rounded-full cursor-pointer object-cover bg-center"
                />
                <div className="flex flex-col">
                  <span className="hover:underline">{user?.name}</span>
                  <span className="text-gray-500"> @{user?.username}</span>
                </div>
              </div>
              <button className="font-bold text-sm text-black rounded-full cursor-pointer bg-gray-100 px-3 py-2">Follow</button>
            </div>
          ))}


       
</div>
      </div>
    </div>
  );
};

export default RightSection;
