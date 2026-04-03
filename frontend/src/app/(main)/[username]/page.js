import Profile from "@/app/components/profile"
const page =async ({params}) => {
const{username} = await params
  return (
   <>

<div className="">
      <div className="relative h-screen flex overflow-hidden">
        <div className="overflow-y-auto overscroll-none no-scrollbar ">
          <div className="w-[600px] border-x border-gray-700 min-h-screen">
          <Profile username={username} />
          </div>
        </div>
        
      </div>
      </div>
   </>
  )
}

export default page
