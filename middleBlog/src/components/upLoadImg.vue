<template>
  <el-upload
    class="avatar-uploader"
    action="/api/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="header"
  >
  <!-- 如果有图片就显示图片，没有就显示十字 -->
    <img v-if="value" :src="value" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script>
export default {
    props:{
        value: {
            type: String,
            default: null
        }
    },
    methods:{
        handleAvatarSuccess(res){
            this.$emit("input", res);
        }
    },
    computed:{
        header(){
            return {
                Authorization: "Bearer " + localStorage.getItem("adminData")
            }
        }
    }
};
</script>