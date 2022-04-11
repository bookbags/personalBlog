<template>
  <div class="blogList">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="缩略图" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.thumb"
            fit="corver"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="150">
        <template slot-scope="scope">
          {{scope.row.blogTypeName ? scope.row.blogTypeName : "未分类"}}
        </template>
      </el-table-column>
      <el-table-column label="标题" >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="评论数" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.commentNumber || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="查看数" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.scanNumber || 0 }}
        </template>
      </el-table-column>
      <el-table-column width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editBlog(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteSure(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalPage"
      :page-size="eachPageBlog"
      :current-page="currentPage"
      :next-click="nextPage"
      :prev-click="prevPage"
    >
    </el-pagination>
    <el-dialog
      v-if="blogData"
      title="博客修改"
      :visible.sync="dialogTableVisible"
    >
      <el-form :model="blogData">
        <el-form-item label="缩略图">
          <UpLoadImg v-model="blogData.thumb"></UpLoadImg>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="blogData.category.name"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="blogData.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="blogData.description"></el-input>
        </el-form-item>
        <el-form-item label="浏览量">
          <el-input v-model="blogData.scanNumber"></el-input>
        </el-form-item>
        <el-form-item label="评论量">
          <el-input v-model="blogData.commentNumber"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormSure(blogData.id)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UpLoadImg from "@/components/upLoadImg.vue";
import { getBlog, deleteBlog, editBlogSubmit } from "@/api/blog.js";
export default {
  components: {
    UpLoadImg,
  },
  data() {
    return {
      tableData: [],
      currentPage: 0,
      allBlog: 10, //总的博客数
      eachPageBlog: 5, //每页显示多少文章
      dialogTableVisible: false,
      blogData: null, //需要修改的博客的数据
    };
  },
  methods: {
    async fetchBlog() {
      const data = await getBlog(this.currentPage, this.eachPageBlog);
      console.log(data);
      this.tableData = data.data.rows;
    },
    deleteSure(id) {
      this.$confirm("此操作会删除该文章，及其评论", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteBlog(id);
          console.log(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetchBlog();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editBlog(row) {
      this.$router.push(`/editBlog/${row.id}`)
    },
    async editFormSure(id) {
        const obj = {};
        obj.thumb = this.blogData.thumb;
      const data = await editBlogSubmit(id, obj);
      console.log("返回的数据", data);
      await this.fetchBlog();
      this.$message({
        message: "修改成功",
        type: "success",
      });
      this.dialogTableVisible = false;
    },
    prevPage(){
        this.currentPage -= 1;
    },
    nextPage(){
        this.currentPage += 1;
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.allBlog / this.eachPageBlog);
    },
  },
  created() {
    this.fetchBlog();
  },
};
</script>

<style>
</style>