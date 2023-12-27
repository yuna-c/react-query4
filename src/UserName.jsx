import { useState } from "react";
import { useUserQuery } from "./Hooks/useUserQuery";

export default function UserName() {
  const [Num, setNum] = useState(1);
  const { data, isSuccess } = useUserQuery(Num);
  // console.log(result);

  return (
    <div className="UserName">
      <h1>User Name</h1>
      <button onClick={() => setNum(1)}>변경1</button>
      <button onClick={() => setNum(2)}>변경2</button>
      <button onClick={() => setNum(Num + 1)}>헤헤</button>
      <p>{Num}</p>

      <h2>{isSuccess && data.name}</h2>
    </div>
  );
}
