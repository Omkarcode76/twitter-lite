"use client";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Postcard from "./Postcard";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import Loader from "./Loader";
import EditProfile from "./EditProfile";
import apiFetch from "@/utils/api";
import { useRouter } from "next/navigation";
const Profile = ({ username }) => {
  const router = useRouter();
  const { user, setUser, userPosts, loading } = useUser();
  const [showEdit, setShowEdit] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profilePosts, setProfilePosts] = useState([]);
  const [otherLoading, setOtherLoading] = useState(false);
  const [followClicked, setFollowClicked] = useState(false);
  const [UnfollowClicked, setUnFollowClicked] = useState(false);
  const [isFollowingHover, setIsFollowingHover] = useState(false)
  useEffect(() => {
    if (!user) return;

    const getOtherUser = async () => {
      setOtherLoading(true);
      setProfileData(null);
      setProfilePosts([]);
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await apiFetch(`${API_URL}/user/${username}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setProfileData(data.user);
        setProfilePosts(data.userPosts);
      }
      setOtherLoading(false);
    };

    if (username === user.username) {
      setProfileData(user);
      setProfilePosts(userPosts);
    } else {
      getOtherUser();
    }
  }, [user, username]);

  if (loading || otherLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const isCurrentUser = user && username === user.username;

  const formatted = profileData
    ? new Date(profileData.createdAt).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

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
  return (
    <>
      <div className="relative">
        {profileData && (
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
                      <span className="font-bold text-lg">
                        {profileData.name}
                      </span>
                      <span className="text-sm text-gray-400">
                        {profilePosts.length} posts
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
              {profileData.bgImage ? (
                <img
                  src={profileData.bgImage}
                  alt=""
                  className="h-50  w-full object-cover"
                />
              ) : (
                <div className="h-50 w-full bg-gray-800"></div>
              )}

              <img
                src={profileData.profilePic || "/default-avatar.png"}
                alt=""
                className="absolute top-32 left-5 border-3 border-black h-35 w-35 rounded-full object-cover bg-center"
              />
              {isCurrentUser ? (
                <button
                  onClick={() => setShowEdit(true)}
                  className="absolute top-52 right-5 rounded-full py-2 px-3 border cursor-pointer hover:bg-gray-900 border-gray-700 font-bold"
                >
                  Edit profile
                </button>
              ) : user.following.includes(profileData._id) ? (
                <button
                  onMouseEnter={()=>setIsFollowingHover(true)}
                  onMouseLeave={()=>setIsFollowingHover(false)}
                  onClick={() => {
                    handleUnfollow(profileData._id)
                    setUnFollowClicked(true);
                    setFollowClicked(false)
                  }}
                  disabled={UnfollowClicked}
                  className={!isFollowingHover ? "absolute top-52 right-5 rounded-full py-2 w-28  cursor-pointer bg-black  text-white border border-gray-700 font-bold"
                :"absolute top-52 right-5 rounded-full py-2 w-28 cursor-pointer backdrop-blur-md bg-[rgb(244,33,46)]/10  text-[rgb(244,33,46)] border-[0.5px] border-[rgb(244,33,46)] font-bold"
                }>
                  {isFollowingHover ? <span>Unfollow</span> : <span>Following</span>}
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleFollow(profileData._id);
                    setFollowClicked(true);
                    setUnFollowClicked(false)
                  }}
                  disabled={followClicked}
                  className="absolute top-52 transition right-5 rounded-full py-2 w-22 cursor-pointer bg-white hover:bg-gray-200 text-black font-bold"
                >
                  Follow
                </button>
              )}
            </div>
            <div className="mt-20 mb-6 mx-5 flex flex-col gap-3">
              <div className="flex flex-col  ">
                <span className="font-bold text-xl">{profileData.name}</span>
                <span className="text-lg text-gray-400">
                  @{profileData.username}
                </span>
              </div>
              <span>{profileData.bio}</span>
              <div className="text-gray-400">Joined {formatted} </div>
              <div className="flex gap-4">
                <div className="text-sm hover:underline cursor-pointer  ">
                  <span className="font-bold">
                    {profileData.following.length}{" "}
                  </span>
                  <span className="text-gray-400">Following</span>
                </div>
                <div className="text-sm hover:underline cursor-pointer ">
                  <span className="font-bold">
                    {profileData.followers.length}{" "}
                  </span>
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

          {profilePosts.length !== 0 ? (
            profilePosts.map((post) => <Postcard key={post._id} post={post} />)
          ) : (
            <div className="h-40 text-2xl font-bold flex justify-center items-center">
              No posts to show
            </div>
          )}
        </div>
      </div>
      {isCurrentUser && showEdit && (
        <EditProfile setShowEdit={setShowEdit} setUser={setUser} />
      )}
    </>
  );
};

export default Profile;
