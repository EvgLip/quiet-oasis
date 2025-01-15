import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers ()
{
  return (
    <>
      <Heading as="h3">Регистрация нового пользователя</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
