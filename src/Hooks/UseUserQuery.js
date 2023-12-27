import { useQuery } from "@tanstack/react-query";

const fetchUser = async ({ queryKey }) => {
  console.log(queryKey);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${queryKey[1]}`
  );
  return await response.json();
};

export const useUserQuery = (num) => {
  // useQuery에 첫번째 인수로 넣는 값은 무조건 fetching함수에 전달됨
  // useQuery에서는 queryKey가 동일하면 같은 데이터라고 인지하기 때문에 refetching 처리 안함
  return useQuery(["users", num], fetchUser, {
    //배열(num) 지정 쿼리키로 받아온 배열에서 use값으로 전달 가능
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    //5초
    cacheTime: 1000 * 5, //inactive가 된 상태에서 얼마 동안 데이터를 캐시에 유지 시킬지에 대한 시간 정보
    // 해당 데이터를 컴포넌트에서 활용하지 않더라도 얼마동안 gc(가비지컬렉터)에 의한 데이터 삭제를 막는 시간 값 설정
    staleTime: 1000 * 5, //비동기 서버 데이터를 fetching한 순간부터 언제까지 최신데이터로 인지 시키면서 cacheTime을 소진시키지 않을 지에 대한 시간 값
    // 얼마동안 refetching을 하지 않을지에 대한 시간 값 설정
  });
};

/*
  fresh: 서버데이터를 최신으로 인식하는 상태 (refetch 필요없는 상태)
  stale: 서버데이터를 오래된 상태로 인식하는 상태 (refetch 필요한 상태)
  inactive: 서버데이터가 더이상 해당 컴포넌트에서 활용되지 않는 상태
  cacheTime: inactive상태에서 얼마까지 데이터를 유지시킬지에 대한 시간값 (default: 1000 * 60 * 5ms 5분)
  statleTime: 처음 dataFetching후 얼마뒤에 fresh -> stale로 변경할지에 대한 시간값 (default: 0ms)
*/
