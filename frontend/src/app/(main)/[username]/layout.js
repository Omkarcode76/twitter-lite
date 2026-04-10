

const profileLayout = ({children}) => {
  return (
    <div>
      <div className="relative h-screen flex overflow-hidden">
        <div className="overflow-y-auto overscroll-none no-scrollbar ">
          <div className="w-[600px] border-x border-gray-700 min-h-screen">
          {children}
          </div>
        </div>
        
      </div>
      </div>
    
  )
}

export default profileLayout
