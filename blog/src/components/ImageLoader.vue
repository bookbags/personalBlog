<template>
  <div class="ImageLoader">
    <img :src="spaceholder" class="spaceholder" v-if="!allOver" />
    <img
      :src="src"
      class="origin"
      @load="loader"
      :style="{
        opacity: originOpacity,
        transition: `opacity ${duration}ms linear`,
      }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    spaceholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      loaderAchieve: false,
      allOver: false,
    };
  },
  computed: {
    originOpacity() {
      return this.loaderAchieve ? 1 : 0;
    },
  },
  methods: {
    loader() {
      this.loaderAchieve = true;
      setTimeout(() => {
        this.allOver = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style scoped lang="less">
.ImageLoader {
  position: relative;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .origin {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .spaceholder {
    object-fit: cover;
    filter: blur(2vw); //虚化
  }
}
</style>