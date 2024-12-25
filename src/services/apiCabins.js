import supabase, { supabaseUrl } from "./supabase";

export async function getCabins ()
{
  let { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error)
  {
    console.log(error);
    throw new Error('Не удалось получить сведения по коттеджам из БД.');
  }

  return data;
}

export async function createCabin (newCabinData)
{
  //https://ensdctanfssdtelodftl.supabase.co/storage/v1/object/public/cabin-images/name.jpg

  const imageName = `${Math.random().toString().replaceAll('0.', '')}-${newCabinData.image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.создаем новую запись в БД
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabinData, image: imagePath }]);

  if (error)
  {
    console.log(error);
    throw new Error('Невозможно добавить новую запись БД.');
  }

  //2.если запись создана успешно, загружаем файл в хранилище БД
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabinData.image);

  //3.если произошла ошибка при загрузке файла-изображения в cabin-storage, то удаляем всю запись из БД, которая была создана на шаге 1
  if (storageError)
  {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Изображение коттеджа не было загружено и запись в БД не была создана.');
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
    throw new Error('Невозможно удалить запись из БД.');
  }
}