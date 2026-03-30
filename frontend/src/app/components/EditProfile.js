"use client";
import apiFetch from "@/utils/api";
import { X } from "lucide-react";
import { useState } from "react";

const EditProfile = ({ setShowEdit, setUser }) => {
  const [editUserData, setEditUserData] = useState({
    name: "",
    dob: "",
    bio: "",
    profilePic: "",
    bgImage: "",
  });
  const handleChange = (e) => {
    setEditUserData({
      ...editUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async () => {
    const finalEditData = Object.fromEntries(
  Object.entries(editUserData).filter(([_, value]) => value !== "")
);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await apiFetch(`${API_URL}/user/me`, {
      method: "PUT",
      body: JSON.stringify(finalEditData),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data)
      const initialState = {
        name: "",
        dob: "",
        bio: "",
        profilePic: "",
        bgImage: "",
      };
      setEditUserData(initialState);
    }
  };
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
          <form onSubmit={() => handleEdit()}>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold mb-4 ">Edit your profile</h2>
            </div>
            <input
              onChange={(e) => handleChange(e)}
              value={editUserData.name}
              name="name"
              className="w-full mb-2 p-2 bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
              placeholder="name"
            />
            <input
              onChange={(e) => handleChange(e)}
              value={editUserData.bio}
              name="bio"
              className="w-full mb-4 p-2  bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
              placeholder="bio"
            />
            <input
              onChange={(e) => handleChange(e)}
              value={editUserData.profilePic}
              name="profilePic"
              className="w-full mb-4 p-2  bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
              placeholder="profile pic url"
            />
            <input
              onChange={(e) => handleChange(e)}
              value={editUserData.bgImage}
              name="bgImage"
              className="w-full mb-4 p-2  bg-gray-900 rounded focus:outline-none border border-gray-700 focus:border-blue-400"
              placeholder="background image url"
            />
            <div className="flex mb-4 gap-7 items-center">
              <span>DOB:</span>
              <input
                onChange={(e) => handleChange(e)}
                value={editUserData.dob}
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
  );
};

export default EditProfile;
