<template>
  <div class="app-container">
    <el-form ref='addAdminForm'
      :model="addAdminForm"
      label-position="left"
      label-width="150px"
      style='margin-left:50px;'>
      <el-form-item label="管理员账号"
        prop="UserCode">
        <el-input placeholder="请填写管理员账号"
          style="width:220px"
          v-model="addAdminForm.UserCode"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码"
        prop="UserPwd">
        <el-input placeholder="请填写管理员密码"
          style="width:220px"
          type="password"
          v-model="addAdminForm.UserPwd"></el-input>
      </el-form-item>
      <el-form-item label="管理员名称"
        prop="UserName">
        <el-input placeholder="请填写管理员名称"
          style="width:220px"
          v-model="addAdminForm.UserName"></el-input>
      </el-form-item>

      <el-form-item label="管理员头像"
        prop="UserHeadUrl">
        <el-upload class="avatar-uploader"
          :action="uploadSingle"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="addAdminForm.UserHeadUrl"
            :src="imageUrl"
            class="avatar">
          <i v-else
            class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否是超级管理员">
        <el-select v-model="addAdminForm.UserSuper">
          <el-option key="true"
            value="true">是</el-option>
          <el-option key="false"
            value="false">否</el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer"
      class="dialog-footer">
      <el-button type="primary"
        @click="addBtn">添加</el-button>
      <el-button @click="cancelBtn">取消</el-button>
    </div>
  </div>

</template>
<script>
const uploadSingle = process.env.IMAGE_API + '/Picture/UploadSingle';
export default {
  name: 'Prod',
  data() {
    return {
      imageUrl: '',
      uploadSingle,
      dialogVisible: false,
      AlbumList: [],
      addAdminForm: {
        UserCode: '',
        UserPwd: null,
        UserName: '',
        UserHeadUrl: '',
        UserSuper: null,
        UserCreator: this.$store.state.user.id
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.addAdminForm.UserHeadUrl = file.response.Value;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleProdAlbumSuccess(res, file, fileList) {
      this.AlbumList = fileList;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      //  return isJPG && isLt2M;

      return isLt2M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addBtn() {
      this.$store.dispatch('AddUser', this.addAdminForm).then(res => {
        if (res.Result === 1) {
          this.$message({
            message: res.Message,
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/client_manage/admin_list');
          }, 1000);
        } else {
          this.$message({
            message: res.Message,
            type: 'error'
          });
        }
      });
    },
    cancelBtn() {
      this.$router.go(-1);
    }
  }
};
</script>
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
.dialog-footer {
  margin-left: 5%;
}
</style>
