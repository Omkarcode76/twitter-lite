"use client"
import { Search, MoreHorizontal, User } from "lucide-react";
import apiFetch from "@/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const RightSection = () => {
  const router = useRouter()
  const [topUsers, setTopUsers] = useState(null)
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

 

  return (
    <div className=" min-h-screen w-[350px] p-1">
        <div className="ml-7 flex flex-col gap-4">
      <div className="relative  ">
        <Search
          size={16}
          className="text-gray-500 absolute top-[14px] left-3"
        />
        <input
          type="text"
          placeholder="Search"
          className="rounded-full cursor-auto px-8 py-2 border-2 caret-blue-500 border-gray-700 w-full focus:border-blue-400 focus:outline-none"
        />
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
