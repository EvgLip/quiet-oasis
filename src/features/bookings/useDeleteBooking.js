import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";


function useDeleteBooking ()
{
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking, } = useMutation(
    {
      mutationFn: (bookingId) => deleteBookingApi(bookingId),
      onSuccess: () =>
      {
        queryClient.invalidateQueries({ queryKey: 'bookings' });
        toast.success('Запись успешно удалена');
      },
      onError: err => toast.error(err.message)
    }
  );

  return { isDeleting, deleteBooking, };
}

export default useDeleteBooking;