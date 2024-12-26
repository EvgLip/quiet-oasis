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

export async function createEditCabin (cabinData, editId)
{
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);
  //путь к storage в БД
  //https://ensdctanfssdtelodftl.supabase.co/storage/v1/object/public/cabin-images/name.jpg

  //в БД хранится путь к изображению
  const imageName = `${Math.random().toString().replaceAll('0.', '')}-${cabinData.image.name}`.replaceAll('/', '');
  //если в imagePath строка содержащая путь к файлу в storage БД то берем ее (т.е. идет редактироване записи с сохранением старого изображения), иначе формируем путь для нового файла
  const imagePath = hasImagePath ? cabinData.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  console.log('imagePath - ', imagePath);

  //1.создаем/редактируем запись в БД - вызов из <CreateCabinForm/>
  let query = supabase.from('cabins');

  //a) СОЗДАЕМ
  if (!editId) query.insert([{ ...cabinData, image: imagePath }]);

  //б)РЕДАКТИРУЕМ
  if (editId) query = query.update(cabinData)
    .eq('id', editId);

  const { data, error } = await query.select();//.single();

  console.log('данные после create ', data);

  if (error)
  {
    console.log(error);
    throw new Error('Невозможно добавить новую запись БД.');
  }

  //2.если запись создана успешно, загружаем файл изображения в storage БД
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, cabinData.image);

  //3.если произошла ошибка при загрузке файла-изображения в cabin-storage, то удаляем всю запись из БД, которая была создана на шаге 1
  if (storageError)
  {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Изображение коттеджа не было загружено и запись в БД не была создана.');
  }

  return data;
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