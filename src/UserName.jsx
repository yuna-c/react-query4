import { useState } from "react";
import { useUpdateUser, useUserQuery } from "./hooks/useUserQuery";

export default function UserName() {
  //1- 해당 컴포넌트 마운트시 react-query훅으로 2번째를 호출 및 자동 캐싱처리
  const { isSuccess, data } = useUserQuery(2);
  const updateUser = useUpdateUser();
  const [UserName, setUserName] = useState("");

  //4- 폼 전송이벤트 발생시 input에 있는 변경할 사용자 이름과 변경할 데이터 순번을 배열로 묶어서 update커스텀 훅으로 활성화시킨 useMutaion객체를 가져와서 mutate메서드에 인수로 전달
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser.mutate([UserName, 2]);
  };

  return (
    <div className="UserName">
      <h1>User Name</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={UserName || ""}
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>

      {/* 3-useQuery훅에 의해서 캐싱반환된 데이터값 출력 */}
      <p>{isSuccess && data.name}</p>
    </div>
  );
}
