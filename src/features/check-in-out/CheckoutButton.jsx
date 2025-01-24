import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

/* eslint-disable react/prop-types */
function CheckoutButton ({ bookingId })
{
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button $size="small" onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
      Выписать
    </Button>
  );
}

export default CheckoutButton;
