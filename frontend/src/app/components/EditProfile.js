import { X } from "lucide-react"


const EditProfile = ({setShowEdit}) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black/70  backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-xl w-[500px]">
            <button
              onClick={() => setShowEdit(false)}
              className="cursor-pointer p-2 hover:bg-gray-900 rounded-full"
            >
              <X />
            </button>
            <form>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold mb-4 ">Edit your profile</h2>
              </div>
              <input
                name="name"
                className="w-full mb-2 p-2 bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
                placeholder="name"
              />
              <input
                name="bio"
                className="w-full mb-4 p-2  bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
                placeholder="bio"
              />
              <input
                name="profilePicUrl"
                className="w-full mb-4 p-2  bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
                placeholder="profile pic url"
              />
              <input
                name="bgPicUrl"
                className="w-full mb-4 p-2  bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
                placeholder="background image url"
              />
              <div className="flex mb-4 gap-7 items-center">
                <span>DOB:</span>
                <input
                  type="date"
                  name="dob"
                  className="w-full  bg-gray-600 p-2 text-white  focus:border-blue-400rounded border border-gray-700 focus:outline-none"
                />
              </div>
              <button className="bg-white text-black w-full py-2 rounded cursor-pointer font-bold">
                Save
              </button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default EditProfile
