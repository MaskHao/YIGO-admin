<template>
  <div class="app-container">
    <el-form ref='BannerForm'
      :model="BannerForm"
      label-position="left"
      label-width="120px"
      style=' margin-left:50px;'>
      <el-form-item label="横幅名称"
        prop="BannName">
        <el-input style="width:220px"
          v-model="BannerForm.BannName"></el-input>
      </el-form-item>
      <el-form-item label="横幅主图"
        prop="BannerCover">
        <el-upload class="avatar-uploader"
          :action="uploadSingle"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl"
            :src="imageUrl"
            class="avatar">
          <i v-else
            class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="横幅简介"
        prop="BannDescribe">
        <el-input style="width:450px"
          type="textarea"
          v-model="BannerForm.BannDescribe"></el-input>
      </el-form-item>
      <el-form-item label="横幅图片链接"
        prop="BannLink">
        <el-input class="BannerPrice"
          style="width:260px"
          v-model="BannerForm.BannLink"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
      class="dialog-footer">
      <el-button type="primary"
        @click="BannerBtn">添加</el-button>
      <el-button @click="cancelBtn">取消</el-button>
    </div>
  </div>

</template>
<script>
import { addBranner } from '@/api/market';
export default {
  name: 'Banner',
  data() {
    return {
      uploadSingle: process.env.IMAGE_API + '/Picture/UploadSingle',
      imageUrl: '',
      dialogVisible: false,
      BannerForm: {
        BannName: '',
        BannPicture: '',
        BannDescribe: '',
        BannLink: '',
        AdminID: this.$store.state.user.id
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.BannerForm.BannPicture = file.response.Value;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      // this.$message.error('上传图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      //  return isJPG && isLt2M;
      return isLt2M;
    },

    BannerBtn() {
      addBranner(this.BannerForm).then(res => {
        if (res.Result === 1) {
          this.$message({
            message: res.Message,
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/market/banner_manage');
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
  width: 460px;
  height: 178px;
  display: block;
}
.dialog-footer {
  margin-left: 5%;
}
</style>
