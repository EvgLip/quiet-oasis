import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";
import { ORDER_STATUS } from "../../utils/constants";


export default function useCheckout ()
{
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation(
    {
      mutationFn: (bookingId) => updateBooking(bookingId,
        {
          status: ORDER_STATUS.checked_out,
        }
      ),

      onSuccess: (data) =>
      {
        queryClient.invalidateQueries({ active: true });
        toast.success(`Бронирование № ${data.id} успешно закрыто`);
        // navigate('/');
      },

      onError: () => toast.error('Произошла ошибка.')
    }
  );

  return { checkout, isCheckingOut };
}
