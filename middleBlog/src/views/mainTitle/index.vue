<template>
  <div class="mainTitle">
    <!-- 页面主体 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column label="中图">
        <template slot-scope="scope">
          <el-image
            style="width: 150px"
            :src="scope.row.midImg"
            fit="corver"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图">
        <template slot-scope="scope">
          <el-image
            style="width: 150px"
            :src="scope.row.bigImg"
            fit="corver"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="编辑" width="100">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editForm(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form v-if="rowData" :model="rowData">
        <el-form-item label="标题">
          <el-input v-model="rowData.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="rowData.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中图">
              <UpLoadImg v-model="rowData.midImg"></UpLoadImg>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="大图">
              <UpLoadImg v-model="rowData.bigImg"></UpLoadImg>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UpLoadImg from "@/components/upLoadImg.vue";
import { getBanner, setBanner } from "@/api/mainTitle.js";
export default {
  components: {
    UpLoadImg,
  },
  data() {
    return {
      tableData: null,
      dialogFormVisible: false,
      rowData: null,
    };
  },
  methods: {
    async fetchBanner() {
      const banner = await getBanner();
      this.tableData = banner.data;
    },
    editForm(rowData) {
      this.dialogFormVisible = true;//图标设置为可见
      this.rowData = { ...rowData }; //必须使用扩展运算符，不然取消时，数据无法还原
    },
    editFormSure() {
      console.log(this.rowData);
      setBanner(this.rowData.id ,this.rowData)
        .then(async (res) => {
          await this.fetchBanner(); //从服务器服务器获取新数据
          this.dialogFormVisible = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetchBanner();
  },
};
</script>

<style>
.el-table {
  margin: 0 auto;
}
</style>