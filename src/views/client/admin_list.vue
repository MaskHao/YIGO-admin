<template>
  <div class="app-container client-container">
    <el-button type="primary" @click="addAdminBtn">添加管理员</el-button>
    <el-table :data="list" v-loading="listLoading" element-loading-text="稍等..." border fit highlight-current-row>
      <el-table-column prop="AdminId" label="管理员ID"></el-table-column>
      <el-table-column prop="AdminUserCode" label="管理员账号"></el-table-column>
      <el-table-column prop="AdminName" label="管理员名称"></el-table-column>
      <el-table-column align="center" label="管理员头像">
        <template slot-scope="scope">
          <div class="headUrl" v-if="scope.row.AdminUserHeadUrl" :style="{backgroundImage:`url(${imgURL + scope.row.AdminUserHeadUrl})`}"></div>
          <div class="headUrl" v-else :style="{backgroundImage:`url(${defaultHeadUrl})`}"></div>
        </template>
      </el-table-column>
      <el-table-column prop="AdminUserCreateTime" label="管理员创建时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" :disabled="scope.row.AdminUserSuper" @click="deleteBtn(scope.$index, scope.row.AdminId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {
    systemList,
    deleteSystem
  } from '@/api/user';
  export default {
    name: 'client-manage',
    data() {
      return {
        defaultHeadUrl: '/static/user.jpg',
        imgURL: process.env.IMAGE_API,
        AdminID: this.$store.state.user.id,
        client: {
          username: '',
          tel: '',
          startTime: null,
          endTime: null,
          address: '',
          userSource: ''
        },
        listLoading: false,
        list: []
      };
    },
    methods: {
      getList() {
        systemList({
          AdminID: this.AdminID
        }).then(res => {
          this.list = res.Value;
        });
      },
      addAdminBtn() {
        this.$router.push('/client_manage/add_admin');
      },
      deleteBtn(index, UserId) {
        deleteSystem({
          UserId: UserId
        }).then(res => {
          if (res.Result) {
            this.$message({
              message: '已删除该管理员',
              type: 'success'
            });
            this.splice(index, 1);
          }
        });
      }
    },
    created() {
      this.getList();
    }
  };

</script>
<style>
  .headUrl {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-color: #f6f8f9;
    display: inline-block;
  }

</style>
