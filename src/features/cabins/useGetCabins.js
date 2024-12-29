import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export default function useGetCabins ()
{
  const { isLoading, data: cabins, error } = useQuery(
    //const y = useQuery(
    {
      queryKey: ['cabins'],
      queryFn: getCabins,  //функция выборки данных
    }
  );

  return { isLoading, cabins, error };
}