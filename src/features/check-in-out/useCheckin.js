import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";
import { ORDER_STATUS } from "../../utils/constants";


export default function useCheckin ()
{
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading: isCheckinIn } = useMutation(
    {
      mutationFn: ({ bookingId, breakfast = {} }) => updateBooking(bookingId,
        {
          status: ORDER_STATUS.checked_in,
          isPaid: true,
          ...breakfast,
        }
      ),

      onSuccess: (data) =>
      {
        queryClient.invalidateQueries({ active: true });
        toast.success(`Бронирование № ${data.id} успешно зарегистрировано`);
        navigate('/');
      },

      onError: () => toast.error('Во время регистрации произошла ошибка.')
    }
  );

  return { checkin, isCheckinIn };
}
