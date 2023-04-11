import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  function handleFormChange(event) {
    const { value, name } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const auth = getAuth();
      //sign up the user in firebase auth and update their profile
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      await updateProfile(auth.currentUser, { displayName: name });
      //add a new document to the "users" collection
      //maybe using Date() isn't the best practice as you can use serverTimeStamp instead
      const firebaseDocData = { ...formData, timeStamp: new Date() };
      delete firebaseDocData.password;
      await setDoc(doc(db, "users", user.uid), firebaseDocData);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    // const auth = getAuth();
    //put console.log(userCredential.user) before the updateProfile(auth.currentUser, { displayName: name }) and the profile would change before the updateProfile even ran
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     console.log(userCredential.user);
    //     const date = new Date();
    //     return updateProfile(auth.currentUser, { displayName: name });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
  return (
    <main>
      <h1 className="text-center font-bold text-3xl mt-10">Sign Up</h1>
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
              type="text"
              placeholder="Full name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="bg-white w-full border-2 rounded text-xl px-4 h-10 mb-5"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="bg-white w-full border-2 rounded text-xl px-4 h-10 mb-5"
            />
            <div className="relative mb-7">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                className="bg-white w-full border-2 rounded text-xl px-4 h-10"
              />
              {isPasswordVisible ? (
                <BsFillEyeFill
                  onClick={togglePasswordVisibility}
                  className="absolute top-[10px] right-3 w-5 h-5"
                />
              ) : (
                <BsFillEyeSlashFill
                  onClick={togglePasswordVisibility}
                  className="absolute top-[10px] right-3 w-5 h-5"
                />
              )}
            </div>
            <div className="min-[1140px]:flex justify-between text-lg mb-7">
              <p className="mb-3 min-[1140px]:mb-0">
                Have an account already?{" "}
                <Link
                  to="/sign-in"
                  className="text-red-600 font-medium transition-colors duration-150 hover:text-red-700"
                >
                  Sign in
                </Link>
              </p>
              <Link
                to="/forgot-password"
                className="text-blue-700 transition-colors duration-150 hover:text-blue-900"
              >
                forgot your password?
              </Link>
            </div>
            <button className="uppercase w-full h-10 rounded-md text-white text-base font-medium bg-blue-600 transition duration-200 hover:bg-blue-700 active:bg-blue-800">
              Sign up
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
