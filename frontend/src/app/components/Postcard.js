import React from "react";
import { User2, Reply, Heart, Bookmark, Share, BarChart2, ArrowDownRightFromSquare } from "lucide-react";
const Postcard = ({post}) => {
  return (
<>
<div className="border-t border-gray-700">
      <div className="flex items-center gap-2 m-3 cursor-pointer">
      <User2 size={26}  />
        <div className="flex flex-col">
        <div className="flex gap-2">
          <span className="font-bold hover:underline">{post.name}</span>
          <span className="text-gray-400">@{post.username}</span>
          <span className="text-gray-400">. 8h</span>
        </div>
        <div>
            <span>Rapid recursive improvement</span>
        </div>
        </div>
      </div>
      <div className="ml-17 mr-5">

      <div className="border border-gray-700  min-h-40  rounded-2xl p-4"><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi at dolor assumenda quam reiciendis labore, eum illo officiis laudantium libero exercitationem quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, aperiam aliquam excepturi modi architecto quis aspernatur molestiae in. Officia nesciunt fuga corrupti voluptates, sed vel hic accusamus repellendus provident soluta. Mlore=axime deleniti atque enim? Porro in voluptatum maiores.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus excepturi deleniti nam ipsam iure placeat necessitatibus, inventore, ea, dolorum eos laboriosam corrupti explicabo distinctio nostrum assumenda quidem ab sunt aliquid!</span>
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
