<template>
  <div class="set" style="margin: 1rem 0 0 1rem">
      <el-form :model="setData">
        <el-form-item v-for="(item, i) in valueKey" :key="i" :label="item">
          <el-input v-model="setData[item]"></el-input>
        </el-form-item>
      </el-form>
       <el-button type="primary" round @click="submit">确认修改</el-button>
  </div>
</template>

<script>
import {getSetApi, setSetApi} from "@/api/set.js";
export default {
  data(){
    return{
      setData: {},
      valueKey: []
    }
  },
  methods:{
    async fetchSet(){
      const data = await getSetApi();
      this.setData = data.data;
      this.valueKey = Object.keys(this.setData);
      console.log(this.setData);
    },
    async submit(){
      console.log(this.setData, "提交的数据");
      const data = await setSetApi(this.setData);
      this.setData = data.data;
      this.$message.success("修改成功");
    }
  },
  created(){
    this.fetchSet();
  }
}
</script>

<style>

</style>