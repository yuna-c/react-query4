import { useState } from "react";
import { useUserQuery } from "./Hooks/useUserQuery";

export default function UserName() {
  const { data, isSuccess } = useUserQuery(1);
  // console.log(result);
  const [Num, setNum] = useState(0);

  return (
    <div className="UserName">
      <h1>User Name</h1>
      <p>{Num}</p>
      <button onClick={() => setNum(Num + 1)}>Plus</button>
      <h2>{isSuccess && data.name}</h2>
    </div>
  );
}
