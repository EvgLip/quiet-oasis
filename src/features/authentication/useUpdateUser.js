import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUser } from '../../services/apiAuth';

export default function useUpdateUser ()
{
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation(
    {
      mutationFn: updateCurrentUser,
      onSuccess: (data) =>
      {
        console.log('useUpdateUser', data);
        //ручное изменение данных
        //queryClient.setQueryData(['user'], data.user)
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success(`Данные обновлены.`);
      },
      onError: (err) => toast.error(err.message)
    }
  );

  return { isUpdating, updateUser };
}