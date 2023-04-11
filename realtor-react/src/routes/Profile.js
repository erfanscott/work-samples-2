import { getAuth } from "firebase/auth";
import React, { useState } from "react";

export default function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-10">Profile</h1>
      <section className="px-3 md:w-6/12 max-w-2xl mx-auto mt-10">
        <input
          type="text"
          placeholder="Full name"
          name="name"
          disabled
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
        <div className="flex flex-wrap justify-between text-lg mb-5">
          <p className="mr-2">
            Do you want to change your name?{" "}
            <span className="text-red-600 hover:text-red-700 cursor-pointer transition duration-200">
              Edit
            </span>
          </p>
          <p className="text-blue-600 hover:text-blue-700 cursor-pointer transition duration-200">
            Log out
          </p>
        </div>
      </section>
    </div>
  );
}
