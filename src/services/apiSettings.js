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
    // в таблице настроек только одна запись под id=1
    .eq("id", 1)
    .single();

  if (error)
  {
    console.error(error);
    throw new Error("Не удалось обновить настройки");
  }
  return data;
}
