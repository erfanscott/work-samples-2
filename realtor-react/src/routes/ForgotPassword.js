import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleAuthBtn from "../components/GoogleAuthBtn";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("The reset Email has been sent");
    } catch (error) {
      toast.error("could not send the reset email");
    }
  }

  return (
    <main>
      <h1 className="text-center font-bold text-3xl mt-10">Reset Password</h1>
      <div className="flex flex-wrap justify-center items-center mt-16 md:mt-20 px-5 mx-auto max-w-md md:max-w-screen-xl">
        <div className="w-full md:w-[45%]">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
            alt="Sign UP"
            className="w-full rounded-md"
          />
        </div>
        <div className="w-full md:w-[45%] mt-8 md:mt-0 md:ml-10">
          <form onSubmit={handleSubmit} className="mb-7">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="bg-white w-full border-2 rounded text-xl px-4 h-10 mb-5"
            />

            <div className="min-[1140px]:flex justify-between text-lg mb-7">
              <p className="mb-3 min-[1140px]:mb-0">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-red-600 font-medium transition-colors duration-150 hover:text-red-700"
                >
                  Register
                </Link>
              </p>
              <Link
                to="/sign-in"
                className="text-blue-700 transition-colors duration-150 hover:text-blue-900"
              >
                Sign in
              </Link>
            </div>
            <button className="uppercase w-full h-10 rounded-md text-white text-base font-medium bg-blue-600 transition duration-200 hover:bg-blue-700 active:bg-blue-800">
              reset password
            </button>
          </form>
          <div className="flex items-center mb-7">
            <div className="h-[2px] bg-gray-400 flex-1"></div>
            <p className="mx-2 font-semibold text-lg text-gray-700">OR</p>
            <div className="h-[2px] bg-gray-400 flex-1"></div>
          </div>
          <GoogleAuthBtn />
        </div>
      </div>
    </main>
  );
}
