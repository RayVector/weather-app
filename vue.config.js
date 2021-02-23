module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        // So here you assume that you have the file `src/common/stylus/color.styl`
        import: [
          '~@/assets/styles/media.styl',
          '~@/assets/styles/font.styl',
          '~@/assets/styles/colors.styl',
          '~@/assets/styles/mixins.styl',
        ],
      },
    },
  },
}