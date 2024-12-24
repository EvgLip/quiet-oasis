import supabase from "./supabase";

export async function getCabins ()
{
  let { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error)
  {
    console.log(error);
    throw new Error('Не удалось получить сведения по коттеджам.');
  }

  return data;
}

export async function createCabin (newCabinData)
{

  const { data, error } = await supabase
    .from('cabins')
    .insert([newCabinData]);

  if (error)
  {
    console.log(error);
    throw new Error('Невозможно добавить запись.');
  }
}

export async function deleteCabin (id)
{

  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error)
  {
    console.log(error);
    throw new Error('Невозможно удалить запись.');
  }
}