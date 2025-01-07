import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { ORDER_STATUS } from "../../utils/constants";
import { uppercaseFirstChar } from "../../utils/helpers";

function BookingTableOperations ()
{
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "Все" },
          { value: 'checked_out', label: uppercaseFirstChar(ORDER_STATUS.checked_out) },
          { value: 'checked_in', label: uppercaseFirstChar(ORDER_STATUS.checked_in) },
          { value: 'unconfirmed', label: uppercaseFirstChar(ORDER_STATUS.unconfirmed) },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-asc", label: "По возрастанию даты" },
          { value: "startDate-desc", label: "По убыванию даты" },
          { value: "totalPrice-asc", label: "По возрастанию внесенной суммы", },
          { value: "totalPrice-desc", label: "По убыванию внесенной суммы" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
