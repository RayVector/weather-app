import Vue from 'vue'

// plugins
import Vuex from 'vuex'
import axios from 'axios'

// config
import mainConfig from '../../config/main'

const {
  REQUEST_INTERVAL,
  UNITS_LIST,
  LOCALES,
  OPEN_WEATHER_MAP_ID,
  OPEN_WEATHER_MAP_URL,
} = mainConfig

const defaultState = () => ({
  requestInterval: REQUEST_INTERVAL,
  weather: {},
  activeUnits: UNITS_LIST[0].id,
  unitsList: UNITS_LIST,
  activeLang: LOCALES[0],
  isWeatherLoading: true,
  userPosition: null,
})

Vue.use(Vuex)
export default new Vuex.Store({
  state: defaultState(),
  mutations: {
    UPDATE_ACTIVE_UNITS(state, id) {
      state.activeUnits = id
    },
    UPDATE_WEATHER(state, data) {
      state.weather = data
    },
    UPDATE_WEATHER_LOADING(state, status) {
      state.isWeatherLoading = status
    },
    UPDATE_USER_POSITION(state, position) {
      state.userPosition = position
    },
  },
  actions: {
    async getWeather({ state, commit }, location) {
      const currentLocation = location || state.activeLang.defaultCity
      const units = state.activeUnits
      const appid = OPEN_WEATHER_MAP_ID
      const lang = state.activeLang.id

      let userLocation = ''
      if (state.userPosition !== null) {
        const lat = state.userPosition.latitude
        const lon = state.userPosition.longitude
        userLocation = `forecast?lat=${lat}&lon=${lon}`
      } else {
        // weather
        userLocation = `forecast?q=${currentLocation}`
      }

      const apiMain = `${OPEN_WEATHER_MAP_URL}${userLocation}`
      try {
        commit('UPDATE_WEATHER_LOADING', true)
        const res = await axios.get(`${apiMain}&units=${units}&appid=${appid}&lang=${lang}`)

        commit('UPDATE_WEATHER', res.data)
        commit('UPDATE_WEATHER_LOADING', false)
      } catch (e) {
        alert('Город не найден')
        window.location.reload()
      }
    },
  },
})