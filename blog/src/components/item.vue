<template>
  <div class="item">
    <img v-if="imgUrl" :src="imgUrl" />
    <span>{{ title }}</span>
    <span>{{ description }}</span>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  height: 200px;
  img{
      width: 20%;
      height: 100%;
      float: left;
  }
  span {
    text-align: center;
    display: block;
    width: 100%;
    &:first-of-type{
        font-size: 2rem;
        margin-bottom: 2rem;
    }
  }
}
</style>