import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login as loginApi } from "../../services/apiAuth";

function useLogin ()
{
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation(
    {
      mutationFn: ({ email, password }) => loginApi({ email, password }),
      onSuccess: (data) =>
      {
        queryClient.setQueryData(['user'], data.user);
        navigate('/dashboard', { replace: true });
      },
      onError: (err) =>
      {
        console.log('useLogin.ERROR ', err);
        toast.error('email или пароль указаны неверно');
      }
    }
  );

  return { login, isLoading };
}

export default useLogin;