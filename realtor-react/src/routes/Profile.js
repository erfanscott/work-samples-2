import { getAuth, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  async function handleSubmit() {
    try {
      if (auth.currentUser.displayName !== formData.name) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });
        console.log(auth.currentUser.uid);
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          { name: formData.name },
          { merge: true }
        );
        setIsEditing(false);
        toast.success("The profile has been successfully updated");
      }
    } catch (error) {
      toast.error("Could not update the profile");
    }
  }
  async function logOutHandler() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      toast.error("Log out failed");
    }
  }
  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-10">Profile</h1>
      <section className="px-3 md:w-6/12 max-w-2xl mx-auto mt-10">
        <input
          type="text"
          placeholder="Full name"
          name="name"
          disabled={!isEditing}
          value={formData.name}
          onChange={handleFormChange}
          className={`w-full border-2 rounded text-xl px-4 h-10 mb-5 ${
            isEditing ? "bg-red-200" : "bg-white"
          }`}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          disabled
          value={formData.email}
          onChange={handleFormChange}
          className="w-full border-2 rounded text-xl px-4 h-10 mb-5 bg-white"
        />
        <div className="flex flex-wrap justify-between text-lg mb-5">
          {isEditing ? (
            <button
              onClick={handleSubmit}
              className="rounded bg-blue-700 text-base text-white font-bold p-2"
            >
              Submit Changes
            </button>
          ) : (
            <p className="mr-2">
              Do you want to change your name?{" "}
              <span
                onClick={() => setIsEditing((prevIsEditing) => !prevIsEditing)}
                className="text-red-600 hover:text-red-700 cursor-pointer transition duration-200"
              >
                Edit
              </span>
            </p>
          )}
          <p
            onClick={logOutHandler}
            className="text-blue-600 hover:text-blue-700 cursor-pointer transition duration-200"
          >
            Log out
          </p>
        </div>
      </section>
    </div>
  );
}
