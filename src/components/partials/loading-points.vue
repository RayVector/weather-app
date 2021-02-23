<template>
  <div
      class="loading-points"
      :style="{
        width: width + units,
        height: height + units,
        color: color
      }"
  >
    <div class="loading-points-icon">
      ...
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading-points',
    props: {
      color: String,
      width: {
        type: Number,
        default: 50,
      },
      height: {
        type: Number,
        default: 25,
      },
      units: {
        type: String,
        default: 'px',
      },
    },
  }
</script>

<style scoped lang="stylus">
  .loading-points {
    position: relative
    display: flex
    color: $whiteTrans60
  }

  .loading-points-icon {
    position: absolute
    top -100%
    font-size 52px
    font-weight bold
    overflow hidden
    animation: anim 1.8s infinite ease-in-out;
  }

  @keyframes anim {
    0% {
      width: 20%;
    }
    100% {
      width: 100%;
    }
  }

</style>
