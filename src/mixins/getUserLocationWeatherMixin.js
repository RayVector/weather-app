export default {
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.$store.commit('UPDATE_USER_POSITION', position.coords)
        this.getWeather()
      })
    },
  },
}