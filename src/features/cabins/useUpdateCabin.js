import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUpdateCabin } from "../../services/apiCabins";

export default function useUpdateCabin ()
{
  const queryClient = useQueryClient();

  //мутация для изменения данных по коттеджу
  const { isLoading: isUpdating, mutate: updateCabin } = useMutation(
    {
      mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
      onSuccess: (data) => 
      {
        queryClient.invalidateQueries({ queryKey: ['cabins'] });
        toast.success(`Данные о коттедже ${data[0].name} обновлены.`);
      },
      onError: (err) => toast.error(err.message) //ошибка генерируется в apiCabins
    }
  );

  return { isUpdating, updateCabin };
}