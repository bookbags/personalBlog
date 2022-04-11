<template>
  <div class="aboutMe" style="margin-top: 1rem">
    <el-input placeholder="请输入内容" v-model="input">
      <template slot="prepend">aboutMe</template>
       <el-button slot="append" @click="submit">提交</el-button>
    </el-input>
  </div>
</template>

<script>
import {getAboutMeApi, setAboutMeApi} from "@/api/aboutMe.js";
export default {
    data(){
        return {
            input:""
        }
    },
    methods:{
        async fetchAboutMe(){
            const data = await getAboutMeApi();
            this.input = data.data;
        },
        async submit(){
            const data = await setAboutMeApi({url: this.input});
            this.$message.success("修改成功");
            this.fetchAboutMe();
        }
    },
    created(){
        this.fetchAboutMe();
    }
};
</script>

<style>
</style>