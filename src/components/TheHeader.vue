<template>
  <header class="TheHeader">
    <div class="city-overlay">
      <div
          v-if="isCityOverlayOpened"
          class="city-overlay-shadow"
          @click="updateEditCityOverlayShown(false)"
      />
      <transition name="fade">
        <div
            v-show="isCityOverlayOpened"
            class="city-overlay-body"
        >
          <label class="city-overlay-labelInput">
            <input
                ref="cityInput"
                class="city-overlay-input"
                type="text"
                placeholder="Название города"
                v-model.trim="citySearch"
                @keypress="isLetter($event)"
                @keypress.enter="chooseCity"
            >
          </label>
          <button
              class="city-overlay-btn"
              @click="chooseCity"
          >
            ok
          </button>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div v-show="!isCityOverlayOpened" class="user-menu">
        <div class="row">
          <loading-points v-if="getWeatherLoading"/>
          <button
              v-else
              class="location"
              @click="updateEditCityOverlayShown(true)"
          >
            {{ getWeatherData.city.name }}
          </button>

          <div class="units">
          <span class="units-icon">
            º
          </span>
            <div class="units-btn">
              <button
                  class="units-btn-half"
                  v-for="unit in getUnitsList"
                  :key="unit.id"
                  :class="{'units-btn-half--active': getActiveUnits === unit.id}"
                  @click="changeUnits(unit.id)"
              >
                {{ unit.title }}
              </button>
            </div>
          </div>
        </div>

        <div class="row">
          <button
              class="changeLocation"
              @click="updateEditCityOverlayShown(true)"
          >
            Сменить город
          </button>

          <button
              class="row myLocation"
              @click="getLocation"
          >
            <span class="myLocation-icon">
              <icon-location/>
            </span>
            <span class="myLocation-text">
              Мое местоположение
            </span>
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
  import { mapState } from 'vuex'
  import IconLocation from './icons/icon-location'
  import LoadingPoints from './partials/loading-points'
  import getUserLocationWeatherMixin from '../mixins/getUserLocationWeatherMixin'

  export default {
    name: 'TheHeader',
    components: { LoadingPoints, IconLocation },
    mixins: [getUserLocationWeatherMixin],
    computed: {
      ...mapState({
        getActiveUnits: state => state.activeUnits,
        getUnitsList: state => state.unitsList,
        getActiveLang: state => state.activeLang,
        getWeatherData: state => state.weather,
        getWeatherLoading: state => state.isWeatherLoading,
      }),
    },
    data() {
      return {
        isCityOverlayOpened: false,
        citySearch: '',
      }
    },
    methods: {
      updateEditCityOverlayShown(status) {
        this.isCityOverlayOpened = status
        if (status) {
          this.$nextTick(() => {
            this.$refs.cityInput.focus()
          })
        }
      },
      changeUnits(id) {
        if (id !== this.getActiveUnits) {
          this.$store.commit('UPDATE_ACTIVE_UNITS', id)
          this.getWeather(this.getWeatherData.city.name)
        }
      },
      chooseCity() {
        if (this.citySearch && this.citySearch.length > 2) {
          this.updateEditCityOverlayShown(false)
          this.$store.commit('UPDATE_USER_POSITION', null)
          this.getWeather(this.citySearch)
          this.citySearch = ''
        } else {
          alert('Название города должно быть больше двух символов')
        }
      },
      isLetter(e) {
        let char = String.fromCharCode(e.keyCode)
        // regex of active language check
        if (this.getActiveLang.regexLetters.test(char)) return true
        else e.preventDefault()
      },
      getWeather(location = null) {
        this.$store.dispatch('getWeather', location)
      },
    },
  }
</script>

<style scoped lang="stylus">

  .TheHeader
    position: relative
    padding-bottom: 38px

  .city-overlay

    &-body
      z-index 2
      position absolute
      top 0
      left 0
      right 0
      width 100%
      background $whiteMain
      box-shadow 0 2px 8px $whiteTrans15
      border-radius 4px
      display flex
      justify-content space-between
      overflow: hidden

      @media screen and (min-width: $mediaL)
        border-radius 8px

    &-labelInput
      width: 100%

    &-input
      margin-right 10px
      padding-left: 18px
      color $blackMain
      font-size $textSizeInput
      width 100%
      height: 100%

      @media screen and (min-width: $mediaL)
        font-size $textSizeInputL
        min-height: 97px

    &-btn
      padding 18px 18px 16px 17px
      color $blue
      font-size $textSizeInputButton
      text-transform uppercase

      @media screen and (min-width: $mediaL)
        font-size $textSizeInputButtonL

    &-shadow
      z-index 1
      position fixed
      left 0
      top 0
      right 0
      bottom 0
      height 100%
      width 100%

  .row
    display: flex
    justify-content: space-between
    align-items: center

    &:last-child
      @media screen and (min-width: $mediaL)
        justify-content: flex-start


    &:first-child
      margin-bottom: 20px

      @media screen and (min-width: $mediaL)
        margin-bottom: 9px

  .location
    max-width 209px
    overflow hidden
    text-overflow ellipsis
    font-size $textSizeHeader
    font-weight $textWeightHeader
    color $whiteMain
    white-space nowrap

    @media screen and (min-width: $mediaL)
      font-size $textSizeHeaderL
      max-width: 950px

  .changeLocation
    margin-right 33px

  .units
    display: flex
    align-items: center
    color: $whiteTrans40


    &-icon
      margin-right 9px

    &-btn
      border 1px solid $whiteTrans40
      border-radius 8px
      overflow hidden

      &-half
        transition color, background-color .5s ease
        padding 4px 12px
        font-size $textSizeButton2
        font-weight $textWeightButton

        &--active
          color $whiteMain
          background $whiteTrans20
          font-weight $textWeightButton2

  .fade-enter-active, .fade-leave-active
    transition opacity .5s ease

  .fade-enter, .fade-leave-to
    opacity 0

</style>