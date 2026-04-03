import Navbar from "../components/Navbar"
import AuthLoader from "../components/AuthLoader"
import RightSection from "../components/RightSection"
const Mainlayout = ({children}) => {
  return (
    <div className="mx-60 flex min-h-full">
      <div className="fixed min-h-screen overflow-y-auto overscroll-none no-scrollbar ">
                <Navbar />
              </div>
              <div className="ml-[275px]">
              <AuthLoader/>
              {children}
              </div>
              <div className="overflow-y-auto overscroll-none no-scrollbar">
          <RightSection />
        </div>
    </div>
  )
}

export default Mainlayout
