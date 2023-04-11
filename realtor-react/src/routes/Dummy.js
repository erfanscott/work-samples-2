import React, { useEffect, useState } from "react";
import useDummy from "../hooks/useDummy";

export default function Dummy() {
  console.log("Dummy ran");
  const { count, incrementCount } = useDummy();
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    console.log("useEffect inside App");
  }, []);

  return (
    <div>
      <button onClick={incrementCount} style={{ backgroundColor: "red" }}>
        Increment Count
      </button>
      <p>
        Count: {count} <br />
        <br />
        <br />
      </p>
      <button
        onClick={() => setCount2((x) => x + 1)}
        style={{ backgroundColor: "blue" }}
      >
        Increment Count2
      </button>
      <p>
        Count: {count2} <br />
        <br />
        <br />
      </p>
    </div>
  );
}
