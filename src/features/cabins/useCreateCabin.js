import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateCabin } from "../../services/apiCabins";

export default function useCreateCabin ()
{
  const queryClient = useQueryClient();
  //мутация для создания нового коттеджа
  const { isLoading: isCreating, mutate: createCabin } = useMutation(
    {
      mutationFn: createUpdateCabin,
      onSuccess: () => 
      {
        queryClient.invalidateQueries({ queryKey: ['cabins'] });
        toast.success('Создана запись о новом коттедже.');
        //reset();
      },
      onError: (err) => toast.error(err.message) //ошибка генерируется в apiCabins
    }
  );

  return { isCreating, createCabin };
}