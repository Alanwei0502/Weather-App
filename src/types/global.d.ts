declare global {
  type LanguageCode =
    | 'sq'
    | 'af'
    | 'ar'
    | 'az'
    | 'eu'
    | 'be'
    | 'bg'
    | 'ca'
    | 'zh_cn'
    | 'zh_tw'
    | 'hr'
    | 'cz'
    | 'da'
    | 'nl'
    | 'en'
    | 'fi'
    | 'fr'
    | 'gl'
    | 'de'
    | 'el'
    | 'he'
    | 'hi'
    | 'hu'
    | 'is'
    | 'id'
    | 'it'
    | 'ja'
    | 'kr'
    | 'ku'
    | 'la'
    | 'lt'
    | 'mk'
    | 'no'
    | 'fa'
    | 'pl'
    | 'pt'
    | 'pt_br'
    | 'ro'
    | 'ru'
    | 'sr'
    | 'sk'
    | 'sl'
    | 'sp'
    | 'es'
    | 'sv'
    | 'se'
    | 'th'
    | 'tr'
    | 'ua'
    | 'uk'
    | 'vi'
    | 'zu';

  // 定義單個天氣條件的型別
  interface WeatherCondition {
    code: number;
    main: string;
    description: string;
    icon:
      | '01d'
      | '01n'
      | '02d'
      | '02n'
      | '03d'
      | '03n'
      | '04d'
      | '04n'
      | '09d'
      | '09n'
      | '10d'
      | '10n'
      | '11d'
      | '11n'
      | '13d'
      | '13n'
      | '50d'
      | '50n';
  }

  // Current weather API parameters
  interface GetCurrentWeatherParameters {
    lat: number;
    lon: number;
    units?: 'standard' | 'metric' | 'imperial';
    mode?: 'json' | 'xml';
    lang?: LanguageCode;
  }

  // Current weather API response
  interface GetCurrentWeatherResponse {
    coord: {
      lon: number;
      lat: number;
    };
    weather: WeatherCondition[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    clouds: {
      all: number;
    };
    rain: {
      '1h'?: number;
      '3h'?: number;
    };
    snow: {
      '1h'?: number;
      '3h'?: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }

  // 5 day weather forecast API parameters
  interface GetForecastParameters extends GetCurrentWeatherParameters {
    // A number of timestamps, which will be returned in the API response.
    cnt?: number;
  }

  // 5 day weather forecast API response
  interface GetForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: {
      // Time of data forecasted, unix, UTC
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: WeatherCondition[];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      // Probability of precipitation (from 0 to 1)
      pop: number;
      rain: {
        '3h': number;
      };
      snow: {
        '3h': number;
      };
      sys: {
        // Part of the day (n - night, d - day)
        pod: string;
      };
      // Time of data forecasted, ISO, UTC
      dt_txt: string;
    }[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  }

  // Geocoding API parameters
  interface GetCityInfoParameters {
    // City name, state code and country code divided by comma, use ISO 3166 country codes.
    q: string;
    // Number of the locations in the API response (up to 5 results can be returned in the API response)
    limit?: number;
  }

  // Geocoding API response
  type GetCityInfoResponse = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
  }[];

  // Reverse Geocoding API parameters
  interface GetCityInfoByCoordsParameters {
    lat: number;
    lon: number;
    limit?: number;
  }

  type LocalStorageMyCity = Pick<
    GetCityInfoResponse[0],
    'country' | 'lat' | 'lon' | 'name'
  > & { id: string };
}

export {};
