"use client";
import { Twitter } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignupNext, setShowSignupNext] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    dob: "",
    username: "",
    profilePic: "",
    password: "",
  });
  const [signinData, setSigninData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch(`{process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    const data = await res.json();
   
    const initialState = {
      name: "",
      email: "",
      dob: "",
      username: "",
      profilePic: "",
      password: "",
    };
    if (res.ok) {
      setSignupData(initialState);
      setShowSignup(false);
      setShowSignupNext(false);
    }
  };

  const handleSigninChange = (e) => {
    setSigninData({
      ...signinData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignin = async (e) => {
    e.preventDefault();

    const res = await fetch(`{process.env.NEXT_PUBLIC_API_URL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(signinData),
    });

    const data = await res.json();
    const initialState = {
      usernameOrEmail: "",
      password: "",
    };
    if (res.ok) {
      localStorage.setItem("token", data.token);
      setSigninData(initialState);
    }
  };

  return (
    <div className=" w-screen h-screen flex">
      <div className=" w-1/2 h-screen flex items-center justify-center">
        <Twitter size={400} />
      </div>
      <div className="1/2 w-1/2 flex flex-col justify-center gap-15">
        <h1 className="text-7xl font-bold ">Happening now</h1>
        <div className="flex flex-col gap-4 ">
          <div>
            <h2 className="text-4xl font-bold">Join today.</h2>

            <button
              onClick={() => setShowSignup(true)}
              className="bg-white  hover:bg-gray-200 w-64 cursor-pointer rounded-full  transition py-3 text-black text-lg font-bold my-4"
            >
              Create account
            </button>
            {showSignup && (
              <div className="fixed inset-0 bg-black/70  backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-black p-6 rounded-xl w-[500px]">
                  <Twitter className="mx-auto mb-6" size={42} />
                  <form onSubmit={(e) => handleSignup(e)}>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold mb-4 ">
                        Create your account
                      </h2>
                    </div>

                    {!showSignupNext ? (
                      <>
                        <input
                          onChange={(e) => handleSignupChange(e)}
                          name="name"
                          value={signupData.name}
                          className="w-full mb-2 p-2 bg-gray-900 rounded focus:outline-none border focus:border-blue-400"
                          placeholder="name"
                        />
                        <input
                          onChange={(e) => handleSignupChange(e)}
                          name="email"
                          value={signupData.email}
                          className="w-full mb-4 p-2 bg-gray-900 rounded focus:outline-none border focus:border-blue-400"
                          placeholder="email"
                        />
                        <div className="flex mb-4 gap-7 items-center">
                          <span>DOB:</span>
                          <input
                          onChange={(e) => handleSignupChange(e)}
                            type="date"
                            name="dob"
                            className="w-full  bg-gray-600 p-2 text-white  focus:border-blue-400rounded border border-gray-700 focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowSignupNext(true);
                          }}
                          className="bg-white text-black w-full py-2 rounded cursor-pointer font-bold"
                        >
                          Next
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          onChange={(e) => handleSignupChange(e)}
                          value={signupData.username}
                          name="username"
                          type="text"
                          className="w-full mb-2 p-2 bg-gray-900 rounded focus:outline-none border focus:border-blue-400"
                          placeholder="username"
                        />
                        <input
                          type="text"
                          onChange={(e) => handleSignupChange(e)}
                          name="profilePic"
                          value={signupData.profilePic}
                          className="w-full mb-4 p-2 bg-gray-900 rounded focus:outline-none border focus:border-blue-400"
                          placeholder="profile pic url"
                        />
                        <input
                          type="password"
                          onChange={(e) => handleSignupChange(e)}
                          name="password"
                          value={signupData.password}
                          className="w-full mb-4 p-2 bg-gray-900 rounded focus:outline-none border focus:border-blue-400"
                          placeholder="password"
                        />

                        <button
                          type="submit"
                          className="bg-white text-black w-full py-2 rounded cursor-pointer font-bold"
                        >
                          Sign up
                        </button>
                      </>
                    )}
                  </form>
                  <button
                    onClick={() => setShowSignup(false)}
                    className="mt-3 text-gray-400 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-bold text-gray-300 text-2xl">
              Already have an account?
            </h4>
            <button
              onClick={() => setShowSignin(true)}
              className="border border-gray-700  hover:bg-gray-900 w-64 cursor-pointer rounded-full  transition py-3  text-lg font-bold my-4"
            >
              Sign in
            </button>

            {showSignin && (
              <div className="fixed inset-0 bg-black/70  backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-black p-6 rounded-xl w-[500px]">
                  <Twitter className="mx-auto mb-6" size={42} />
                  <form onSubmit={(e) => handleSignin(e)}>
                    <h2 className="text-2xl font-bold mb-4 ">
                      Sign in to Twitter
                    </h2>

                    <input
                      onChange={(e) => handleSigninChange(e)}
                      name="usernameOrEmail"
                      value={signinData.usernameOrEmail}
                      className="w-full mb-2 p-2 bg-gray-900 rounded"
                      placeholder=" email address or username"
                    />
                    <input
                      onChange={(e) => handleSigninChange(e)}
                      name="password"
                      value={signinData.password}
                      className="w-full mb-4 p-2 bg-gray-900 rounded"
                      placeholder="Password"
                    />

                    <button
                      type="submit"
                      className="bg-white text-black w-full py-2 rounded cursor-pointer font-bold"
                    >
                      Sign in
                    </button>
                  </form>
                  <button
                    onClick={() => setShowSignin(false)}
                    className="mt-3 text-gray-400 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
