import supabase from "./supabase";

/////////////////////////////////////////////////////////
export async function login ({ email, password })
{
  const { data, error } = await supabase.auth.signInWithPassword(
    {
      email,
      password,
    });

  if (error)
  {
    console.log('apiAuth.login ', error.message);
    throw new Error(error.message);
  }

  return data;
}
/////////////////////////////////////////////////////////
export async function getCurrentUser ()
{
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error)
  {
    console.log('apiAuth.getCurrentUser.ERROR ', error.message);
    throw new Error(error.message);
  }

  return data?.user;
}
/////////////////////////////////////////////////////////
export async function logout ()
{
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('Logout.error ', error.message);
}
/////////////////////////////////////////////////////////
export async function userSignup ({ fullName, email, password })
{
  const { data, error } = await supabase.auth.signUp(
    {
      email,
      password,
      options: {
        data: {
          fullName,
          avatar: '',
        },
      },
    }
  );

  if (error)
  {
    console.log('apiAuth.userSignup.ERROR ', error.message);
    throw new Error(error.message);
  }

  return data;
}
/////////////////////////////////////////////////////////
export async function updateCurrentUser ({ password, fullName, avatar })
{
  //1. изменение пароля или имени
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error)
  {
    console.log('apiAuth.updateCurrentUser.ERROR ', error.message);
    throw new Error(error.message);
  }

  if (!avatar) return;

  //2. загружаем аватарку в хранилище БД
  const fileName = `avatar-${data.user.id}-${Math.random().toString().replaceAll('0.', '')}`;

  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName);
  if (storageError)
  {
    console.log('apiAuth.updateCurrentUser.STORAGE_ERROR ', storageError.message);
    throw new Error(storageError.message);
  }

  //загружаем путь к аватарке в запись конкретного user
}
