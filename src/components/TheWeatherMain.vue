<template>
  <section class="TheWeatherMain">
    <loading-points v-if="getWeatherLoading"/>
    <div v-else class="weather-wrap">
      <div class="weather">
        <figure class="weather-icon">
          <component :is="`icon-${getWeatherIcon}`"/>
        </figure>
        <h1 class="weather-value">
          {{ Math.round(getWeather.list[0].main.temp) }}º
        </h1>
      </div>

      <div
          v-if="getWeather.list[0].weather[0].description"
          class="weatherType"
      >
        {{ getWeather.list[0].weather[0].description }}
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import LoadingPoints from './partials/loading-points'
  import IconSun from './icons/wheather/icon-sun'
  import IconCloud from './icons/wheather/icon-cloud'
  import IconRain from './icons/wheather/icon-rain'
  import IconPartyCloud from './icons/wheather/icon-party-cloud'

  export default {
    name: 'TheWeatherMain',
    components: { IconPartyCloud, IconRain, IconCloud, IconSun, LoadingPoints },
    computed: {
      ...mapState({
        getWeather: state => state.weather,
        getWeatherLoading: state => state.isWeatherLoading,
      }),
      getWeatherIcon() {
        const currentWeather = this.getWeather.list[0].weather[0]

        switch (currentWeather.id) {
          case 800:
            return 'sun'
          case 600:
          case 801:
          case 802:
            return 'cloud'
          case 803:
            return 'party-cloud'
          default:
            return 'sun'
        }
      },
    },
  }
</script>

<style scoped lang="stylus">

  .TheWeatherMain
    padding-top 38px
    padding-bottom 60px // 120px / 2
    centered()
    flex-direction column

  .weather-wrap
    centered()
    flex-direction column

  .weather
    margin-bottom: 20px
    display flex
    align-items center

    &-icon
      margin-right: 10px
      width: 100px
      height: 100px

      @media screen and (min-width: $mediaL)
        width: 200px
        height: 200px

    &-value
      font-size $textSizeMainValue
      font-weight $textWeightMainValue

      @media screen and (min-width: $mediaL)
        font-size $textSizeMainValueL

  .weatherType
    font-size $textSizeMainSubValue

    @media screen and (min-width: $mediaL)
      font-size $textSizeMainSubValueL


</style>
