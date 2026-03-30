"use client"
import Feed from "@/app/components/Feed";
import RightSection from "@/app/components/RightSection";

const page = () => {

  return (
    <>
    <div className="">
      <div className="relative h-screen flex overflow-hidden">
        <div className="overflow-y-auto overscroll-none no-scrollbar ">
          <Feed />
        </div>
        <div className="overflow-y-auto overscroll-none no-scrollbar">
          <RightSection />
        </div>
      </div>
      </div>
    </>
  );
};

export default page;
