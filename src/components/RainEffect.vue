<template>
  <div class="rain-wrapper">
    <div class="rain front-row" ref="frontRain"></div>
    <div class="rain back-row" ref="backRain"></div>

    <!-- <div class="toggles">
      <div
        class="splat-toggle toggle"
        :class="{ active: splatActive }"
        @click="toggleSplat"
      >
        SPLAT
      </div>

      <div
        class="back-row-toggle toggle"
        :class="{ active: backRowActive }"
        @click="toggleBackRow"
      >
        BACK<br />ROW
      </div>

      <div
        class="single-toggle toggle"
        :class="{ active: singleActive }"
        @click="toggleSingle"
      >
        SINGLE
      </div>
    </div> -->

  </div>
</template>

<script>
export default {
  name: "RainEffect",

  data() {
    return {
      splatActive: true,
      backRowActive: true,
      singleActive: false
    };
  },

  mounted() {
    document.body.classList.add("splat-toggle", "back-row-toggle");
    this.makeItRain();
  },

  methods: {
    makeItRain() {
      const front = this.$refs.frontRain;
      const back = this.$refs.backRain;

      front.innerHTML = "";
      back.innerHTML = "";

      let increment = 0;
      let drops = "";
      let backDrops = "";

      while (increment < 100) {
        const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
        const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);

        increment += randoFiver;

        drops += `
          <div class="drop" style="left:${increment}%; bottom:${randoFiver + randoFiver - 1 + 100}%;
          animation-delay:0.${randoHundo}s; animation-duration:0.5${randoHundo}s;">
            <div class="stem" style="animation-delay:0.${randoHundo}s; animation-duration:0.5${randoHundo}s;"></div>
            <div class="splat" style="animation-delay:0.${randoHundo}s; animation-duration:0.5${randoHundo}s;"></div>
          </div>
        `;

        backDrops += `
          <div class="drop" style="right:${increment}%; bottom:${randoFiver + randoFiver - 1 + 100}%;
          animation-delay:0.${randoHundo}s; animation-duration:0.5${randoHundo}s;">
            <div class="stem" style="animation-delay:0.${randoHundo}s; animation-duration:0.5${randoHundo}s;"></div>
            <div class="splat" style="animation-delay:0.${randoHundo}s; animation-duration:0.5${randoHundo}s;"></div>
          </div>
        `;
      }

      front.insertAdjacentHTML("beforeend", drops);
      back.insertAdjacentHTML("beforeend", backDrops);
    },

    // toggleSplat() {
    //   this.splatActive = !this.splatActive;
    //   document.body.classList.toggle("splat-toggle");
    //   this.makeItRain();
    // },

    // toggleBackRow() {
    //   this.backRowActive = !this.backRowActive;
    //   document.body.classList.toggle("back-row-toggle");
    //   this.makeItRain();
    // },

    // toggleSingle() {
    //   this.singleActive = !this.singleActive;
    //   document.body.classList.toggle("single-toggle");
    //   this.makeItRain();
    // }
  }
};
</script>

<style>
.rain-wrapper {
  z-index: -1;
}

.rain {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.rain.back-row {
  display: none;
  z-index: 1;
  bottom: 60px;
  opacity: 0.5;
}

body.back-row-toggle .rain.back-row {
  display: block;
}

.drop {
  position: absolute;
  bottom: 100%;
  width: 15px;
  height: 120px;
  pointer-events: none;
  animation: drop 0.5s linear infinite;
}

@keyframes drop {
  0% {
    transform: translateY(0vh);
  }
  75% {
    transform: translateY(90vh);
  }
  100% {
    transform: translateY(90vh);
  }
}

.stem {
  /* width: 1px; */
  width: 0.15vw;
  height: 60%;
  margin-left: 7px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.25));
  animation: stem 0.5s linear infinite;
}

@keyframes stem {
  0% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.splat {
  /* width: 15px; */
  width: 0.72vw;
  /* height: 10px; */
  height: 0.48vw;
  /* border-top: 2px dotted rgba(255, 255, 255, 0.5); */
  border-top: 0.12vw dotted rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  opacity: 1;
  transform: scale(0);
  animation: splat 0.5s linear infinite;
  display: none;
}

body.splat-toggle .splat {
  display: block;
}

@keyframes splat {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  80% {
    opacity: 1;
    transform: scale(0);
  }
  90% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

/* .toggles {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

.toggle {
  position: absolute;
  left: 20px;
  width: 50px;
  height: 50px;
  line-height: 51px;
  box-sizing: border-box;
  text-align: center;
  font-family: sans-serif;
  font-size: 10px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
} */

/* .toggle:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.toggle:active {
  background-color: rgba(255, 255, 255, 0.3);
}

.toggle.active {
  background-color: rgba(255, 255, 255, 0.4);
} */

/* .splat-toggle {
  top: 20px;
} */

/* .back-row-toggle {
  top: 90px;
  line-height: 12px;
  padding-top: 14px;
} */

/* .single-toggle {
  top: 160px;
} */

/* body.single-toggle .drop {
  display: none;
}

body.single-toggle .drop:nth-child(10) {
  display: block;
} */
</style>