import { defineStore } from 'pinia'

export const useRootStore = defineStore('store', {

  state: () => ({
    api: {}
  }),

  actions: {

    async loadData() {
      try {
        const res = await fetch('http://localhost:3000/api');
        this.api = await res.json();
        console.log('Актуальные данные:', this.api);
      } catch (e) {
        console.error('Ошибка:', e);
      } 
    }

  }
 
})


// Данный запрос валидный
// https://api.open-meteo.com/v1/forecast?latitude=55.745951&longitude=37.663497&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,uv_index_clear_sky_max,uv_index_max,weather_code,precipitation_hours,precipitation_probability_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,surface_pressure,visibility,wind_speed_10m,wind_gusts_10m,wind_direction_10m,cloud_cover,weather_code&models=best_match&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=Europe%2FMoscow&wind_speed_unit=ms