<template>
  <div class="app-container">
    <el-form ref='adminForm'
      :model="adminForm"
      label-position="left"
      label-width="150px"
      style='margin-left:50px;'>
      <el-form-item label="管理员账号">
        {{adminForm.UserCode}}
      </el-form-item>
      <el-form-item label="管理员新密码"
        prop="UserPwd">
        <el-input placeholder="请填写管理员新密码"
          style="width:220px"
          type="password"
          v-model="adminForm.UserPwd"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
      class="dialog-footer">
      <el-button type="primary"
        @click="editBtn">修改</el-button>
      <el-button @click="cancelBtn">取消</el-button>
    </div>
  </div>

</template>
<script>
import { getUser } from '@/utils/auth';
export default {
  name: 'Prod',
  data() {
    return {
      adminForm: {
        UserCode: getUser(),
        UserPwd: null
      }
    };
  },
  methods: {
    editBtn() {
      const UserId = this.$store.state.user.id;
      this.$store
        .dispatch('UpdatePwd', {
          UserId: UserId,
          UserPwd: this.adminForm.UserPwd
        })
        .then(res => {
          if (res.Result === 1) {
            this.$message({
              message: res.Message,
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/');
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
      this.$router.push('/');
    }
  }
  // mounted() {
  //   this.adminForm.UserCode = getUser();
  // }
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
