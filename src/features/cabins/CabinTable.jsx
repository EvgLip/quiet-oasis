import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import useGetCabins from "./useGetCabins";
import Menus from "../../ui/Menus";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  justify-content:start;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable ()
{
  const { isLoading, cabins } = useGetCabins();

  if (isLoading) return <Spinner />;

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

        <Table.Body data={cabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />

      </Table>
    </Menus>
  );
}

export default CabinTable;;