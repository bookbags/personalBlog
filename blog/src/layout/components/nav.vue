
<template>
  <div class="nav">
    <header>
      <Avatar size="200px"></Avatar>
      <div>
        <span>{{ $store.state.global.globalData.giteeName }}</span>
      </div>
    </header>
    <main>
      <ul>
        <li v-for="item in routes" :key="item.path">
          <router-link
            :to="{
              name: item.name,
            }"
            >{{ item.name }}</router-link
          >
        </li>
      </ul>
    </main>
    <footer>
      <Contact></Contact>
    </footer>
  </div>
</template>

<script>
// 所有数据有后端提供
import { routes } from "@/router/routes.js"; //导出路由的配置对象
import Avatar from "./avatar.vue";
import Contact from "./contact.vue";

export default {
  components: {
    Avatar,
    Contact,
  },
  data() {
    return {
      routes: routes[0].children,
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/globalCss/color.less";
.nav {
  display: flex;
  width: 250px;
  height: 100%;
  flex-wrap: wrap;
  align-items: space-between;
  background: black;
  justify-content: center;
  header {
    div {
      font-size: 2rem;
      text-align: center;
      color: lighten(@words, 20%);
    }
  }
  main {
    ul {
      margin: 0px;
      padding: 0px;
      li {
        list-style: none;
        font-size: 1.5rem;
        background-color: #999;
        border-radius: 50%;
        padding: 1em;
        text-align: center;
        a {
          color: @words;
          text-decoration: none;
          &:hover {
            color: yellow;
          }
        }
        &:not(:first-child) {
          margin-top: 1em;
        }
      }
    }
  }
}
</style>