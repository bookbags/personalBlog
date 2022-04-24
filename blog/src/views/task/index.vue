<template>
    <ul class="task">
        <li v-for="item of taskList" :key="item.taskName">
            <Item :items="[item.taskName, item.taskType, item.taskStatus, item.achieveTime]"></Item>
        </li>
    </ul>
</template>

<script>
import getTaskApi from "@/api/task.js";
import Item from "./item.vue";
export default {
    components:{
        Item
    },
  data() { 
    return {
        taskList: [],
    }
  },
  async created(){
      this.taskList = await getTaskApi();
      this.taskList = this.taskList.data.data;
  }
}
</script>

<style lang="scss" scoped>
.task{
    margin: 0px;
    padding: 0px;
    height: 100%;
    overflow-y: scroll;
    li{
        height: 200px;
    }
}
</style>