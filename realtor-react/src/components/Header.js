import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoImg from "../img/rdc-logo-default.jpg";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 shadow-md bg-white">
      <div className="flex justify-between items-center px-8 max-w-screen-xl mx-auto">
        <div className="">
          <img
            src={LogoImg}
            alt="LOGO"
            onClick={() => navigate("/")}
            className="w-40 cursor-pointer"
          />
        </div>
        <div>
          <nav>
            {/* leading-[50px] --> to solve the issues with the height and li borders to fit the bottom of the header */}
            <ul className="flex items-center space-x-8 text-lg leading-[50px] text-gray-400">
              <li
                onClick={() => navigate("/")}
                className={`cursor-pointer border-b-2 border-transparent ${
                  pathname === "/" ? "border-b-red-600 text-black" : ""
                }`}
              >
                Home
              </li>
              <li
                onClick={() => navigate("/offers")}
                className={`cursor-pointer border-b-2 border-transparent ${
                  pathname === "/offers" ? "border-b-red-600 text-black" : ""
                }`}
              >
                Offers
              </li>
              <li
                onClick={() => navigate("/sign-in")}
                className={`cursor-pointer border-b-2 border-transparent ${
                  pathname === "/sign-in" ? "border-b-red-600 text-black" : ""
                }`}
              >
                Sign in
              </li>
              <li
                onClick={() => navigate("/profile")}
                className={`cursor-pointer border-b-2 border-transparent ${
                  pathname === "/profile" ? "border-b-red-600 text-black" : ""
                }`}
              >
                Profile
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
