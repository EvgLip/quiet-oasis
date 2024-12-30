import supabase from "./supabase";

export async function getSettings ()
{
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error)
  {
    console.error(error);
    throw new Error("Не удалось загрузить настройки");
  }
  return data;
}

// Мы ожидаем появления нового объекта настройки, который будет выглядеть 
// следующим образом {setting: newValue}
export async function updateSetting (newSetting)
{
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // Существует только одна строка настроек, и она имеет идентификатор=1, 
    // так что это обновленная строка
    .eq("id", 1)
    .single();

  if (error)
  {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
