import React from "react";
import { useNavigate } from "react-router-dom";

export default function Offers() {
  const navigate = useNavigate();

  return <main onClick={() => navigate("/sign-in")}>OFFERS</main>;
}
