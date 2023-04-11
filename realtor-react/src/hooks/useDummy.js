import { useEffect, useState } from "react";

export default function useDummy() {
  const [count, setCount] = useState(0);
  console.log("useDummy ran");

  useEffect(() => {
    console.log("useEffect inside custom hook");
  }, [count]);
  console.log("after useeffect hook");
  const incrementCount = () => {
    setCount(count + 1);
  };

  return { count, incrementCount };
}
