import React from "react";
import { Reply, Heart, Bookmark, Share, BarChart2, ArrowDownRightFromSquare } from "lucide-react";
import { formatDistanceToNowStrictk, format } from "date-fns";
const Postcard = ({post}) => {
  const formatTwitterTime = (date) => {
  const now = new Date();
  const postDate = new Date(date);

  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;

  // older → show date
  return format(postDate, "MMM d");
};
  return (
<>
<div className="border-t border-gray-700">
      <div className="flex items-center gap-2 mx-4 my-2 cursor-pointer">
        
          <img src={post.user.profilePic || "/default-avatar.png"} alt="" className="rounded-full object-cover w-10 h-10" />
       
      
        <div className="flex flex-col">
        <div className="flex gap-2">
          <span className="font-bold hover:underline">{post.user.name}</span>
          <span className="text-gray-400">@{post.user.username}</span>
          <span className="text-gray-400">{formatTwitterTime(post.createdAt)}</span>
          
        </div>
        <div>
            <span className="font-bold text-sm">{post.title}</span>
        </div>
        </div>
      </div>
      <div className="ml-17 mr-5">

      <div className="border border-gray-700  min-h-40  rounded-2xl p-4"><span>{post.content}</span>
      </div>
      <div className="text-gray-400 flex gap-8 justify-around my-2">
        <div className="flex p-2 hover:text-blue-400 rounded-full cursor-pointer transition items-center text-sm "><Reply size={18}/> 1.3k</div>
        <div className="flex p-2 hover:text-green-300 rounded-full cursor-pointer transition items-center text-sm "><ArrowDownRightFromSquare size={18}/> 1.3k</div>
        <div className="flex p-2 hover:text-pink-400 rounded-full cursor-pointer transition items-center text-sm "><Heart size={18}/> 1.3k</div>
        <div className="flex p-2 hover:text-blue-400 rounded-full cursor-pointer transition items-center text-sm "><BarChart2 size={18}/> 1.3k</div>
        <div className="flex  gap-2">

        <div className="flex p-2 hover:text-blue-400 rounded-full cursor-pointer transition items-center text-sm "><Bookmark size={18}/></div>
        <div className="flex p-2 hover:text-blue-400 rounded-full cursor-pointer transition items-center text-sm "><Share size={18}/></div>
        </div>


      </div>
      </div>
</div>
    </>
  );
};

export default Postcard;
