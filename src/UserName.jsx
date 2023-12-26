import { useUserQuery } from "./Hooks/useUserQuery";

export default function UserName() {
  const result = useUserQuery();
  console.log(result);

  return (
    <div className="UserName">
      <h1>User Name</h1>
    </div>
  );
}
