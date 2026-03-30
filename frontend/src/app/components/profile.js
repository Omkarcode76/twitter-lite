"use client";
import { Search, ArrowLeft, Twitter, X, Dice1 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Postcard from "./Postcard";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import Loader from "./Loader";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { user, userPosts, loading } = useUser();
  const [showEdit, setShowEdit] = useState(false);
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (!user) {
    return null;
  }
  const date = new Date(user.createdAt);

  const formatted = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <div className="relative">
        {user && (
          <>
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
                      <span className="font-bold text-lg">{user.name}</span>
                      <span className="text-sm text-gray-400">
                        {userPosts.length} posts
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
              {user.bgImage ?
              ( <img
                src={user.bgImage}
                alt=""
                className="h-42  w-full object-cover"
              />)
            :
            (
              <div className="h-40 w-full bg-gray-800"></div>
            )
            }
             

              <img
                src={user.profilePic || "/default-avatar.png"}
                alt=""
                className="absolute top-24 left-5 border-3 border-black h-35 w-35 rounded-full object-cover bg-center"
              />
              <button
                onClick={() => setShowEdit(true)}
                className="absolute top-43 right-5 rounded-full py-2 px-3 border-2 cursor-pointer hover:bg-gray-900 border-gray-700 font-bold"
              >
                Edit profile
              </button>
            </div>
            <div className="mt-20 mb-6 mx-5 flex flex-col gap-3">
              <div className="flex flex-col  ">
                <span className="font-bold text-xl">{user.name}</span>
                <span className="text-lg text-gray-400">@{user.username}</span>
              </div>
              <div className="text-lg text-gray-400">Joined {formatted} </div>
              <div className="flex gap-4">
                <div className="text-sm hover:underline cursor-pointer  ">
                  <span className="font-bold">{user.following.length} </span>
                  <span className="text-gray-400">Following</span>
                </div>
                <div className="text-sm hover:underline cursor-pointer ">
                  <span className="font-bold">{user.followers.length} </span>
                  <span className="text-gray-400">Followers</span>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="">
          <h2 className="text-3xl font-bold text-center py-7 border-y border-gray-700">
            Posts
          </h2>

          {userPosts.length !== 0 ? (
            userPosts.map((post) => <Postcard key={post._id} post={post} />)
          ) : (
            <div className="h-40 text-2xl font-bold flex justify-center items-center">
              No posts to show
            </div>
          )}
        </div>
      </div>
      {showEdit && (
        <EditProfile setShowEdit={setShowEdit}/>
      )}
    </>
  );
};

export default Profile;
