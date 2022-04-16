<template>
  <div class="Home" @wheel="wheelSwitch">
      <ViewPage v-if="data.lenght != 0" :data="data" :index="index"></ViewPage>
      <Icon type="arrowUp" @click.native="switchPage(index - 1)" v-show="this.index > 0 "></Icon>
      <!-- 无法给组件绑定事件，需要使用.native修饰事件 -->
      <Icon type="arrowDown" @click.native="switchPage(index + 1)" v-show="this.index < this.data.length - 1"></Icon>
      <ul>
        <li v-for="(item, i) in data" :key="item.id" @click="switchPage(i)" :class="{select: i == index}"></li>
      </ul>
  </div>
</template>

<script>
import Icon from "@/components/icon";
import ViewPage from "./viewPage";
import {getBannerApi} from "@/api/banner.js";
export default {
  components:{
    Icon: Icon,
    ViewPage
  },
  data(){
    return {
      data:[],
      index: 0,
      loading: true
    }
  },
  methods:{
    switchPage(page){
      if(page < 0 || page >= this.data.length || this.index === page) return;
      this.index = page;
    },
    wheelSwitch(event){
      if(event.deltaY > 0){
        this.switchPage(this.index + 1);
      }else{
        this.switchPage(this.index - 1);
      }
    }
  },
  async created(){
    this.data = (await getBannerApi()).data;
    console.log(this.data);
    this.loading = false;
  }
}
</script>

<style scoped lang="scss">
  .Home{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .Icon{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 30px;
      $distance: 20px;
      cursor: pointer;
      &:nth-of-type(1){
        top: $distance;
        animation: jump-up 2s infinite;
        text-shadow: -1px -1px white;
      }
      &:nth-of-type(2){
        bottom: $distance;
        animation: jump-down 2s infinite;
        text-shadow: 1px 1px white;
      }
      @keyframes jump-up {
        0%{
          transform: translateY(-$distance * 0.5);
        }
        50%{
          transform: translateY($distance * 0.5); 
        }
        100%{
          transform: translateY(-$distance * 0.5);
        }
      }
      @keyframes jump-down {
        0%{
          transform: translateY($distance * 0.5);
        }
        50%{
          transform: translateY(-$distance * 0.5); 
        }
        100%{
          transform: translateY($distance * 0.5);
        }
      }
    }
    ul{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
      margin: 0px;
      padding: 0px;
      li{
        list-style: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        box-shadow: -3px 3px 5px black;
        background-color: white;
        cursor: pointer;
        &:not(:nth-of-type(1)){
          margin-top: 10px;
        }
        &.select{
          background-color: black;
        }
      }
    }
  }
</style>