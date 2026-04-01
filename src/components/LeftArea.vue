<template>
  <div class="content-wrapper">

    <div class="content-wrapper-flex">

      <div class="content-wrapper__glass">
        <span class="glass-border"></span> 
        <span class="glass-border-light"></span>

        <div class="component-glass">
          <LiquidGlass
            :displacement-scale="5"
            :blur-amount="0"
            :saturation="100"
            :aberration-intensity="0"
            :elasticity="0"
            :corner-radius="40"
            class="my-glass"
          >
            <div class="glass-content">
              <RainEffect v-if="[63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(this.weather.current.weather_code)" />
              <div class="city">
                <h2>Москва</h2>
                <div class="current-date">
                  {{ getCurrentDate.week }}, {{ getCurrentDate.day }} {{ getCurrentDate.month }}
                </div>
              </div>
              <div class="temperature">

                <div class="temperature-current">

                  <div class="temperature-current-top">
                    <div class="temperature-value">{{ getCurrentWeather.temperature }}</div>
                    <div class="temperature-deg">
                      <div class="temperature-deg__value">{{getCurrentWeather.deg}}</div>
                    </div>
                  </div>

                  <div class="temperature-current-bottom">

                    <div class="type-weather-text">{{ getCurrentWeather.name }}</div>
                    <div class="temperature-difference">
                      <div class="temperature-difference-min">
                        <div class="temperature-difference-min__value">{{ getCurrentWeather.temperatureMin }}</div>
                        <div class="temperature-difference-min__deg">{{ getCurrentWeather.deg }}</div>
                      </div>
                      <div class="temperature-difference__slash">/</div>
                      <div class="temperature-difference-max">
                        <div class="temperature-difference-max__value">{{ getCurrentWeather.temperatureMax }}</div>
                        <div class="temperature-difference-max__deg">{{ getCurrentWeather.deg }}</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              <div class="info-weather-today">

                <div class="info-weather-today__hourly">
                  
                  <div class="weather-now">

                    <div class="weather-now-text"> 
                      <div class="weather-now-text__value"> Сейчас </div>
                    </div>

                    <div class="weather-now-icon">

                      <div class="weather-now__code">
                        <img :src="`/src/img/icons/${getCurrentWeather.icon}`" alt="icon">
                      </div>

                    </div>

                    <div class="weather-now-temp">
                      <div class="weather-now-temp__value">{{ getCurrentWeather.temperature }}</div>
                      <div class="weather-now-temp__deg">{{ getCurrentWeather.deg }}</div>
                    </div>

                  </div>

                  <div class="today-hourly">
                    <ul class="today-hourly__list">
                      <li class="today-hourly__item" v-for="(hourly) in getHourlyWeather" :key="hourly.id">
                        
                        <div class="today-hourly-time">
                          <div class="today-hourly-time__value">{{ hourly.time }}</div>
                        </div>

                        <div class="today-hourly-icon">
                          <div class="today-hourly__code">
                            <img :src="`/src/img/icons/${hourly.icon}`" alt="">
                          </div>
                        </div>

                        <div class="today-hourly-probability">
                          <div class="today-hourly-probability__value">{{ hourly.probability }}</div>
                          <div class="today-hourly-probability__percent">{{ hourly.percent }}</div>
                        </div>

                        <div class="today-hourly-temp">
                          <div class="today-hourly-temp__value">{{ hourly.temperature }}</div>
                          <div class="today-hourly-temp__deg">{{ getCurrentWeather.deg }}</div>
                        </div>
                        
                      </li>
                    </ul>
                  </div>

                </div>

                <div class="info-weather-today__other">

                  <div class="info-weather-today__other-top">

                    <div class="current-apparent-temperature">
                      <div class="current-apparent-temperature__name">Ощущается как</div>
                      <div class="current-apparent-temperature__value">{{ getCurrentWeather.apparentTemp }}°</div>
                    </div>

                    <div class="current-wind-speed">
                      <div class="current-wind-speed__name">Ветер</div>
                      <div class="current-wind-speed__value">{{ getCurrentWeather.windSpeed }}<span>м/с</span> </div>
                    </div>

                    <div class="current-relative-humidity">
                      <div class="current-relative-humidity__name">Влажность</div>
                      <div class="current-relative-humidity__value">{{ getCurrentWeather.humidity }}<span>%</span> </div>
                    </div>

                    <div class="current-pressure">
                      <div class="current-pressure__name">Давление</div>
                      <div class="current-pressure__value">{{ getCurrentWeather.pressure }}<span>мм рт. ст.</span> </div>
                    </div>

                  </div>

                  <div class="info-weather-today__other-bottom">

                    <div class="current-visibility">
                      <div class="current-visibility__name">Видимость</div>
                      <div class="current-visibility__value">{{ getCurrentWeather.visibility }}<span>м</span></div>
                    </div>

                    <div class="current-wind-gusts">
                      <div class="current-wind-gusts__name">Порывы ветра</div>
                      <div class="current-wind-gusts__value">{{ getCurrentWeather.windGusts }}<span>м/с</span></div>
                    </div>

                    <div class="current-uv-index">
                      <div class="current-uv-index__name">УФ-индекс</div>
                      <div class="current-uv-index__value">{{ getCurrentWeather.uvIndexMax }}</div>
                    </div>

                    <div class="solar-cycle">

                      <div class="solar-cycle__name">Восход / закат</div>
                      
                      <div class="solar-cycle__value">
                        <div class="sunrise">{{ getCurrentWeather.sunrise }}</div>
                        <div class="sunset">{{ getCurrentWeather.sunset }}</div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </LiquidGlass>
        </div>

      </div>

    </div>

  </div>
</template>


<script>

import { LiquidGlass } from '../../node_modules/@wxperia/liquid-glass-vue/dist/index.js'
import RainEffect from "@/components/RainEffect.vue"
import { store } from '../main.js'
import { WMO } from '../codesWMO.js';

export default {
  name: 'LeftArea',
  components: {
    LiquidGlass,
    RainEffect
  },

  data() {
    return {
      wmoCode: WMO
    }
  },

  methods: {},

  computed: {

    weather() {
      return store.$state.api.weather
    },

    getCurrentWeather() {

      // Округление и изменение формата даты

      const current = this.weather.current
      const date = new Date(current.time)
      const currentHour = date.toLocaleTimeString("ru-RU").slice(0, 5)

      const roundedCurrentDateTime = new Date(Math.round(date.getTime() / 3600000) * 3600000) // округление текущего времени до ближайшего часа

      const roundedCurrentLocaleDateTime = roundedCurrentDateTime.toLocaleString("ru-RU", {
        timeZone: 'Europe/Moscow',
      })


      const hourly  = this.weather.hourly

      const hourlyLocaleDateTime = [] // массив дат с измененным форматом

      for (let i = 0; i < hourly.time.length; i++) {
        const newDate = new Date(hourly.time[i])
        const newDateLocale = newDate.toLocaleString("ru-RU", {
          timeZone: 'Europe/Moscow',
        })

        hourlyLocaleDateTime.push(newDateLocale)

      }

      let currentVisibility = null // переменная со значением текущей видимости

      hourlyLocaleDateTime.forEach((item, index) => {

        if(roundedCurrentLocaleDateTime === item) {
          currentVisibility = this.weather.hourly.visibility[index]
        }

      })


      // Изменение формата даты для sunrise и sunset

      // Восход
      const sunriseTime = new Date(this.weather.daily.sunrise[0])
      const newSunriseTime = sunriseTime.toLocaleTimeString("ru-RU").slice(0, 5)


      // Закат

      const sunsetTime = new Date(this.weather.daily.sunset[0])
      const newSunsetTime = sunsetTime.toLocaleTimeString("ru-RU").slice(0, 5)



      const nowWeather = {
        time: this.weather.current.time, // дата и время
        temperature: Math.round(this.weather.current.temperature_2m), // температура текущая
        apparentTemp: Math.round(this.weather.current.apparent_temperature), // кажущаяся температура текущая
        weatherCode: this.weather.current.weather_code, // погодный код текущий
        humidity: this.weather.current.relative_humidity_2m, // относительная влажность
        pressure: Math.round(this.weather.current.surface_pressure / 1.33322), // давление в мм рт. ст.
        windSpeed: Math.round(this.weather.current.wind_speed_10m), // скорость ветра
        windGusts: Math.round(this.weather.current.wind_gusts_10m), // порывы ветра
        visibility: currentVisibility, // видимость
        sunrise: newSunriseTime, // восход
        sunset: newSunsetTime, // закат
        temperatureMin: Math.round(this.weather.daily.temperature_2m_min[0]), // минимальная температура
        temperatureMax: Math.round(this.weather.daily.temperature_2m_max[0]), // максимальная температура
        uvIndexMax: Math.round(this.weather.daily.uv_index_max[0]), // УФ-индекс максимальный на текущий день
        deg: this.weather.current_units.wind_direction_10m, // обозначение градуса
      }


      // Добавление в объект Иконки и Названия, которое будет соответствовать коду погоды (НОЧНЫЕ ИКОНКИ ПОКА НЕ УЧТЕНЫ)

      for (let key in this.wmoCode) {


        if(key == nowWeather.weatherCode) {

          const weather = this.wmoCode[key]

          if(currentHour >= nowWeather.sunrise && currentHour < nowWeather.sunset) {
            nowWeather["icon"] = weather.day.image
            nowWeather["name"] = weather.day.description
          } else {
            nowWeather["icon"] = weather.night.image
            nowWeather["name"] = weather.night.description
          }

        }

      }

      return nowWeather
    },

    getHourlyWeather() {
      const current = this.weather.current
      const hourly  = this.weather.hourly
      const hourlyTemp = this.weather.hourly.temperature_2m
      const weatherCode = this.weather.hourly.weather_code
      const precipitationProbability = this.weather.hourly.precipitation_probability
      const date = new Date(current.time)


      // Округление и изменение формата даты

      const roundedCurrentDateTime = new Date(Math.ceil(date.getTime() / 3600000) * 3600000) // округление текущего времени в большую сторону


      const roundedCurrentLocaleDateTime = roundedCurrentDateTime.toLocaleString("ru-RU", {
        timeZone: 'Europe/Moscow',

      })


      const hourlyLocaleDateTime = [] // массив дат с измененным форматом

      for (let i = 0; i < hourly.time.length; i++) {
        const newDate = new Date(hourly.time[i])
        const newDateLocale = newDate.toLocaleString("ru-RU", {
          timeZone: 'Europe/Moscow',
        })

        hourlyLocaleDateTime.push(newDateLocale)

      }


      // Массив объектов почасовой погоды

      const arrHourlyDateTime = []


      // Сравнение текущей даты (current.time) с датой в массиве (hourly.time), чтобы собрать объект для отображения почасовой погоды

      hourlyLocaleDateTime.forEach((item, index) => {

        if(roundedCurrentLocaleDateTime === item) {

          for(let i = index; i < index + 5; i++) {

            // Отображение времени без даты

            const newHourlyTime = new Date(hourly.time[i])
            const hourlyLocaleTime = newHourlyTime.toLocaleTimeString("ru-RU").slice(0, 5)


            // К значению "Date.now()" прибавление значения "i" (т.к. были случаи, когда id совпадал у нескольких объектов)

            const newId = Date.now() + i


            const objHourlyDateTime = {
              id: newId,
              time: hourlyLocaleTime,
              temperature: Math.round(hourlyTemp[i]), // Округление почасовой температуры
              code: weatherCode[i]

            }


            // Добавление в объект Иконки и Названия, которое будет соответствовать коду погоды

            for (let key in this.wmoCode) {

              if(key == objHourlyDateTime.code) {
              
                const weather = this.wmoCode[key]
                

                if([0, 1, 2, 3, 45, 48].includes(objHourlyDateTime.code)) {

                  if(objHourlyDateTime.time >= this.getCurrentWeather.sunrise && objHourlyDateTime.time < this.getCurrentWeather.sunset) {
                    objHourlyDateTime["icon"] = weather.day.image
                    objHourlyDateTime["name"] = weather.day.description
                  } else {
                    objHourlyDateTime["icon"] = weather.night.image
                    objHourlyDateTime["name"] = weather.night.description
                  }
                  
                } else {
                  
                  if(objHourlyDateTime.time >= this.getCurrentWeather.sunrise && objHourlyDateTime.time < this.getCurrentWeather.sunset) {
                    objHourlyDateTime["icon"] = weather.day.image
                    objHourlyDateTime["name"] = weather.day.description
                  } else {
                    objHourlyDateTime["icon"] = weather.night.image
                    objHourlyDateTime["name"] = weather.night.description
                  }
                  objHourlyDateTime["probability"] = precipitationProbability[i]
                  objHourlyDateTime["percent"] = "%"
                }

              }

            }

            // Добавление объектов в массив почасовой погоды
            arrHourlyDateTime.push(objHourlyDateTime)

          }

        }

      })
      
      return arrHourlyDateTime

    },

    getCurrentDate() {
      const currentDate = new Date(this.weather.current.time)

      const newCurrentDate = {}

      const optionsWeek = { weekday: "long" }
      const firstSymbolWeek = currentDate.toLocaleDateString("ru-RU", optionsWeek).charAt(0).toUpperCase()
      const otherSymbolWeek = currentDate.toLocaleDateString("ru-RU", optionsWeek).slice(1)
      const currentWeek = firstSymbolWeek + otherSymbolWeek

      const optionsDayMonth = {month: 'long', day: 'numeric'}
      const firstSymbolMonth = currentDate.toLocaleDateString("ru-RU", optionsDayMonth).charAt(3).toUpperCase()
      const otherSymbolMonth = currentDate.toLocaleDateString("ru-RU", optionsDayMonth).slice(4)
      const currentMonth = firstSymbolMonth + otherSymbolMonth

      const currentDay = currentDate.toLocaleDateString("ru-RU", optionsDayMonth).slice(0,2)

      newCurrentDate.week = currentWeek
      newCurrentDate.day = currentDay
      newCurrentDate.month = currentMonth

      return newCurrentDate
    }

  },

}

</script>



<style>

.content-wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 90%;
}

.content-wrapper-flex {
  height: 98%;
  width: 92%;
  display: flex;
  justify-content: center;

}

.content-wrapper__glass {
  position: relative;
  width: 90%;
  height: 100%;
}

.glass-border {

  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 40px;
  transform: translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1);
  transition: 0.2s ease-out;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.2;
  padding: 1.5px;
  mask: linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box exclude, linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px);
  box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 0px 0.5px inset, rgba(255, 255, 255, 0.25) 0px 1px 3px inset, rgba(0, 0, 0, 0.35) 0px 1px 4px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.12) 33%, rgba(255, 255, 255, 0.4) 66%, rgba(255, 255, 255, 0) 100%);

}

.glass-border-light {

  position: absolute;
  top: 49.9%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 40px;
  transform: translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1);
  transition: 0.2s ease-out;
  pointer-events: none;
  mix-blend-mode: overlay;
  padding: 1px;
  mask: linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box exclude, linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px);
  box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 0px 0.5px inset, rgba(255, 255, 255, 0.25) 0px 1px 3px inset, rgba(0, 0, 0, 0.35) 0px 1px 4px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.32) 33%, rgba(255, 255, 255, 0.6) 66%, rgba(255, 255, 255, 0) 100%);

}

.component-glass {
  width: 100%;
  height: 100%;
}

.my-glass {
  width: 100%;
  height: 100%;
}

.my-glass svg {
  width: 100%;
  height: 100%;
}

.glass {
  width: 100%;
  height: 100%;
}

.glass__warp {
  backdrop-filter: blur(4.5px) saturate(100%) !important;
}

.glass-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-shadow: none;
}

.city {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-shadow: none;
  height: 15%;
  width: 100%;
}

.city h2 {
  font-size: 2vw;
  margin-bottom: 1.2vw;
  color: #092124;
}

.current-date {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 1.545vw;
  color: #50778a;
}

.temperature {
  height: 40%;
  width: 100%;
}

.temperature-current {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.temperature-current-top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60%;
  width: 100%;
  color: #325368;
}

.temperature-value {
  font-size: 10.42vw;
}

.temperature-deg {
  display: flex;
  align-items: flex-start;
  font-size: 5.21vw;
  font-weight: 300;
  height: 65%;
}

.temperature-deg__value {
  font-stretch: condensed;
}

.temperature-current-bottom {
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  height: 40%;
  width: 100%;
  gap: 1.042vw;
}

.temperature-current-bottom::after {
  content: "";
  position: absolute;
  display: block;
  width: 94%;
  height: 0.053vw;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #50778a
  ;
}

.type-weather-text {
  font-size: 2.5vw;
  /* font-size: 2.865vw; */
  color:#0d2a32;
}

.temperature-difference {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 2.085vw;
  color: #0e2838;
}

.temperature-difference-min {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.temperature-difference-min__deg {
  font-size: 1.955vw;
  padding-top: 0.131vw;
}

.temperature-difference__slash {
  font-weight: 300;
  font-size: 70%;
  margin-right: 0.261vw;
}

.temperature-difference-max {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.temperature-difference-max__deg {
  font-size: 1.955vw;
  padding-top: 0.131vw;
}



.info-weather-today {
  display: flex;
  flex-direction: column;
  height: 45%;
}

.info-weather-today__hourly {
  display: flex;
  position: relative;
  width: 100%;
  height: 60%;
}

.info-weather-today__hourly::after {
  content: "";
  position: absolute;
  display: block;
  width: 94%;
  height: 0.053vw;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.weather-now {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100%;
  padding-left: 0.391vw;
  color: #fff;
}

.weather-now-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;
  width: 100%;
}

.weather-now-text__value {
  font-size: 1.303vw;
  color: #d8edf6;
}

.weather-now-icon {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50%;
  width: 100%;
}

.weather-now__code {
  height: 5.469vw;
  width: 5.469vw;
  padding-bottom: 0.912vw;
}

.weather-now__code img {
  height: 5.469vw;
  width: 5.469vw;
}

.weather-now-temp {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  height: 25%;
  width: 100%;
  color: #d8edf6;
}

.weather-now-temp__value {
  font-size: 1.98vw;
}

.weather-now-temp__deg {
  font-size: 1.303vw;
  padding-top: 0.131vw;
}

.today-hourly {
  width: 80%;
  height: 100%;
}

.today-hourly__list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding-right: 1.954vw;
  gap: 0.782vw;
}

.today-hourly__item {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.today-hourly-time {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25%;
  width: 100%;
  font-size: 1.042vw;
  color: #d8edf6;
}

.today-hourly-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35%;
  width: 100%;
}

.today-hourly__code {
  height: 4.428vw;
  width: 4.428vw;
}

.today-hourly__code img {
  height: 4.428vw;
  width: 4.428vw;
}

.today-hourly-temp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25%;
  width: 100%;
  color: #d8edf6;
}

.today-hourly-temp__value {
  font-size: 1.763vw;
  padding-bottom: 0.5vw;
}

.today-hourly-temp__deg {
  font-size: 1.563vw;
  padding-bottom: 0.5vw;
}

.today-hourly-probability {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15%;
  width: 100%;
  color: #92a8b2;
}

.today-hourly-probability__value {
  font-size: 0.886vw;
}

.today-hourly-probability__percent {
  font-size: 0.886vw;
}



.info-weather-today__other {
  width: 100%;
  height: 40%;
  color: #fff;
}


.info-weather-today__other-top {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.current-apparent-temperature {
  position: relative;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.652vw;
  color: #d8edf6;
}

.current-apparent-temperature::after {
  content: "";
  position: absolute;
  display: block;
  width: 93%;
  height: 0.015vw;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-apparent-temperature::before {
  content: "";
  position: absolute;
  display: block;
  height: 95%;
  width: 0.015vw;
  top: 50%;
  left: 113%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-apparent-temperature__name {
  font-size: 0.886vw;
}

.current-apparent-temperature__value {
  font-size: 1.407vw;
}

.current-wind-speed {
  position: relative;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.652vw;
  color: #d8edf6;
}

.current-wind-speed::after {
  content: "";
  position: absolute;
  display: block;
  width: 93%;
  height: 0.015vw;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-wind-speed::before {
  content: "";
  position: absolute;
  display: block;
  height: 95%;
  width: 0.015vw;
  top: 50%;
  left: 113%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-wind-speed__name {
  font-size: 0.886vw;
}

.current-wind-speed__value {
  font-size: 1.407vw; 
}

.current-wind-speed__value span {
  font-size: 1.1vw;
  padding-left: 0.25vw;
  color: #96a8b0c7;
}

.current-relative-humidity {
  position: relative;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.652vw;
  color: #d8edf6;
}

.current-relative-humidity::after {
  content: "";
  position: absolute;
  display: block;
  width: 93%;
  height: 0.015vw;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-relative-humidity::before {
  content: "";
  position: absolute;
  display: block;
  height: 95%;
  width: 0.015vw;
  top: 50%;
  left: 113%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-relative-humidity__name {
  font-size: 0.886vw;
}

.current-relative-humidity__value {
  font-size: 1.407vw;
}

.current-relative-humidity__value span {
  font-size: 1.1vw;
  padding-left: 0.25vw;
  color: #96a8b0c7;
}

.current-pressure {
  position: relative;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.652vw;
  color: #d8edf6;
}

.current-pressure::after {
  content: "";
  position: absolute;
  display: block;
  width: 95%;
  height: 0.015vw;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-pressure__name {
  font-size: 0.886vw;
}

.current-pressure__value {
  font-size: 1.407vw;
}

.current-pressure__value span {
  font-size: 1.0vw;
  padding-left: 0.1vw;
  color: #96a8b0c7;
}



.info-weather-today__other-bottom {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.current-visibility {
  position: relative;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.652vw;
  color: #d8edf6;
}

.current-visibility::before {
  content: "";
  position: absolute;
  display: block;
  height: 95%;
  width: 0.015vw;
  top: 50%;
  left: 113%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-visibility__name {
  font-size: 0.886vw;
}

.current-visibility__value {
  font-size: 1.407vw;
}

.current-visibility__value span {
  font-size: 1.1vw;
  padding-left: 0.25vw;
  color: #96a8b0c7;
}

.current-wind-gusts {
  position: relative;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.652vw;
  color: #d8edf6;
}

.current-wind-gusts::before {
  content: "";
  position: absolute;
  display: block;
  height: 95%;
  width: 0.015vw;
  top: 50%;
  left: 113%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-wind-gusts__name {
  font-size: 0.886vw;
}

.current-wind-gusts__value {
  font-size: 1.407vw;
}

.current-wind-gusts__value span {
  font-size: 1.1vw;
  padding-left: 0.25vw;
  color: #96a8b0c7;
}

.current-uv-index {
  position: relative;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.652vw;
  color: #d8edf6;
}

.current-uv-index::before {
  content: "";
  position: absolute;
  display: block;
  height: 95%;
  width: 0.015vw;
  top: 50%;
  left: 113%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.current-uv-index__name {
  font-size: 0.886vw;
}

.current-uv-index__value {
  font-size: 1.407vw;
}

.solar-cycle {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.652vw;
  color: #d8edf6;
}

.solar-cycle__name {
  font-size: 0.886vw;
}

.solar-cycle__value {
  display: flex;
  align-items: center;
  gap: 0.261vw;
  font-size: 1.198vw;
}

.sunrise {
  color: #e77e7e99;
}

.sunset {
  color: #92a8b2c9;
  font-size: 1.1vw;
}

</style>
