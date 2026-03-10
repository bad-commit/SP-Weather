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
              <div class="city">
                <h2>Moscow</h2>
              </div>
              <div class="temperature">
                <div class="temperature-value">1</div>
                <div class="temperature-icon">2</div>
              </div>
              <div class="info">3</div>
            </div>
          </LiquidGlass>
        </div>

      </div>

    </div>

  </div>
</template>


<script>

import { LiquidGlass } from '../../node_modules/@wxperia/liquid-glass-vue/dist/index.js'

export default {
  name: 'RightArea',
  components: {
    LiquidGlass
  },

  data() {
    return {}
  },

  methods: {},
}
</script>

<style scoped>

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
  backdrop-filter: blur(2px) saturate(100%) !important;
}

.glass-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.city {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15%;
  width: 100%;
}

.temperature {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  height: 20%;
  width: 100%;
}

.temperature-value {
  display: flex;
  justify-content: center;
  width: 100%;
  /* height: 100%; */
}

.temperature-icon {
  display: flex;
  justify-content: center;  
  width: 100%;
  /* height: 100%; */
}

.info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65%;
  width: 100%;
}

/* .content-wrapper {
  padding: 20px;
}

.glass-test {
  width: 300px;
  height: 300px;
}

.my-glass {
  width: 100%;
  height: 100%;
}

.glass-content {
  color: white;
  font-weight: bold;
  text-align: center;
  padding-top: 40%;
} */

/* .content-wrapper {
  display: flex;
  margin: 0 auto;
  height: 50%;
  align-items: center;
  justify-content: center;
}

.glass-test {
  height: 100%;
  width: 100%;

  position: relative;
  overflow: hidden;
}

.my-glass {
  width: 100%;
  height: 100%;
}

.glass-content {
  padding: 10px;
  color: black;
} */

/* .glass-test .bg-black .transition-all .duration-150 .ease-in-out .pointer-events-none .opacity-0 {
  position: relative;
  top: 50%;
  left: 50%;
  border-radius: 20px;
  transform: translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1);
  transition: 0.2s ease-out;
  height: 0px;
  width: 0px;
}

.glass-test .bg-black .transition-all .duration-150 .ease-in-out .pointer-events-none .mix-blend-overlay .opacity-0{
position: relative;
  top: 50%;
  left: 50%;
  border-radius: 20px;
  transform: translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1);
  transition: 0.2s ease-out;
  height: 0px;
  width: 0px;
} */

/* .glass-test .relative .my-glass {
  transform: translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1);
  transition: 0.2s ease-out;
  height: 100%;
  width: 100%;
  display: contents;
}

.glass-test .relative .my-glass svg {
  position: absolute;
  width: 0px;
  height: 0px;
}

.glass-test .glass__warp {
  filter: url(#38a02298-6232-4933-9730-c272421d3fe1);
  backdrop-filter: blur(4px) saturate(100%);
  position: absolute;
  inset: 0px;
} */




</style>
