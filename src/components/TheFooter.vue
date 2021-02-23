<template>
  <footer class="TheFooter">
    <ul class="subInfo-list">
      <li class="subInfo-item">
        <div class="subInfo-item-label">
          Ветер
        </div>

        <loading-points v-if="getWeatherLoading"/>
        <div v-else class="subInfo-item-value">
          {{ Math.round(getWeather.list[0].wind.speed) }}
          {{ getActiveLang.speedUnits }},
          {{ degToDir(getWeather.list[0].wind.deg) }}
        </div>
      </li>

      <li class="subInfo-item">
        <div class="subInfo-item-label">
          Давление
        </div>

        <loading-points v-if="getWeatherLoading"/>
        <div v-else class="subInfo-item-value">
          {{ getWeather.list[0].main.pressure}} мм рт. ст.
        </div>
      </li>

      <li class="subInfo-item">
        <div class="subInfo-item-label">
          Влажность
        </div>

        <loading-points v-if="getWeatherLoading"/>
        <div v-else class="subInfo-item-value">
          {{ getWeather.list[0].main.humidity}} %
        </div>
      </li>

      <li class="subInfo-item">
        <div class="subInfo-item-label">
          Вероятность дождя
        </div>

        <loading-points v-if="getWeatherLoading"/>
        <div v-else class="subInfo-item-value">
          {{ getWeather.list[0].rain ? Object.values(getWeather.list[0].rain)[0] : 0}} %
        </div>
      </li>
    </ul>
  </footer>
</template>

<script>
  // todo: refactor 'subInfo-list' to rendered list v-for

  import { mapState } from 'vuex'
  import degToDir from '../utils/degToDir'
  import LoadingPoints from './partials/loading-points'

  export default {
    name: 'TheFooter',
    components: { LoadingPoints },
    data() {
      return {
        degToDir: degToDir,
      }
    },
    computed: {
      ...mapState({
        getWeather: state => state.weather,
        getWeatherLoading: state => state.isWeatherLoading,
        getActiveLang: state => state.activeLang,
      }),
    },
  }
</script>

<style scoped lang="stylus">

  .subInfo-list
    display grid
    grid-template-columns 1fr 1fr
    grid-template-rows 1fr 1fr
    gap 35px 38px
    grid-template-areas: ". ."
    ". ."

    @media screen and (min-width: $mediaL)
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      gap: 0 0;
      grid-template-areas: ". . . .";

  .subInfo-item

    &-label
      margin-bottom 5px
      color $whiteTrans60
      font-size $textSizeListLabel
      font-weight $textWeightListLabel

      @media screen and (min-width: $mediaL)
        font-size $textSizeListLabelL

    &-value
      font-size $textSizeListValue
      font-weight $textWeightListValue

      @media screen and (min-width: $mediaL)
        font-size $textSizeListValueL
        font-weight $textWeightListValueL

</style>
