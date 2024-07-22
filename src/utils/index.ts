import Day from '../assets/day.svg';
import Night from '../assets/night.svg';
import CloudyDay1 from '../assets/cloudy-day-1.svg';
import CloudyDay2 from '../assets/cloudy-day-2.svg';
import CloudyDay3 from '../assets/cloudy-day-3.svg';
import CloudyNight1 from '../assets/cloudy-night-1.svg';
import CloudyNight2 from '../assets/cloudy-night-2.svg';
import CloudyNight3 from '../assets/cloudy-night-3.svg';
import Cloudy from '../assets/cloudy.svg';
import Rainy from '../assets/rainy.svg';
import RainyDay from '../assets/rainy-day.svg';
import RainyNight from '../assets/rainy-night.svg';
import SnowyDay from '../assets/snowy-day.svg';
import SnowyNight from '../assets/snowy-night.svg';
import Thunder from '../assets/thunder.svg';

export const weatherIcon: { [key in WeatherCondition['icon']]: string } = {
  '01d': Day,
  '01n': Night,
  '02d': CloudyDay1,
  '02n': CloudyNight1,
  '03d': CloudyDay2,
  '03n': CloudyNight2,
  '04d': CloudyDay3,
  '04n': CloudyNight3,
  '09d': Rainy,
  '09n': Rainy,
  '10d': RainyDay,
  '10n': RainyNight,
  '11d': Thunder,
  '11n': Thunder,
  '13d': SnowyDay,
  '13n': SnowyNight,
  '50d': Cloudy,
  '50n': Cloudy,
};

/**
 * 建立 URL
 * @param baseUrl 基本 URL
 * @param params 查詢參數
 * @returns 完整的 URL
 * @example
 * const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
 * const params = {
 *  q: 'London',
 *  appid: 'your_api_key',
 *  units: 'metric',
 * };
 * const requestUrl = buildRequestUrl(baseUrl, params);
 * console.log(requestUrl);
 * // https://api.openweathermap.org/data/2.5/weather?q=London&appid=your_api_key&units=metric
 */
export function buildRequestUrl(
  baseUrl: string,
  params: Record<string, unknown>
): string {
  const url = new URL(baseUrl);
  const searchParams = new URLSearchParams(url.search);

  for (const [key, value] of Object.entries(params)) {
    value && searchParams.set(key, `${value}`);
  }

  url.search = searchParams.toString();
  return url.toString();
}
