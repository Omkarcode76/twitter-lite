import Profile from "@/app/components/profile"
import RightSection from "@/app/components/RightSection"
const page =async ({params}) => {
const{username} = await params
  return (
   <>

<div className="">
      <div className="relative h-screen flex overflow-hidden">
        <div className="overflow-y-auto overscroll-none no-scrollbar ">
          <div className="w-[600px] border-x border-gray-700 min-h-screen">
          <Profile />
          </div>
        </div>
        <div className="overflow-y-auto overscroll-none no-scrollbar">
          <RightSection />
        </div>
      </div>
      </div>
   </>
  )
}

export default page
