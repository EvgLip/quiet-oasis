import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import useGetCabins from "./useGetCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable ()
{
  const { isLoading, cabins } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  //Фильтроция
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'with-discount') filteredCabins = cabins.filter(cabin => cabin.discount > 0);
  if (filterValue === 'no-discount') filteredCabins = cabins.filter(cabin => cabin.discount === 0);

  //Сортировка
  const sortBy = searchParams.get("sortBy") || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  const displayCabins = sortedCabins;

  return (
    <Menus>
      <Table $columns='0.8fr 1fr 2.2fr 1fr 1fr 0.5fr'>

        <Table.Header>
          <div role="columnheader">Фото</div>
          <div role="columnheader">Коттедж</div>
          <div role="columnheader">Вместимость</div>
          <div role="columnheader">Цена</div>
          <div role="columnheader">Скидка</div>
          <div role="columnheader">Действия</div>
        </Table.Header>

        <Table.Body data={displayCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />

      </Table>
    </Menus>
  );
}

export default CabinTable;;