import { useUserQuery } from "./Hooks/useUserQuery";

export default function UserAddress() {
  const result = useUserQuery(2);
  console.log(result);

  return (
    <div className="UserAddress">
      <h1>User Address</h1>
    </div>
  );
}
