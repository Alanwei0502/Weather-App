import { buildRequestUrl } from '../utils';

export default class OpenWeather {
  private static key = import.meta.env.VITE_WEATHER_API_KEY;
  private static url = import.meta.env.VITE_WEATHER_API_URL;

  public static async getCityInfo(
    params: GetCityInfoParameters
  ): Promise<GetCityInfoResponse> {
    params.limit ?? (params.limit = 1);

    const url = buildRequestUrl(`${OpenWeather.url}/geo/1.0/direct`, {
      ...params,
      appid: OpenWeather.key,
    });
    const res = await fetch(url);
    return res.json();
  }

  public static async getCityInfoByCoords(
    params: GetCityInfoByCoordsParameters
  ): Promise<GetCityInfoResponse> {
    params.limit ?? (params.limit = 1);

    const url = buildRequestUrl(`${OpenWeather.url}/geo/1.0/reverse`, {
      ...params,
      appid: OpenWeather.key,
    });
    const res = await fetch(url);
    return res.json();
  }

  public static async getCurrentWeather(
    params: GetCurrentWeatherParameters
  ): Promise<GetCurrentWeatherResponse> {
    params.units ?? (params.units = 'metric');

    const url = buildRequestUrl(`${OpenWeather.url}/data/2.5/weather`, {
      ...params,
      appid: OpenWeather.key,
    });
    const res = await fetch(url);
    return res.json();
  }

  public static async getForecast(
    params: GetForecastParameters
  ): Promise<GetForecastResponse> {
    params.units ?? (params.units = 'metric');

    const url = buildRequestUrl(`${OpenWeather.url}/data/2.5/forecast`, {
      ...params,
      appid: OpenWeather.key,
    });
    const res = await fetch(url);
    return res.json();
  }
}
