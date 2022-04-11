<template>
  <div class="leaveWord">
    <el-table :data="leaveWord" border>
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.avatar"
            fit="cover"
            style="width: 100px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="评论">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="删除" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delLeaveWord(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLeaveWordApi, delLeaveWordApi } from "@/api/leaveword.js";
export default {
  data() {
    return {
      leaveWord: [],
      page: 1,
      limit: 10,
    };
  },
  methods: {
    async fetchLeaveWord() {
      const data = await getLeaveWordApi(this.page, this.limit);
      this.leaveWord = data.data.rows;
      console.log(this.leaveWord);
    },
    async delLeaveWord(id) {
      this.$confirm("确定删除该评论吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delLeaveWordApi(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetchLeaveWord();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetchLeaveWord();
  },
};
</script>

<style>
</style>