import RightSection from "@/app/components/RightSection"
import Explore from "@/app/components/Explore"
const page = () => {
  return (
    <div className="relative h-screen flex overflow-hidden">
        <div className="overflow-y-auto overscroll-none no-scrollbar ">
<Explore/>
        </div>
        <div className="overflow-y-auto overscroll-none no-scrollbar">
          <RightSection />
        </div>
      </div>

  )
}

export default page
