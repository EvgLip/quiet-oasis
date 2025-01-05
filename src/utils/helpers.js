import { formatDistance, parseISO, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';

// Мы хотим, чтобы эта функция работала как для объектов Date, так и для строк (которые поступают из Supabase).
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), { addSuffix: true, locale: ru })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase нужна строка даты ISO. Однако, эта строка будет отличаться при каждом рендеринге, потому что MS или SEC изменились, что не очень хорошо. Поэтому мы используем этот трюк, чтобы удалить любое время
export const getToday = function (options = {})
{
  const today = new Date();

  // Это необходимо для сравнения с created_at из Supabase, потому что это не 0.0.0.0, поэтому нам нужно установить дату на конец дня, когда мы будем сравнивать ее с более ранними датами
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' }).format(
    value
  );

//склонение слова ночь по числам
export function declensionWordNight (num)
{
  const arrNigth = ['ночей', 'ночь', 'ночи',];
  const arrCase = [0, 1, 2, 2, 2];

  return arrNigth[num % 100 >= 11 && num % 100 <= 19
    ? 0
    : arrCase[num % 10 <= 4 ? num % 10 : 0]
  ];
}
