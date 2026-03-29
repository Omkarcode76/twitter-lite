"use client"
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null)
  const [loading, setLoading] = useState(true)

  return (
    <UserContext.Provider value={{ user, setUser, userPosts, setUserPosts, loading, setLoading}}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useUser };
