import supabase, { supabaseUrl } from "./supabase";

export async function getCabins ()
{
  let { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error)
  {
    console.log('log ошибки из supabase-> ', error);
    throw new Error('Не удалось получить сведения по коттеджам из БД.');
  }

  return data;
}
///////////////////////////////////////////////////////////
export async function createUpdateCabin (cabinData, updateId)
{
  //путь к storage в БД
  //https://ensdctanfssdtelodftl.supabase.co/storage/v1/object/public/cabin-images/name.jpg
  const hasImagePath = typeof cabinData.image === 'string' ? cabinData.image?.startsWith?.(supabaseUrl) : false;

  //в таблице БД хранится путь к изображению
  //если в cabinData файл изображения, то формируем новое имя файла, иначе undefined
  const imageName = cabinData.image.name ? `${Math.random().toString().replaceAll('0.', '')}-${cabinData.image.name}`.replaceAll('/', '') : undefined;
  //если в hasImagePath строка содержащая путь к файлу в storage БД то берем ее (т.е. идет редактироване записи с сохранением старого изображения), иначе если есть имя - формируем путь для нового файла изображения
  const imagePath = hasImagePath
    ? cabinData.image
    : imageName
      ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
      : '';

  //1.создаем/редактируем запись в БД 
  let query = supabase.from('cabins');

  //a) СОЗДАЕМ
  if (!updateId) query = query.insert({ ...cabinData, image: imagePath });

  //б)РЕДАКТИРУЕМ
  if (updateId)
  {
    //файл изображения остается старым
    if (hasImagePath) query = query.update(cabinData).eq('id', updateId);
    //изменение всех полей таблицы БД cabins, добавляется ссылка на новый файл изображения
    else query = query.update({ ...cabinData, image: imagePath }).eq('id', updateId);
  }

  const { data, error } = await query.select(); //.single();

  if (error)
  {
    console.log('log ошибки из supabase-> ', error);
    throw new Error('Не удалось добавить новую запись в БД.');
  }

  //2.если запись создана/отредактирована успешно, загружаем файл изображения в storage БД
  //кроме случая, когда файл изображения не меняется
  if (hasImagePath) return data;
  //кроме случая, когда файла изображения нет (режим дублирования записи)
  if (!imageName) return data;

  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, cabinData.image);

  //3.если произошла ошибка при загрузке файла-изображения в cabin-storage, то удаляем всю запись из БД, которая была создана на шаге 1
  if (storageError)
  {
    //await supabase.from('cabins').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error('Не удалось добавить файл изображения в БД.');
  }

  return data;
}
///////////////////////////////////////////////////////////
export async function deleteCabin (id, imagePath)
{
  //удаление записи из таблицы
  const { error: errBD } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (errBD)
  {
    console.log(errBD);
    throw new Error('Невозможно удалить запись из БД.');
  }
  //удаление файла изображения из storage
  const fileName = imagePath.split('/').pop();
  const { error: errBucket } = await supabase.storage.from('cabin-images').remove([fileName]);

  if (errBucket)
  {
    console.log(errBucket);
    throw new Error('Невозможно удалить файл изображения из БД.');
  }
}