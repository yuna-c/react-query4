import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/*
  fresh: 서버데이터를 최신으로 인식하는 상태 (refetch 필요없는 상태)
  stale: 서버데이터를 오래된 상태로 인식하는 상태 (refetch 필요한 상태)
  inactive: 서버데이터가 더이상 해당 컴포넌트에서 활용되지 않는 상태
  cacheTime: inactive상태에서 얼마까지 데이터를 유지시킬지에 대한 시간값 (default: 1000 * 60 * 5ms 5분)
  statleTime: 처음 dataFetching후 얼마뒤에 fresh -> stale로 변경할지에 대한 시간값 (default: 0ms)
*/

// 데이터 목록 호출 함수
const fetchUser = async ({ queryKey }) => {
  console.log(queryKey);
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/`);
  return await response.json();
};

// 데이터 목록 호출 커스텀 훅
export const useUserQuery = () => {
  return useQuery(["users"], fetchUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 1000 * 20,
    staleTime: 1000 * 0,
  });
};

//
const deleteUser = async ({ queryKey }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${queryKey[1]}`,
    {
      method: "DELETE",
    }
  );
  return await response.json();
};

// 인수로 순번을 받아서 해당 순번의 서버 데이터를 삭제하는 커스텀 훅(useMutation)
export const useDeleteQuery = () => {
  // 기존 생성한 queryClient 인스턴스를 호출
  // 해당 queryClient 인스턴스에서 활용할 수 있는  prototype method인 setQueryData라는 서버 데이터 변경요청 값을 등록하는 함수
  const queryClient = useQueryClient();
  // useMutation(비동기 데이터 변경 함수, 옵션 설정 객체{onSuccess: mutate요청이 성공적으로 수행되면 연결될 핸들러 함수})
  // useMutation훅이 deleteUser라는 내부 fetching함수를 호출해서 서버 데이터를 변경 요청
  return useMutation(deleteUser, {
    // 서버 데이터 변경이 성공하면 변경된 서버 데이터 값을 다시 고유의 쿼리키로 등록해서 react-query로 비동기 데이터 관리
    onSuccess: (args) => {
      // args 데이터값 인자
      // 변경되면 새로운 고유 쿼리키를 만들어서 users의,1(id), blabla~ (수정,삭제,업데이트)
      queryClient.setQueryData(["users", args.id], args);
    },
  });
};
