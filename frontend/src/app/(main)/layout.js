import Navbar from "../components/Navbar"
import AuthLoader from "../components/AuthLoader"
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
    </div>
  )
}

export default Mainlayout
