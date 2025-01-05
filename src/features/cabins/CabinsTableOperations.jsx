import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from '../../ui/TableOperations';

function CabinsTableOperations ()
{
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={
          [
            { label: 'Все', value: 'all' },
            { label: 'Со скидкой', value: 'with-discount' },
            { label: 'Без скидки', value: 'no-discount' },
          ]
        }
      />

      <SortBy options={
        [
          { label: 'Коттеджи А-Я', value: 'name-asc' },
          { label: 'Коттеджи Я-А', value: 'name-desc' },
          { label: 'Цена по возрастанию', value: 'regularPrice-asc' },
          { label: 'Цена по убыванию', value: 'regularPrice-desc' },
          { label: 'Вместимость по возрастанию', value: 'maxCapacity-asc' },
          { label: 'Вместимость по убыванию', value: 'maxCapacity-desc' },
        ]
      } />
    </TableOperations>
  );
}

export default CabinsTableOperations;