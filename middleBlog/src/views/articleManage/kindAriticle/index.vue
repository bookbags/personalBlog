<template>
  <div class="kind">
    <!-- 添加分类 -->
    <el-form v-model="addBlogTypeData">
      <el-select
        v-model="addBlogTypeData.order"
        placeholder="请选择权重"
        style="width: 5%"
      >
        <el-option label="1" :value="1"></el-option>
        <el-option label="2" :value="2"></el-option>
        <el-option label="3" :value="3"></el-option>
        <el-option label="4" :value="4"></el-option>
      </el-select>
      <el-input type="primary" style="width: 20%" v-model="addBlogTypeData.name" ></el-input>
      <el-button type="primary" @click="addBlogTypeHandel" style="border:none">添加</el-button>
    </el-form>
    <el-table :data="blogType" style="width: 100%" border>
      <el-table-column label="类名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="权重" align="center">
        <template slot-scope="scope">
          {{ scope.row.order }}
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editBlogTypeHandel(scope.row)"
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

    <!-- 编辑 -->
    <el-dialog title="添加文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="blogTypeRow">
        <el-form-item label="类名">
          <el-input v-model="blogTypeRow.name" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-select
            v-model="blogTypeRow.order"
            placeholder="请选择权重"
            style="width: 50%"
          >
            <el-option label="1" :value="1"></el-option>
            <el-option label="2" :value="2"></el-option>
            <el-option label="3" :value="3"></el-option>
            <el-option label="4" :value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBlogType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  getOneBlogType,
  setBlogType,
  addBlogType,
  delBlogType,
} from "@/api/blogType.js";
export default {
  data() {
    return {
      blogType: null,
      dialogFormVisible: false,
      blogTypeRow: {
        order: 1,
        name: "",
      },
      addBlogTypeData:{
        order: 1,
        name: ""
      }
    };
  },
  methods: {
    async fetchBlogType() {
      const data = await getBlogType();
      this.blogType = data.data;
    },
    editBlogTypeHandel(rowData) {
      this.dialogFormVisible = true;
      this.blogTypeRow = { ...rowData };
    },
    async submitBlogType() {
      await setBlogType(this.blogTypeRow.id, this.blogTypeRow);
      await this.fetchBlogType();
      this.dialogFormVisible = false;
    },
    deleteSure(id) {
      this.$confirm(
        "此操作会删除该文章分类，为该分类的文章改为为分类",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          await delBlogType(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetchBlogType();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async addBlogTypeHandel(){
      await addBlogType(this.addBlogTypeData);
      await this.fetchBlogType();
      this.$message.success("添加成功");
    }
  },
  created() {
    this.fetchBlogType();
  },
};
</script>

<style>
</style>