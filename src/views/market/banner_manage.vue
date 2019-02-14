<template>
  <div class="app-container">
    <el-button type="primary" @click="addBanner">添加Banner</el-button>
    <div class="tableTitle">
      <div>排序</div>
      <div>横幅名称</div>
      <div>横幅图片</div>
      <div>横幅链接地址</div>
      <div>操作</div>
    </div>
    <draggable :model="list" :move="getdata" @update="datadragEnd" :options="{animation: 300,handle:'.dargDiv'}">
      <transition-group name="list-complete">
        <div v-for="(item,index) in list" :key="index" class="list">
          <div class="styleclass dargDiv">
            <div>
              <span>{{index+1}}</span>
            </div>
            <div>
              <span>{{item.BrannerName}}</span>
            </div>
            <div>
              <img class="bannerPic" :src="item.BannerPicture" alt="" />
            </div>
            <div>
              <a class="BannerLink" target="_blank" :href="item.BannerLink">{{item.BannerLink}}</a>
            </div>
            <div>
              <el-button class="btn cancelBtn" type="danger" @click="deleteBtn(index, item.BannerID)">删除</el-button>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="RdSearch.page"
        :page-sizes="[10,20,30, 50]" :page-size="RdSearch.limit" layout=" sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    BannerList,
    brannerSort,
    deleteBranner
  } from '@/api/market';
  import draggable from 'vuedraggable';
  import Sortable from 'sortablejs';
  export default {
    name: 'banner_manage',
    data() {
      return {
        RdSearch: {
          page: 1,
          limit: 20
        },
        IMAGE_API: process.env.IMAGE_API,
        AdminID: this.$store.state.user.id,
        listLoading: false,
        list: []
      };
    },

    components: {
      draggable,
      Sortable
    },
    methods: {
      getList() {
        const data = {
          AdminID: this.AdminID
        };
        BannerList(data).then(res => {
          if (res.Result === 1) {
            this.list = res.Value;
            this.list.forEach(item => {
              if (item.BannerPicture) {
                item.BannerPicture = process.env.IMAGE_API + item.BannerPicture;
              } else {
                item.BannerPicture = '';
              }
            });
            this.listLoading = true;
          }
        });
      },
      addBanner() {
        this.$router.push({
          path: 'add_banner'
        });
      },
      deleteBtn(index, id) {
        const data = {
          BannId: id,
          AdminID: this.AdminID
        };
        deleteBranner(data).then(res => {
          if (res.Result) {
            this.$message({
              message: res.Message,
              type: 'success'
            });
            this.list.splice(index, 1);
          } else {
            this.$message({
              message: res.Message,
              type: 'error'
            });
          }
        });
      },
      getdata(evt) {},
      datadragEnd(evt) {
        const data = {
          BrannerID1: this.list[evt.oldIndex].BannerID,
          BrannerID2: this.list[evt.newIndex].BannerID
        };
        brannerSort(data).then(res => {});
      },
      handleSizeChange() {},
      handleCurrentChange() {}
    },
    created(index, id) {
      this.getList();
    }
  };

</script>
<style lang="scss">
  .pagination-container {
    float: right;
    margin-top: 30px;
  }

  .tableTitle {
    display: flex;
    width: 100%;
    line-height: 40px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    div:nth-child(1) {
      border-left: 1px solid #eee;
    }
    div {
      flex: 1;
      text-align: center;
      word-wrap: normal;
      text-overflow: ellipsis;
      vertical-align: middle;
      width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      font-size: 12px;
      color: #909399;
      border-right: 1px solid #eee;
    }
  }

  .list {
    .styleclass {
      display: flex;
      width: 100%;
      div:nth-child(1) {
        border-left: 1px solid #eee;
      }
      div {
        line-height: 100px;
        flex: 1;
        text-align: center;
        word-wrap: normal;
        text-overflow: ellipsis;
        vertical-align: middle;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 12px;
        color: #909399;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        vertical-align: text-top;
        .bannerPic {
          width: 200px;
          height: 100px;
          vertical-align: middle;
        }
      }
    }
    .BannerLink {
      display: inline-block;
      vertical-align: middle;
      width: 120px;
      overflow: hidden;
      /*超出部分隐藏*/
      white-space: nowrap;
      /*不换行*/
      text-overflow: ellipsis;
      /*超出部分文字以...显示*/
    }
  }

</style>
