import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function GoogleAuthBtn() {
  const navigate = useNavigate();
  async function handleClick() {
    try {
      //google auth set up
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      //destructing user info
      const { user } = result;
      const { displayName, email } = user;
      //checking if the user's data has already been stored in the database...storing the data in case it has not.
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: displayName,
          email: email,
          //maybe using Date() isn't the best practice as you can use serverTimeStamp instead
          timeStamp: new Date(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with google authentication");
    }
  }
  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center uppercase w-full h-10 rounded-md text-white text-base font-medium bg-red-600 transition duration-200 hover:bg-red-700 active:bg-red-800"
    >
      <FcGoogle className="bg-white w-6 h-6 rounded-full mr-3" />
      continue with google
    </button>
  );
}
