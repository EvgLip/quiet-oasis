import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useUpdateSetting ()
{
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation(
    {
      mutationFn: updateSettingApi,
      onSuccess: (data) =>
      {
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ['settings'] });
        toast.success(`Данные обновлены.`);
      },
      onError: (err) => toast.error(err.message) //ошибка генерируется в apiSettings
    }
  );

  return { isUpdating, updateSetting };
}