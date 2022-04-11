<template>
  <div class="avatar">
    <img
      :src="$store.state.global.globalData.avatar"
      :style="{
        width: size,
        heigth: size,
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    size: {
      type: String,
      default: "2rem",
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
  border-radius: 50%;
}
</style>