<template>
  <div class="avatar" :style="{
        width: size,
        heigth: size,
      }">
    <img
      :src="src"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    src:String,
    size: {
      type: String,
      default: "2rem",
    },
  },
};
</script>

<style lang="less" scoped>
div{
  border-radius: 50%;
  margin: 0 auto;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>