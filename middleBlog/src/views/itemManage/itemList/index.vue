<template>
  <div class="itemList">
    <el-table :data="projectArray" border>
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="缩略图" width="200">
        <template slot-scope="scope">
          <el-image :src="scope.row.thumb" fit="cover" width="200px"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button
            class="iconfont icon-github"
            type="primary"
            circle
            @click="jumpGit(scope.row.github)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editItem(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delItem(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="项目编辑" :visible.sync="dialogTableVisible">
      <el-form :model="editItemData">
        <el-form-item label="标题">
          <el-input v-model="editItemData.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editItemData.description" type="textarea" rows="6"></el-input>
        </el-form-item>
        <el-form-item label="gitee">
          <el-input v-model="editItemData.github"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <UpLoadImg v-model="editItemData.thumb"></UpLoadImg>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectApi, delProjectApi, setProjectApi } from "@/api/item.js";
import UpLoadImg from "@/components/upLoadImg.vue";
export default {
  components: {
    UpLoadImg,
  },
  data() {
    return {
      projectArray: [],
      editItemData: {},
      dialogTableVisible: false,
    };
  },
  methods: {
    async fetchItem() {
      const data = await getProjectApi();
      this.projectArray = data.data;
    },
    delItem(id) {
      this.$confirm("此操作会删除该项目", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delProjectApi(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetchItem();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editItem(rowData) {
      this.dialogTableVisible = true;
      this.editItemData = { ...rowData };
    },
    jumpGit(url) {
      window.open(url); //跳转到项目gitee地址
    },
    async submit(){
        const obj = {...this.editItemData};
        obj.order = 1;
        const data = await setProjectApi(obj.id, obj);
        await this.fetchItem();
        this.dialogTableVisible = false;
    }
  },
  async created() {
    this.fetchItem();
  },
};
</script>