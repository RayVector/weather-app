<template>
  <div
      id="app"
      class="app"
      :class="getWeatherType"
  >
    <div class="_wrapper app-wrap">
      <the-header/>
      <the-weather-main/>
      <the-footer/>
    </div>
  </div>
</template>
<script>
  // todo: errors class + notifications

  import { mapState } from 'vuex'
  import TheHeader from './components/TheHeader'
  import TheWeatherMain from './components/TheWeatherMain'
  import TheFooter from './components/TheFooter'
  import getUserLocationWeatherMixin from './mixins/getUserLocationWeatherMixin'

  export default {
    components: { TheFooter, TheWeatherMain, TheHeader },
    mixins: [getUserLocationWeatherMixin],
    created() {
      this.getLocation()
      setInterval(() => {
        this.getWeather(this.getWeatherData.city.name)
      }, this.getRequestInterval)
    },
    computed: {
      ...mapState({
        getRequestInterval: state => state.requestInterval,
        getWeatherData: state => state.weather,
      }),
      getWeatherType() {
        if (this.getWeatherData && this.getWeatherData.list) {
          const currentWeather = this.getWeatherData.list[0].weather[0]
          if (currentWeather.id === 800) return 'sunny'
        }

        return 'clouds'
      },
    },
    methods: {
      getWeather(location = null) {
        this.$store.dispatch('getWeather', location)
      },
    },
  }
</script>

<style scoped lang="stylus">

  .app-wrap
    height 100vh
    display grid
    grid-template-columns 1fr
    grid-template-rows 1fr 3fr 1fr
    gap 0 0

  .sunny
    background-color $blue2

  .clouds
    background-color: $gray

</style>