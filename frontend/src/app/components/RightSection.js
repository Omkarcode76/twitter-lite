import { Search, MoreHorizontal, User } from "lucide-react";

const RightSection = () => {
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
        <li><div className="text-sm text-gray-400">polictics . Treanding</div><span className="font-bold">#PakistanAgentGauravGogoi</span></li>
        </ul></div>
      <div className="border p-3 border-gray-700 rounded-2xl flex flex-col gap-4"><h3 className="font-bold my-2 text-xl">Who To Follow</h3>
      <ul className="flex flex-col gap-3">
        <li className="flex justify-between"><div className="flex items-center gap-2"><User size={30}/><div><span className="font-bold">Salman Khan</span><div className="text-sm text-gray-400">@salmankhan</div></div></div><button className="font-bold text-sm text-black rounded-full cursor-pointer bg-gray-100 px-3 py-2">Follow</button></li>
        <li className="flex justify-between"><div className="flex items-center gap-2"><User size={30}/><div><span className="font-bold">Salman Khan</span><div className="text-sm text-gray-400">@salmankhan</div></div></div><button className="font-bold text-sm text-black rounded-full cursor-pointer bg-gray-100 px-3 py-2">Follow</button></li>
        <li className="flex justify-between"><div className="flex items-center gap-2"><User size={30}/><div><span className="font-bold">Salman Khan</span><div className="text-sm text-gray-400">@salmankhan</div></div></div><button className="font-bold text-sm text-black rounded-full cursor-pointer bg-gray-100 px-3 py-2">Follow</button></li>
        <li className="flex justify-between"><div className="flex items-center gap-2"><User size={30}/><div><span className="font-bold">Salman Khan</span><div className="text-sm text-gray-400">@salmankhan</div></div></div><button className="font-bold text-sm text-black rounded-full cursor-pointer bg-gray-100 px-3 py-2">Follow</button></li>
       
        </ul></div>
      </div>
    </div>
  );
};

export default RightSection;
