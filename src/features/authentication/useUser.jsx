import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";


export function useUser ()
{
  const { isLoading, data: user, isSuccess, isError } = useQuery(
    {
      queryKey: ['user'],
      queryFn: getCurrentUser,
    }
  );

  return {
    isLoading,
    isSuccess,
    user,
    isAuthenticated: !isError && user?.role === 'authenticated',
    isError,
  };
}