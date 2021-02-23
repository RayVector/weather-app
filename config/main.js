export default {
  REQUEST_INTERVAL: 600000, // 10 min
  OPEN_WEATHER_MAP_ID: '1656eaaff528be681e31d99d5a2921aa',
  OPEN_WEATHER_MAP_URL: 'http://api.openweathermap.org/data/2.5/',
  TRANSLATE_URL: 'https://translate.googleapis.com/translate_a/',
  UNITS_LIST: [
    {
      title: 'C',
      id: 'metric',
    },
    {
      title: 'F',
      id: 'imperial',
    },
  ],
  LOCALES: [
    {
      id: 'ru',
      regexLetters: /^[-A-Za-zА-Яа-я]+$/,
      defaultCity: 'Москва',
      speedUnits: 'м/с',
    },
  ],
}