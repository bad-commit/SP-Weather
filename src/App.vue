<template>
  <div class="base">
    <Weather />
  </div>
</template>

<script>
import Weather from '@/components/Weather.vue'

export default {
  name: 'App',
  components: {
    Weather,
  },

  data() {
    return {}
  },

  methods: {},
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;

  font-style: normal;
  font-variant: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 1;
  font-family: sans-serif;
}

#app {
  width: 100%;
  height: 100%;
}

.base {
  height: 100%;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}

</style>


