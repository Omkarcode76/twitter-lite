"use client";
import {
  HomeIcon,
  Search,
  Bell,
  User2,
  Mail,
  Bot,
  Bookmark,
  Rocket,
  UserPlus2,
  MoreHorizontalIcon,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "../context/UserContext";
const Navbar = () => {
  const {user, loading} = useUser()
  const pathname = usePathname();
  if(loading){
    return null
  }
  return (
    <nav className=" w-[275px] transition py-3 flex flex-col gap-20">
      <div>
        <ul className="flex flex-col text-2xl">
          <li className=" w-fit  p-4 cursor-pointer rounded-full hover:bg-gray-900 my-2">
            <Link href={"/home"}>
              <Twitter size={30} />
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/home"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <HomeIcon strokeWidth={pathname === '/home' ? 3 : 1} size={22} />
                <div className={pathname === "/home" ? "font-bold" : ""}>
                  Home
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/explore"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <Search strokeWidth={pathname === '/explore' ? 3 : 1} size={22} />
                <div className={pathname === "/explore" ? "font-bold" : ""}>
                  Explore
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/home"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <Bell size={22} />
                <div className={pathname === "/notifications" ? "font-bold" : ""}>
                  Notifications
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/home"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <UserPlus2 size={22} />
                <div className={pathname === "/follow" ? "font-bold" : ""}>
                  Follow
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/home"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <Mail size={22} />
                <div className={pathname === "/chat" ? "font-bold" : ""}>
                  Chat
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/home"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <Bot size={22} />
                <div className={pathname === "/gork" ? "font-bold" : ""}>
                  Gork
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/home"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <Bookmark size={22} />
                <div className={pathname === "/bookmark" ? "font-bold" : ""}>
                  Bookmarks
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/home"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <Rocket size={22} />
                <div className={pathname === "/" ? "font-bold" : ""}>
                  Creator Studio
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/home"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <Twitter size={22} />
                <div className={pathname === "/premium" ? "font-bold" : ""}>
                  Premium
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={`/${user.username}`} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <User2 strokeWidth={pathname === `/${user.username}` ? 3 : 1} size={22} />
                <div className={pathname === `/${user.username}` ? "font-bold" : ""}>
                  Profile
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link href={"/home"} className="block w-full group">
              <div className=" px-4 w-fit cursor-pointer transition py-3 group-hover:bg-gray-900 rounded-full  flex items-center gap-4">
                <MoreHorizontalIcon size={22} />
                <div className={pathname === "/more" ? "font-bold" : ""}>
                  More
                </div>
              </div>
            </Link>
          </li>
         
        </ul>
        <button className="bg-white  hover:bg-gray-200 cursor-pointer rounded-full px-24 transition py-3 text-black text-lg font-bold my-8">
          Post
        </button>
      </div>
      <div className="flex items-center gap-4 hover:bg-gray-900 justify-between px-4 rounded-full transition py-3 w-full px-2 cursor-pointer">
        <div className="flex items-center gap-4">
        <img
                  src={user?.profilePic || "/default-avatar.png"}
                  alt=""
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <span className="text-gray-500"> @{user?.username}</span>
        </div>
        </div>
        <MoreHorizontalIcon size={20} />
      </div>
    </nav>
  );
};

export default Navbar;
