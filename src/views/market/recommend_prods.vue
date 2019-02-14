<template>
  <div class="app-container">
    <div class="tableTitle">
      <div>排序</div>
      <div>商品名称</div>
      <div>商品图片</div>
      <div>状态</div>
      <div>添加时间</div>
      <div>操作</div>
    </div>
    <draggable :model="list" @update="datadragEnd" :options="{animation: 300,handle:'.dargDiv'}">

      <transition-group name="list-complete">
        <div v-for="(item,index) in list" :key="index" class="list">
          <div class="styleclass dargDiv">
            <div class="border">
              <span>{{index+1}}</span>
            </div>
            <div>
              <div class="cell">{{item.ProductName}}</div>
            </div>
            <div>
              <img class="prdPic" :src="item.ProductCover" alt="" />
            </div>
            <div>
              <span>{{item.Status}}</span>
            </div>
            <div>
              <span>{{item.CreateTime}}</span>
            </div>
            <div>
              <el-button class="btn cancelBtn" type="danger" @click="deleteBtn(index, item.RecommendID)">删除</el-button>
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
    recommendList,
    recommendSort,
    deleteRecommend
  } from '@/api/market';
  import draggable from 'vuedraggable';
  import Sortable from 'sortablejs';
  // import listJson from '@/views/recommend/recommend.json';
  export default {
    name: 'recommend_prods',
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
        recommendList(data).then(res => {
          if (res.Result === 1) {
            this.list = res.Value;
            this.list.forEach(item => {
              if (item.ProductCover) {
                item.ProductCover = process.env.IMAGE_API + item.ProductCover;
              } else {
                item.ProductCover = '';
              }
            });
            this.listLoading = true;
          }
        });
      },
      deleteBtn(index, id) {
        const data = {
          RecommendID: id,
          AdminID: this.AdminID
        };
        deleteRecommend(data).then(res => {
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
      datadragEnd(evt) {
        const data = {
          RecommendID1: this.list[evt.oldIndex].RecommendID,
          RecommendID2: this.list[evt.newIndex].RecommendID
        };
        recommendSort(data).then(res => {
          if (res.Result) {
            this.$message({
              message: '排序成功',
              type: 'success'
            });
          }
        });
      },
      handleSizeChange() {},
      handleCurrentChange() {}
    },
    created() {
      this.getList();
    }
  };

</script>
<style lang="scss">
  .pagination-container {
    float: right;
    margin-top: 30px;
  }

  .prodPic {
    max-height: 100px;
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
        .prdPic {
          width: 100px;
          height: 100px;
          vertical-align: middle;
        }
      }
      .cell {
        vertical-align: middle;
        display: inline-block;
        box-sizing: border-box;
        white-space: normal;
        word-break: break-all;
        line-height: 23px;
        border: none;
      }
    }
  }

</style>
