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
                <div class="week-weather">
                    <div class="week-weather-name">
                      <div class="week-weather-name__text"> <h2>Неделя</h2> </div>
                    </div>
                    <ul class="week-weather-items">
                      <li class="week-weather-item" v-for="(daily) in getDailyWeather" :key="daily.id">
                        <div class="item-day">{{ daily.day }}</div>
                        <div class="item-code">
                          <img :src="`/src/img/icons/${daily.icon}`" alt="icon">
                        </div>
                        <div class="item-probability"> {{ daily.probability }}<span>%</span> </div>
                        <div class="item-temperature">
                          <div class="item-temperature__min">{{ daily.temperatureMin }}°</div>
                          <div class="item-temperature__max">{{ daily.temperatureMax }}°</div>
                        </div>
                        <div class="progress-bar">
                          <div class="progress-bar-line">
                            <div class="sun-line" :style="{width: `${daily.lengthLine}%`, left: `${daily.startLength}%`}"></div>
                            <img src="../img/icons/sunrise.svg" class="icon-sunrise" alt="Рассвет" :style="{left: `${daily.startLength}%`}">
                            <img src="../img/icons/sunset.svg" class="icon-sunset" alt="Закат" :style="{left: `${daily.endLength}%`}">
                            <div class="time-sunrise" :style="{left: `${daily.startLength}%`}">{{ daily.sunrise }}</div>
                            <div class="time-sunset" :style="{left: `${daily.endLength}%`}">{{ daily.sunset }}</div>
                            <div class="current-circle" :style="{left: `${daily.currentCircle}%`}"></div>
                          </div>
                        </div>
                      </li>
                    </ul>
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
import { store } from '../main.js'
import { WMO } from '../codesWMO.js';

export default {
  name: 'LeftArea',
  components: {
    LiquidGlass
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

    getDailyWeather() {

      const currentDateTime = this.weather.current.time
      const dailyTime = this.weather.daily.time
      const weatherCode = this.weather.daily.weather_code
      const probability = this.weather.daily.precipitation_probability_max
      const tempMin = this.weather.daily.temperature_2m_min
      const tempMax = this.weather.daily.temperature_2m_max
      const sunrise = this.weather.daily.sunrise
      const sunset = this.weather.daily.sunset
      

      const arrDailyWeather = []

      dailyTime.forEach((item, index) => {

        // Отображение сокращенного наименования дня недели в верхнем регистре 

        const newDailyTime = new Date(dailyTime[index])
        const options = { weekday: "short" }
        const dayName = newDailyTime.toLocaleDateString("ru-RU", options).toUpperCase()



        // Изменение формата даты sunrise и sunset, а также перевод времени в минуты


        // Восход
        const sunriseTime = new Date(sunrise[index])
        const newSunriseTime = sunriseTime.toLocaleTimeString("ru-RU").slice(0, 5)

        // Перевод времени восхода в минуты
        const [sunriseHours, sunriseMinutes] = newSunriseTime.split(':').map(Number);
        const sunriseTotalMinutes = (sunriseHours * 60) + sunriseMinutes;


        // Закат

        const sunsetTime = new Date(sunset[index])
        const newSunsetTime = sunsetTime.toLocaleTimeString("ru-RU").slice(0, 5)

        // Перевод времени заката в минуты

        const [sunsetHours, sunsetMinutes] = newSunsetTime.split(':').map(Number);
        const sunsetTotalMinutes = (sunsetHours * 60) + sunsetMinutes;


        // Расчет длины полосы рассвета / заката

        const calcSunrise = (sunriseTotalMinutes * 100) / 1440
        const calcSunset = (sunsetTotalMinutes * 100) / 1440
        const lengthLine = calcSunset - calcSunrise


        // Позиционирование круга для отображения текущего времени внутри progress-bar

        const currentTime = new Date(currentDateTime)
        const newCurrentTime = currentTime.toLocaleTimeString("ru-RU").slice(0, 5)

        // Перевод текущего времени в минуты

        const [currentHours, currentMinutes] = newCurrentTime.split(':').map(Number);
        const currentTotalMinutes = (currentHours * 60) + currentMinutes;

        // Расчет позиционирования точки внутри progress-bar

        const calcCurrentTime = (currentTotalMinutes * 100) / 1440


        // К значению "Date.now()" прибавление значения "index" (т.к. были случаи, когда id совпадал у нескольких объектов)

        const newId = Date.now() + index


        const objDailyWeather = {
          id: newId,
          day: dayName,
          code: weatherCode[index],
          probability: probability[index],
          temperatureMin: Math.round(tempMin[index]),
          temperatureMax: Math.round(tempMax[index]),
          sunrise: newSunriseTime,
          sunset: newSunsetTime,
          lengthLine: lengthLine,
          startLength: calcSunrise,
          endLength: calcSunset,
          currentCircle: calcCurrentTime
        }


        // Добавление в объект Иконки и Названия, которое будет соответствовать коду погоды

        for (let key in this.wmoCode) {

          if(key == objDailyWeather.code) {

            const weather = this.wmoCode[key]
                
            objDailyWeather["icon"] = weather.day.image
            objDailyWeather["name"] = weather.day.description

          }

        }
        
        arrDailyWeather.push(objDailyWeather)

      })

      return arrDailyWeather

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



.week-weather {
  height: 100%;
  width: 95%;
  padding-left: 5%;
}

.week-weather-name {
  height: 10%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  text-shadow: none;
  color: #092124;
}

.week-weather-name__text h2 {
  font-size: 2vw;
  margin-bottom: 0.6vw;
}

.week-weather-items {
  height: 90%;
  width: 100%;
}

.week-weather-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 14%;
}

.week-weather-item:not(:last-child)::after {
  content: "";
  position: absolute;
  display: block;
  width: 98%;
  height: 0.015vw;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #50778a;
}

.item-day {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 8%;
  font-size: 1.963vw;
  color: #011725c7;
  text-shadow: 0.3px 0.3px 0px #0b497178;
}

.item-code {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 20%;
}

.item-code img {
  height: 60%;
  width: 60%;
}

.item-probability {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 8%;
  font-size: 1.463vw;
  color: #003348;
  text-shadow: 0.3px 0.3px 0px #0b4971;
}

.item-probability span {
  font-size: 1.363vw;
}

.item-temperature {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 27%;
  font-size: 1.463vw;
}

.item-temperature__min {
  color: #ababab;
  text-shadow: 0.5px 1px 1px #000000;
}

.item-temperature__max {
  color: #011725c7;
  text-shadow: 0.3px 0.3px 0px #0b4971;
}

.progress-bar {
  height: 100%;
  width: 37%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.progress-bar-line {
  position: relative;
  display: flex;
  justify-content: center;
  height: 10%;
  width: 95%;
  background: linear-gradient(90deg, rgba(58, 80, 180, 1) 0%);
  border-radius: 55px;
}

.sun-line {
  background: linear-gradient(90deg, rgba(58, 80, 180, 1) 0%, rgba(242, 104, 104, 1) 5%, rgba(255, 112, 112, 1) 8%, rgba(252, 176, 69, 0.94) 24%, rgba(255, 141, 84, 1) 86%, rgba(255, 84, 84, 1) 96%, rgba(58, 80, 180, 1) 100%);
  position: absolute;
  height: 100%;
}

.icon-sunrise {
  position: absolute;
  width: 1.5vw;
  bottom: 100%;
  transform: translateX(-50%);
}

.icon-sunset {
  position: absolute;
  width: 1.5vw;
  bottom: 100%;
  transform: translateX(-50%);
}

.time-sunrise {
  position: absolute;
  top: 140%;
  transform: translateX(-50%);
  font-size: 0.9vw;
  color: #c08282;
  text-shadow: 0.3px 0.3px 0px #000000;
}

.time-sunset {
  position: absolute;
  top: 140%;
  transform: translateX(-50%);
  font-size: 0.9vw;
  color: #6b82aa;
  font-size: 0.85vw;
  text-shadow: 0.3px 0.3px 0px #000000;
}

ul:first-of-type li:first-child div .current-circle {
  position: absolute;
  height: 100%;
  width: 0.95vh;
  border-radius: 50%;
  background-color: #fff;
}

</style>