<template>
  <div class="main-weather" v-if="traffic">
    <div class="header-parent">
      <div class="header">
        <div class="header-child">
          <span class="glass-border__header"></span>
          <span class="glass-border-light__header"></span>

          <LiquidGlass :corner-radius="40" class="header-my-glass">
            <div class="header-liquid-glass">
              <div class="sp-weather">
                <div class="sp-weather__logo">
                  <img src="/src/img/logo/SP_Weather.svg" alt="SP" />
                </div>
              </div>

              <div class="current-time">
                <div class="current-time__value">{{ changeFormatTime }}</div>
              </div>

              <div class="traffic-congestion">
                <div class="traffic-congestion__now">
                  <div class="traffic-congestion__now__name">Дорожная ситуация:</div>

                  <div class="traffic-light">
                    <div class="traffic-light-child">
                      <div class="traffic-light__icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.25 12c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10z"
                            :style="{ fill: `${changeColorTrafficLight}` }"

                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.25 12c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10zm18.333 0a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0z"
                            fill="#4D4D4D"
                          />
                          <path
                            d="M9.75 2h2.5c5.514 0 10 4.486 10 10a5.605 5.605 0 0 1-3.976-1.65c-1.018-1.018-1.68-2.104-3.22-3.906C13.694 4.857 11.818 3.25 9.75 3.25c-4.136 0-7.5 3.926-7.5 8.75C1.456 11.059 1 10.005 1 8.875 1 5.085 3.547 2 9.75 2z"
                            fill="#4D4D4D"
                          />
                        </svg>
                      </div>

                      <div class="traffic-ligh__text">{{ traffic.traffic_score.score }}</div>
                    </div>
                  </div>
                  <div class="average-speed">
                    <div class="direct-speed">

                      <svg
                        class="icon IconDirectSpeedDesktop icon_disabled"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 15 16"
                        fill="none"
                      >
                        <path
                          d="M2.60547 2.55156C3.63134 1.72407 4.86999 1.20302 6.1789 1.04836C7.48781 0.893705 8.81379 1.11172 10.0043 1.67733C11.1947 2.24294 12.2014 3.13316 12.9083 4.24556C13.6152 5.35796 13.9937 6.64733 14.0002 7.96533C14.0067 9.28333 13.641 10.5764 12.9452 11.6957C12.2493 12.8151 11.2516 13.7152 10.0668 14.2926C8.88193 14.87 7.55818 15.1011 6.24781 14.9594C4.93743 14.8178 3.69368 14.309 2.65966 13.4917"
                          stroke="#325368"
                        ></path>
                        <path
                          d="M9.86687 8.59417L8.04869 10.4123C7.98512 10.4759 7.90413 10.5192 7.81595 10.5367C7.72778 10.5543 7.63638 10.5453 7.55332 10.5109C7.47026 10.4765 7.39927 10.4182 7.34933 10.3435C7.29938 10.2687 7.27272 10.1808 7.27272 10.0909V8.72728H0.454545C0.333992 8.72728 0.218377 8.67939 0.133133 8.59415C0.0478895 8.5089 0 8.39329 0 8.27274C0 8.15218 0.0478895 8.03657 0.133133 7.95132C0.218377 7.86608 0.333992 7.81819 0.454545 7.81819H7.27272V6.45456C7.27272 6.36466 7.29938 6.27677 7.34933 6.20202C7.39927 6.12727 7.47026 6.06901 7.55332 6.0346C7.63638 6.0002 7.72778 5.9912 7.81595 6.00873C7.90413 6.02627 7.98512 6.06956 8.04869 6.13312L9.86687 7.9513C9.95211 8.03656 10 8.15218 10 8.27274C10 8.39329 9.95211 8.50891 9.86687 8.59417Z"
                          fill="#325368"
                        ></path>
                      </svg>

                      <div class="direct-speed__text">
                        {{ traffic.traffic_speed.direct_speed }} км/ч
                      </div>

                    </div>

                    <div class="reverse-speed">

                      <svg
                        class="icon IconReverseSpeedDesktop icon_disabled"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M12.3945 2.55156C11.3687 1.72407 10.13 1.20302 8.8211 1.04836C7.51219 0.893705 6.18621 1.11172 4.99573 1.67733C3.80525 2.24294 2.79864 3.13316 2.09173 4.24556C1.38482 5.35796 1.00632 6.64733 0.99979 7.96533C0.993262 9.28333 1.35897 10.5764 2.05483 11.6957C2.75069 12.8151 3.74843 13.7152 4.93325 14.2926C6.11807 14.87 7.44182 15.1011 8.75219 14.9594C10.0626 14.8178 11.3063 14.309 12.3403 13.4917"
                          stroke="#325368"
                        ></path>
                        <path
                          d="M14.8669 8.59417L13.0487 10.4123C12.9851 10.4759 12.9041 10.5192 12.816 10.5367C12.7278 10.5543 12.6364 10.5453 12.5533 10.5109C12.4703 10.4765 12.3993 10.4182 12.3493 10.3435C12.2994 10.2687 12.2727 10.1808 12.2727 10.0909V8.72728H5.45454C5.33399 8.72728 5.21838 8.67939 5.13313 8.59415C5.04789 8.5089 5 8.39329 5 8.27274C5 8.15218 5.04789 8.03657 5.13313 7.95132C5.21838 7.86608 5.33399 7.81819 5.45454 7.81819H12.2727V6.45456C12.2727 6.36466 12.2994 6.27677 12.3493 6.20202C12.3993 6.12727 12.4703 6.06901 12.5533 6.0346C12.6364 6.0002 12.7278 5.9912 12.816 6.00873C12.9041 6.02627 12.9851 6.06956 13.0487 6.13312L14.8669 7.9513C14.9521 8.03656 15 8.15218 15 8.27274C15 8.39329 14.9521 8.50891 14.8669 8.59417Z"
                          fill="#325368"
                        ></path>
                      </svg>

                      <div class="reverse-speed__text">
                        {{ traffic.traffic_speed.reverse_speed }} км/ч
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

    <div class="main-layout">
      <div class="left-area"><LeftArea /></div>
      <div class="right-area"><RightArea /></div>
    </div>
  </div>
</template>

<script>
import { LiquidGlass } from '../../node_modules/@wxperia/liquid-glass-vue/dist/index.js'
import { store } from '../main.js'

import LeftArea from '@/components/LeftArea.vue'
import RightArea from '@/components/RightArea.vue'

export default {
  name: 'Weather',
  components: {
    LeftArea,
    RightArea,
    LiquidGlass,
  },

  data() {
    return {
      currentTime: new Date(),
      timer: null,
      intervalWeather: null
    }
  },

  created() {
    this.initData()
  },

  mounted() {

    this.timer = setInterval(() => {
      this.currentTime = new Date()
    }, 1000);

  },

  beforeUnmount() {
    this.clearInterval(this.timer)

    this.clearInterval(this.intervalWeather)
  },

  methods: {
    async initData(){
      await store.loadData()
    
      this.intervalFetchWeather()

    },

    intervalFetchWeather() {

      this.intervalWeather = setInterval(() => {
        console.log("8 минут")
        store.loadData()
      }, 8 * 60 * 1000)

    },

  },

  computed: {
    
    traffic() {
      return store.$state.api.congestion
    },

    changeColorTrafficLight() {
      if(this.traffic.traffic_score.score == null) {
        return "grey"
      } else if(0 <= this.traffic.traffic_score.score && this.traffic.traffic_score.score <= 4) {
        return "green"
      } else if(5 <= this.traffic.traffic_score.score && this.traffic.traffic_score.score <= 6) {
        return "#ffc400"
      } else if(this.traffic.traffic_score.score >= 7 && this.traffic.traffic_score.score <= 10) {
        return "red"
      } else return "grey"

    },

    changeFormatTime() {
      const hours = this.currentTime.getHours().toString().padStart(2, "0")
      const minutes = this.currentTime.getMinutes().toString().padStart(2, "0")
      const seconds = this.currentTime.getSeconds().toString().padStart(2, "0")

      return `${hours}:${minutes}:${seconds}`
    }
  },
}
</script>

<style>
.main-weather {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  background-image: url(/src/img/elbrus.png);
  background-size: cover;
  background-repeat: round;

}

.header-parent {
  display: flex;
  height: 10%;
  width: 100%;
  justify-content: center;
  margin-top: 0.5%;
  margin-bottom: 1.5%;
}

.header {
  display: flex;
  height: 100%;
  width: 92%;
}

.header-child {
  position: relative;
  height: 100%;
  width: 100%;
}

.glass-border__header {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 2.44vw;
  transform: translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1);
  transition: 0.2s ease-out;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.2;
  padding: 0.074vw;
  mask:
    linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box exclude,
    linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px);
  box-shadow:
    rgba(255, 255, 255, 0.5) 0px 0px 0px 0.5px inset,
    rgba(255, 255, 255, 0.25) 0px 1px 3px inset,
    rgba(0, 0, 0, 0.35) 0px 1px 4px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.12) 33%,
    rgba(255, 255, 255, 0.4) 66%,
    rgba(255, 255, 255, 0) 100%
  );
}

.glass-border-light__header {
  position: absolute;
  top: 49.7%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 1.44vw;
  transform: translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1);
  transition: 0.2s ease-out;
  pointer-events: none;
  mix-blend-mode: overlay;
  padding: 0.049vw;
  mask:
    linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px) content-box exclude,
    linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 0px);
  box-shadow:
    rgba(255, 255, 255, 0.5) 0px 0px 0px 0.5px inset,
    rgba(255, 255, 255, 0.25) 0px 1px 3px inset,
    rgba(0, 0, 0, 0.35) 0px 1px 4px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.32) 33%,
    rgba(255, 255, 255, 0.6) 66%,
    rgba(255, 255, 255, 0) 100%
  );
}

.header-my-glass {
  height: 100%;
  width: 100%;
}

.header-my-glass .glass {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 15px !important;
  border-radius: 1.042vw !important;
}

.header-liquid-glass {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}

.sp-weather {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 20%;
  margin-left: 0.7%;
}

.sp-weather__logo {
  height: 100%;
  width: 80%;
}

.sp-weather__logo img {
  width: 100%;
  height: 100%;
}

.current-time {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 40%;
}

.current-time__value {
  width: 14.842vw;
  font-size: 2.3vw;
  font-weight: bold;
  font-family: monospace;
  color: #325368;
  text-shadow: none;
}

.traffic-congestion {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 40%;
}

.traffic-congestion__now {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

.traffic-congestion__now__name {
  width: 28%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.042vw;
  text-shadow: none;
  color: #15404c;
}

.traffic-light {
  height: 100%;
  width: 12%;
  display: flex;
  align-items: center;
}

.traffic-light-child {
  position: relative;
  height: 100%;
  width: 100%;
}

.traffic-light__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.traffic-light__icon svg {
  width: 3.375vw;
  height: 3.375vw;
}

.traffic-ligh__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.303vw;
  color: #fff;
  text-shadow: none;
}

.average-speed {
  display: flex;
  width: 60%;
  height: 100%;
}

.direct-speed {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 7%;
  height: 100%;
  width: 50%;
}

.direct-speed svg {
  height: 2.813vw;
  width: 2.813vw;
}

.direct-speed__text {
  font-size: 1.303vw;
  text-shadow: none;
  color: #0e3243;
}

.reverse-speed {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 50%;
  column-gap: 7%;
}

.reverse-speed svg {
  height: 2.813vw;
  width: 2.813vw;
}

.reverse-speed__text {
  font-size: 1.303vw;
  text-shadow: none;
  color: #0e3243;
}

.main-layout {
  display: flex;
  height: 90%;
  width: 100%;
}

.left-area {
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 50%;
}

.right-area {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  width: 50%;
}

</style>