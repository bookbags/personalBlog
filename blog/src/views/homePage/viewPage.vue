<template>
  <div
    ref="viewPage"
    class="viewPage"
    :style="{ marginTop: -index * moveDistance + 'px' }"
  >
    <div ref="page" class="page" v-for="(item, i) in data" :key="item.id">
      <ImageLoader
        v-if="index === i"
        :src="item.bigImg"
        :spaceholder="item.midImg"
        :duration="1500"
        @load="showWord"
      ></ImageLoader>
      <span class="title" ref="title">{{ item.title }}</span>
      <span class="des" ref="des">{{ item.description }}</span>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["data", "index"],
  data() {
    return {
      titleLen: 0,
      desLen: 0,
      viewLeft: 0,
      lastIndex: -1,
      moveDistance: 0
    };
  },
  methods: {
    showWord() {
      this.$refs.title[this.index].style.width = this.titleLen + "px";
      this.$refs.des[this.index].style.width = this.desLen + "px";
    },
  },
  components: {
    ImageLoader,
  },
  updated() {
    if(this.lastIndex != -1){
        this.$refs.title[this.lastIndex].style.width = this.titleLen + "px";
        this.$refs.des[this.lastIndex].style.width = this.desLen + "px";
        this.$refs.des[this.lastIndex].style.transition = "";
        this.$refs.title[this.lastIndex].style.transition = "";
    }
    this.titleLen = this.$refs.title[this.index].clientWidth;
    this.desLen = this.$refs.des[this.index].clientWidth;
    this.$refs.title[this.index].style.width = "0px";
    this.$refs.des[this.index].style.width = "0px";
    this.$refs.title[this.index].clientWidth;
    this.$refs.des[this.index].clientWidth;
    this.$refs.des[this.index].style.transition = ".5s";
    this.$refs.title[this.index].style.transition = ".5s .2s";
    this.lastIndex = this.index;
  },
  created(){
      this.moveDistance = window.innerHeight;
  }
};
</script>

<style scoped lang="less">
.viewPage {
  width: 100%;
  height: 100%;
  transition:all 1s;
  .page {
    position: relative;
    width: 100%;
    height: 100%;
    div.ImageLoader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
    }
    span {
      color: white;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      @distance: 40px;
      @fontSize: 2rem;
      user-select: none;
      overflow: hidden;
      white-space: nowrap;
      &.title {
        font-size: @fontSize;
        margin-top: -@distance;
        margin-left: @fontSize;
      }
      &.des {
        font-size: @fontSize * 1.5;
        margin-top: @distance;
        margin-left: @fontSize * 2;
      }
    }
  }
}
</style>