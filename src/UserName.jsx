import { useDeleteQuery, useUserQuery } from "./hooks/useUserQuery";

export default function UserName() {
  const { isSuccess, data } = useUserQuery();
  // console.log(isSuccess);
  console.log(data);

  const deleteUser = useDeleteQuery(); //객체
  console.log(data);
  return (
    <div className="UserName">
      <h1>User Name</h1>
      <button
        onClick={() => {
          deleteUser.mutate(2);
        }}
      >
        유저 데이터 삭제
      </button>
      <ul>
        {isSuccess ? (
          data.map((user) => <li key={user.id}>{user.name}</li>)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}
