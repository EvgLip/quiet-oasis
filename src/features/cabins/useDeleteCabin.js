import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export default function useDeleteCabin ()
{
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation(
    {
      // mutationFn: (id) => deleteCabin(id),
      mutationFn: ({ cabinId, imagePath }) => deleteCabinApi(cabinId, imagePath),
      onSuccess: () =>
      {
        queryClient.invalidateQueries({ queryKey: 'cabins' });
        toast.success('Запись успешно удалена');
      },
      onError: err => toast.error(err.message),
    }
  );

  return { isDeleting, deleteCabin };
}