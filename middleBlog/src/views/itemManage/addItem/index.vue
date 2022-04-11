<template>
  <div class="addItem">
    <el-form :model="projectForm">
      <el-form-item label="标题">
        <el-input v-model="projectForm.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="projectForm.description"
          type="textarea"
          rows="6"
        ></el-input>
      </el-form-item>
      <el-form-item label="gitee">
        <el-input v-model="projectForm.github"></el-input>
      </el-form-item>
      <span>缩略图</span>
      <el-form-item style="margin-top: 1rem">
        <UpLoadImg v-model="projectForm.thumb"></UpLoadImg>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">确定</el-button>
  </div>
</template>

<script>
import UpLoadImg from "@/components/upLoadImg.vue"
import { addProjectApi } from "@/api/item.js";
export default {
  components:{
    UpLoadImg
  },
  data() {
    return {
      projectForm: {
        name: "",
        description: "",
        github: "",
        thumb: "",
        url: "",
        order: 1,
      },
    };
  },
  methods: {
    async submit() {
      const obj = {...this.projectForm};
      const data = await addProjectApi(obj);
      this.$message.success("添加成功");
      this.$router.push("/ListItem");
    },
  },
};
</script>

<style scoped lang="sass">
.addItem
  margin: 2rem 0 0 2rem
</style>