import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignup as userSignupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";


export function useUserSingup ()
{
  const queryClient = useQueryClient();
  const { mutate: userSignup, isLoading } = useMutation(
    {
      mutationFn: ({ email, password, fullName }) =>
        userSignupApi({ email, password, fullName }),
      onSuccess: () =>
      {
        queryClient.invalidateQueries({ active: true });
        toast.success('Пользователь успешно зарегистрирован. \n Пожалуйста, подтвердите новую учетную запись с помощью адреса электронной почты пользователя');
      }
    }
  );


  return { isLoading, userSignup };
}