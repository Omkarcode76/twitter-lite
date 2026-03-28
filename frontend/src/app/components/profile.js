"use client"
import {
 
  Search,
  ArrowLeft,
  Twitter,
  X
} from "lucide-react";
import Link from "next/link";
import Postcard from "./Postcard";
import { useState } from "react";
const Profile = () => {
  const [showEdit, setShowEdit] = useState(false)
  return (
    <>
      <div className="relative w-[600px] border-x border-gray-700 min-h-screen">
        <div className="sticky top-0 z-10 backdrop-blur-md bg-black/20">
    
    <div className="p-2">
      <div className="flex justify-between items-center">
        
       
        <div className="flex gap-4 items-center">
          
          <Link href="/home">
            <button className="cursor-pointer p-2 rounded-full hover:bg-gray-900 transition">
              <ArrowLeft size={22} />
            </button>
          </Link>

          <div className="flex flex-col leading-tight">
            <span className="font-bold text-lg">
              Omkar Tembhekar
            </span>
            <span className="text-sm text-gray-400">
              0 posts
            </span>
          </div>

        </div>

       <button className="cursor-pointer p-2 rounded-full hover:bg-gray-900 transition">

        <Search size={22} className="text-gray-400" />
       </button>

      </div>
    </div>

  </div>
  <div className="profile relative">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAN7rsVec_1OIcy3e8U_QpLUfC-dGJNH51Wg&s" alt="" className="h-40 w-full object-cover" />
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAN7rsVec_1OIcy3e8U_QpLUfC-dGJNH51Wg&s" alt="" className="absolute top-24 left-5 border-3 border-black h-35 w-35 rounded-full object-cover bg-center"/>
  <button onClick={()=>setShowEdit(true)} className="absolute top-43 right-5 rounded-full py-2 px-3 border-2 cursor-pointer hover:bg-gray-900 border-gray-700 font-bold">Edit profile</button>   
  </div> 
  <div className="mt-20 mb-6 mx-5 flex flex-col gap-3">
    <div className="flex flex-col  "><span className="font-bold text-xl">omkar Tembhekar</span><span className="text-lg text-gray-400">@tembheakro</span></div>
    <div className="text-lg text-gray-400">Joined August 2024 </div>
    <div className="flex gap-4">
        <div className="text-sm hover:underline cursor-pointer  "><span className="font-bold">100 </span><span className="text-gray-400">Following</span></div>
        <div className="text-sm hover:underline cursor-pointer "><span className="font-bold">10000 </span><span className="text-gray-400">Follower</span></div>
        </div>
    </div>
    <div className="border-y border-gray-700">
    <h2 className="text-3xl font-bold text-center my-7">Posts</h2>

    </div>
</div>
{showEdit && 

<div className="fixed inset-0 bg-black/70  backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-black p-6 rounded-xl w-[500px]">
                  <button onClick={()=>setShowEdit(false)} className="cursor-pointer p-2 hover:bg-gray-900 rounded-full"><X/></button>
                  <form>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold mb-4 ">
                        Create your account
                      </h2>
                    </div>
                        <input
                          
                          name="name"
                         
                          className="w-full mb-2 p-2 bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
                          placeholder="name"
                        />
                        <input
                          
                          name="bio"
                          
                          className="w-full mb-4 p-2  bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
                          placeholder="bio"
                        />
                        <input
                          
                          name="profilePicUrl"
                          
                          className="w-full mb-4 p-2  bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
                          placeholder="profile pic url"
                        />
                        <input
                          
                          name="bgPicUrl"
                          
                          className="w-full mb-4 p-2  bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
                          placeholder="background image url"
                        />
                        <div className="flex mb-4 gap-7 items-center">
                        <span>DOB:</span><input
                          type="date"
                          
                          name="dob"
                         
                          className="w-full  bg-gray-600 p-2 text-white  focus:border-blue-400rounded border border-gray-700 focus:outline-none"
                        /></div>
                        <button

                        
                          className="bg-white text-black w-full py-2 rounded cursor-pointer font-bold"
                        >
                          Save
                        </button>
                      </form>
                      </div>
                      </div>
                      }
    </>
  );
};

export default Profile;
