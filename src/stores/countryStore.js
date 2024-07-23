import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getWeather } from '@/api/locationApi';

export const useCountryStore = defineStore(
  'country',
  () => {
    const countryData = ref([]);

    const addCountryData = (country) => {
      countryData.value.push(country);
    };

    const removeCountryData = (id) => {
      const index = countryData.value.findIndex((country) => country.id === id);
      if (index !== -1) {
        countryData.value.splice(index, 1);
      }
    };

    const updateWeatherData = async () => {
      for (const country of countryData.value) {
        try {
          const resWeather = await getWeather(
            country.latitude,
            country.longitude
          );
          if (resWeather.status) {
            country.weather = resWeather.data;
          } else {
            console.error(`無法取得天氣資料 ${country.city}`);
          }
        } catch (error) {
          console.error(`取得天氣資料錯誤 ${country.city}`, error);
        }
      }
    };

    return {
      countryData,
      addCountryData,
      removeCountryData,
      updateWeatherData,
    };
  },
  {
    persist: true,
  }
);
