import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export default function useEditCabin ()
{
  const queryClient = useQueryClient();

  //мутация для изменения данных по коттеджу
  const { isLoading: isEditing, mutate: editCabin } = useMutation(
    {
      mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
      onSuccess: (data) => 
      {
        console.log('данные после update ', data);
        queryClient.invalidateQueries({ queryKey: ['cabins'] });
        toast.success(`Данные о коттедже ${data[0].name} обновлены.`);
      },
      onError: (err) => toast.error(err.message) //ошибка генерируется в apiCabins
    }
  );

  return { isEditing, editCabin };
}