<template>
  <div class="task">
    <el-table
      :data="taskList"
      style="width: 100%"
      :default-sort="{
        prop: 'taskType',
        order: 'descending',
      }"
      @row-dblclick="schedule"
      @row-contextmenu="changeTask"
    >
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.taskStatus ? "完成" : "未完成" }}
        </template>
      </el-table-column>
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.taskName }}
        </template>
      </el-table-column>
      <el-table-column
        prop="taskType"
        label="任务类型"
        :sortable="true"
        :sort-method="sort"
      >
        <template slot-scope="scope">
          {{ scope.row.taskType }}
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间">
        <template slot-scope="scope">
          {{ transformTimestamp(scope.row.createDate) }}
        </template>
      </el-table-column>
      <el-table-column label="完成时间">
        <template slot-scope="scope">
          {{ getAchieveTime(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="是否完成">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.taskStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="achieveTask(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="primary"
      size="medium"
      style="width: 100%"
      @click="
        visible = true;
        addOrChange = 'add';
      "
      >添加</el-button
    >

    <el-dialog title="添加任务或者修改任务" :visible="visible">
      <el-form :model="newTask">
        <el-form-item label="任务名称">
          <el-input v-model="newTask.taskName"></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-select v-model="newTask.taskType" placeholder="任务类型">
            <el-option
              v-for="item of taskType"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            visible = false;
            newTask = {
              taskName: '',
              taskType: '',
            };
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="event">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTaskApi,
  addTaskApi,
  setTaskApi,
  getTaskTypeApi,
} from "@/api/aboutMe";
import transformTimestamp from "@/utils/transformTimestamps";
export default {
  data() {
    return {
      visible: false,
      taskList: [],
      newTask: {
        taskName: "",
        taskType: "",
      },
      taskType: [],
      addOrChange: "add",
      value: false
    };
  },
  methods: {
    transformTimestamp,
    async submit() {
      this.taskList = (await addTaskApi(this.newTask)).data;
    },
    sort(a, b) {
      const switchObj = {
        第一序列: 3,
        第二序列: 2,
        日常: 1,
      };
      a = switchObj[a.taskType];
      b = switchObj[b.taskType];
      return a - b;
    },
    async achieveTask(row) {
      const task = {
        ...row,
      };
      console.log(task);
      if (task.taskStatus) {
        task.achieveTime = new Date().getTime();
      } else {
        task.achieveTime = false;
      }
      this.taskList = (await setTaskApi(task)).data;
    },
    async changeTask(row, column, event) {
      event.preventDefault();
      this.visible = true;
      this.addOrChange = "change";
      this.newTask = { ...row };
    },
    async event() {
      if (this.addOrChange === "add") {
        this.submit();
      } else {
        this.taskList = (await setTaskApi(this.newTask)).data;
      }
      this.newTask = {
        taskName: "",
        taskType: "",
      };
      this.visible = false;
    },
    getAchieveTime(row) {
      if (row.taskStatus) {
        return this.transformTimestamp(row.achieveTime);
      } else {
        if (row.taskType === "第一序列") return "几十年后的某一天";
        else if (row.taskType === "第二序列") return "几年后的某一天";
        else if (row.taskType === "日常") return "某一天";
      }
    },
  },
  async created() {
    this.taskList = await getTaskApi();
    this.taskList = this.taskList.data.data;
    this.taskType = (await getTaskTypeApi()).data;
    console.log("任务列表", this.taskList);
  },
};
</script>

<style lang="scss" scoped>
</style>