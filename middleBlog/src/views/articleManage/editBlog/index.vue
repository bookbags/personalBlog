<template>
  <div class="add">
    <div class="title" style="margin: 1rem">文章标题</div>
    <div class="titleINput" style="margin-bottom: 2rem">
      <el-input
        type="text"
        placeholder="请输入文章标题"
        v-model="form.title"
      ></el-input>
    </div>
    <!-- 文章编辑 -->
    <div class="editBlog">
      <Editor height="30em" :options="editOption" ref="editor"></Editor>
    </div>
    <el-form class="demo-ruleForm" style="margin-top: 2rem">
      <el-form-item label="添加描述">
        <el-input
          type="textarea"
          rows="6"
          v-model="form.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择分类">
        <el-select v-model="form.blogTypeName">
          <el-option
            v-for="item in blogType"
            :key="item.id"
            :value="item.name"
            >{{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="缩略图">
        <UpLoadImg v-model="form.thumb"></UpLoadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitHandel">submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import UpLoadImg from "@/components/upLoadImg";
import { getBlogType } from "@/api/blogType.js";
import { setBlogApi, getIdBlogApi } from "@/api/blog.js";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
  components: {
    Editor,
    UpLoadImg,
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
        thumb: "",
        blogTypeName: "js",
      },
      blogType: [],
      editOption: {
        language: "zh-CN",
      },
    };
  },
  methods: {
    async submitHandel() {
      const submitData = {};
      submitData.title = this.form.title;
      submitData.description = this.form.description;
      submitData.thumb = this.form.thumb;
      submitData.htmlContent = this.$refs.editor.invoke("getHTML");
      submitData.createDate = new Date().getTime();
      submitData.markdownContent = this.$refs.editor.invoke("getMarkdown");
      submitData.blogTypeName = this.form.blogTypeName;
      let data = await setBlogApi(this.form.id, submitData);
      console.log(data, "返回", "提交", submitData);
      this.$message.success("上传成功");
      this.$router.push("/list");
    },
  },
  async created() {
    const formData = await getIdBlogApi(this.$route.params.id);
    this.form = formData.data;
    const data = await getBlogType();
    this.blogType = data.data;
    this.$refs.editor.invoke("setHTML", this.form.htmlContent);
    this.form.blogTypeName = this.form.blogTypeName ? this.form.blogTypeName : "js";
    console.log(this.form, "表单");
  },
};
</script>

<style>
</style>