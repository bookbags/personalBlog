<template>
  <div class="layout" v-if="globalSet">
    <div class="left">
        <Avatar :src="globalSet.avatar"></Avatar>
        <Nav :size="20" :imgUrl="globalSet.avatar"></Nav>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "./components/nav.vue";
import Avatar from "./components/avatar.vue";
export default {
  components: {
    Nav, Avatar
  },
  data() {
    return {
        globalSet: ""
    };
  },
  async created(){
      this.globalSet = await this.$store.dispatch("getGlobalData");
      console.log(this.globalSet);
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  .left,
  .right {
    height: 100%;
  }
  // 两栏布局，宽度由内容决定
  .left {
    flex: 0 0 auto;
  }
  .right {
    flex: 1 1 auto;
  }
}
</style>