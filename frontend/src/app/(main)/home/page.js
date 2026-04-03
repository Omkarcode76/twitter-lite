"use client"
import Feed from "@/app/components/Feed";

const page = () => {

  return (
    <>
    <div className="">
      <div className="relative h-screen flex overflow-hidden">
        <div className="overflow-y-auto overscroll-none no-scrollbar ">
          <Feed />
        </div>
        
      </div>
      </div>
    </>
  );
};

export default page;
