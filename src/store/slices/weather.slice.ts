import { createSlice, Slice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import OpenWeather from '../../api/openWeather.api';
import { createAppAsyncThunk } from '../../hooks';

export interface IWeatherAppState {
  city?: GetCityInfoResponse[0];
  currentWeather?: GetCurrentWeatherResponse;
  forecast?: GetForecastResponse;
  backgroundColor: 'day' | 'night';
  favoriteCities: LocalStorageMyCity[];
  isMenuOpen: boolean;
  isLoading: boolean;
}

export const sliceName = 'weather';

const initialState: IWeatherAppState = {
  city: undefined,
  currentWeather: undefined,
  forecast: undefined,
  backgroundColor: 'day',
  favoriteCities: JSON.parse(localStorage?.getItem('my_cities') ?? '[]'),
  isMenuOpen: false,
  isLoading: false,
};

export const getForecast = createAppAsyncThunk(
  `${sliceName}/getForecast`,
  async ({ lat, lon }: { lat: number; lon: number }, thunkApi) => {
    try {
      const forecast = await OpenWeather.getForecast({ lat, lon });
      return forecast;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCurrentWeather = createAppAsyncThunk(
  `${sliceName}/getCurrentWeather`,
  async ({ lat, lon }: { lat: number; lon: number }, thunkApi) => {
    try {
      const currentWeather = await OpenWeather.getCurrentWeather({ lat, lon });
      return currentWeather;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const weatherSlice: Slice<IWeatherAppState> = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<GetCityInfoResponse[0]>) => {
      state.city = action.payload;
    },
    setForecast: (state, action: PayloadAction<GetForecastResponse>) => {
      state.forecast = action.payload;
    },
    setBackgroundColor: (
      state,
      action: PayloadAction<IWeatherAppState['backgroundColor']>
    ) => {
      state.backgroundColor = action.payload;
    },
    setFavoriteCities: (
      state,
      action: PayloadAction<'add' | 'delete' | 'update'>
    ) => {
      if (!state.city) return;

      const storageFavoriteCities = JSON.parse(
        localStorage?.getItem('my_cities') ?? '[]'
      );

      let newFavoriteCities: LocalStorageMyCity[] = [];

      if (action.payload === 'add') {
        const newCity = {
          id: state.city.name,
          name: state.city.name,
          country: state.city.country,
          lat: state.city.lat,
          lon: state.city.lon,
        };
        newFavoriteCities = [...storageFavoriteCities, newCity];
      }

      if (action.payload === 'delete') {
        newFavoriteCities = storageFavoriteCities.filter(
          (i: LocalStorageMyCity) => i.name !== state.city?.name
        );
      }

      if (action.payload === 'update') {
        newFavoriteCities = storageFavoriteCities;
      }

      localStorage.setItem('my_cities', JSON.stringify(newFavoriteCities));
      state.favoriteCities = newFavoriteCities;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getForecast.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.forecast = action.payload;
        state.isLoading = false;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.forecast = initialState.forecast;
        state.isLoading = false;
        console.error(action.error);
      })
      .addCase(getCurrentWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        const currentWeather = action.payload;
        const cityTime =
          new Date(
            (currentWeather.dt + currentWeather.timezone) * 1000
          ).getUTCHours() + 1;
        state.backgroundColor =
          cityTime >= 6 && cityTime < 18 ? 'day' : 'night';
        state.currentWeather = currentWeather;
        state.isLoading = false;
      })
      .addCase(getCurrentWeather.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error);
      });
  },
});

export const {
  setCity,
  setForecast,
  setBackgroundColor,
  setFavoriteCities,
  setIsLoading,
  toggleMenu,
} = weatherSlice.actions;
