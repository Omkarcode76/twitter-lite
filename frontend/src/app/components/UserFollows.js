"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState} from "react";
const UserFollows = ({username,type}) => {
      const [followType, setFollowType] = useState(type)
  const router = useRouter();
  return (
    <div className="">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-black/20 ">
        <div className="p-2">
          <div className="flex  items-center">
            <div className="flex gap-4 items-center">
              <button
                onClick={() => router.back()}
                className="cursor-pointer p-2 rounded-full hover:bg-gray-900 transition"
              >
                <ArrowLeft size={22} />
              </button>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg">NASA</span>
                <span className="text-sm text-gray-400">@NASA</span>
              </div>
              </div>
            </div>
          </div>
           <div className="flex font-bold h-14 border-b border-gray-700 relative">
                  <div onClick={()=>router.push(`/${username}/followers`)} className="h-full w-1/2 flex justify-center items-center transition cursor-pointer hover:bg-gray-800">
                    {type === "followers" ? <div>
                      <span className="">Followers</span>
                      <div className="h-1 w-14 absolute bottom-0 rounded-full bg-blue-400"></div>
                    </div> 
                    :
                    <div className="text-gray-700">Followers</div>}
                  </div>
                  <div onClick={()=>router.push(`/${username}/following`)} className="h-full w-1/2 flex justify-center items-center transition cursor-pointer hover:bg-gray-800">
                    {type === "following"? <div>
                      <span>Following</span>
                      <div className="h-1 w-18 absolute bottom-0 rounded-full bg-blue-400"></div>
                    </div>
                    :
                    <div className="text-gray-700">Following</div>}
                </div>
            </div>
        </div>
      </div>
   
  );
};

export default UserFollows;
