import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../../services/apiAuth";


export default function useLogout ()
{
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation(
    {
      mutationFn: logoutApi,
      onSuccess: () =>
      {
        queryClient.removeQueries();
        navigate('/login', { replace: true });
      }
    }
  );

  return { logout, isLoading };
}