<template>
  <div
    class="runBear"
    :style="{
      width: 2 * parseInt(size) + 'px',
      height: size,
    }"
  >
    <img src="../assets/bearRun.png" />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "200px",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@keyframes run {
  0% {
    left: -0px;
  }
  12.5% {
    left: -400px;
  }
  25% {
    left: -800px;
  }
  37.5% {
    left: -1200px;
  }
  50% {
    left: -1600px;
  }
  62.5% {
    left: -2000px;
  }
  75% {
    left: -2400px;
  }
  87.5% {
    left: -2800px;
  }
  100% {
    left: -3200px;
  }
}
.runBear {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  img {
    position: absolute;
    height: 100%;
    animation: run 1s steps(1, end) infinite;
  }
}
</style>