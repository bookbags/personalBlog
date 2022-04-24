<template>
  <div class="project">
    <ul>
      <li v-for="value in item" :key="value.id" @click="linkTo(value.url)">
        <Item
          :title="value.name"
          :description="value.description"
          :imgUrl="value.thumb"
        ></Item>
      </li>
    </ul>
  </div>
</template>

<script>
import { getItemApi } from "@/api/item.js";
import Item from "@/components/item.vue";
export default {
  components: {
    Item,
  },
  data() {
    return {
      item: [],
    };
  },
  methods:{
    linkTo(url){
      location.href = url;
    }
  },
  async created() {
    const { data } = await getItemApi();
    this.item = data;
    console.log("item", data);
  },
};
</script>

<style lang="scss" scoped>
.project {
  ul {
    padding: 0px;
    margin: 0px;
    li {
      box-sizing: border-box;
      box-shadow: 0px 0px 2px 2px black inset;
      list-style: none;
      padding: 2em;
      cursor: pointer;
      &:hover{
        box-shadow: 1px 1px 2px 5px rgb(153, 123, 123);
      }
    }
  }
}
</style>