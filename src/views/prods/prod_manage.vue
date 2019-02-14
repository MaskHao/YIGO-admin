<template>
  <div class="app-container">
    <el-button type="primary"
      @click="addProd">添加</el-button>
    <el-form :inline="true"
      :model="prodSearch"
      ref='prodSearch'
      class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="prodSearch.ProdName"></el-input>
      </el-form-item>
      <el-form-item label="最小售价">
        <el-input type="number"
          style="width:100px"
          v-model="prodSearch.ProdMinPrice"></el-input>
      </el-form-item>
      <el-form-item label="最大售价">
        <el-input type="number"
          style="width:100px"
          v-model="prodSearch.ProdMaxPrice"></el-input>
      </el-form-item>
      <el-form-item label="产品状态">
        <el-select v-model="prodSearch.ProdStatus"
          style="width:100px">
          <el-option v-for="(item, index) in prodStatusList"
            :key="index"
            :value="item.key"
            :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="prodSearch.ProdBeginTime"
          type="datetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="prodSearch.ProdEndTime"
          type="datetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="searchBtn">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="prodsList"
      v-loading='listLoading'
      element-loading-text="稍等..."
      border
      fit
      highlight-current-row
      style="width: 100%"
      @row-click="prodInfo">
      <el-table-column align="center"
        label='商品名称'
        prop="Name">
      </el-table-column>
      <el-table-column align="center"
        label='商品主图'>
        <template slot-scope="scope">
          <img style="width:100px;height:100px;display:inline-block"
            :src="IMAGE_API + scope.row.Cover"
            alt="">
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='售价'
        prop="SellPrice">
      </el-table-column>
      <el-table-column align="center"
        label='市场价'
        prop="MarketPrice">
      </el-table-column>
      <el-table-column align="center"
        label='积分价'
        prop="PointPrice">
      </el-table-column>
      <el-table-column align="center"
        label='单位'
        prop="Unit">
      </el-table-column>
      <el-table-column align="center"
        label='创建时间'
        prop="CreateTime">
      </el-table-column>
      <el-table-column align="center"
        label='状态'
        prop="StatusName">
        <template slot-scope="scope">
          {{scope.row.Status | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='操作'>
        <template slot-scope="scope">
          <!-- 已审核或已下架 => 上架 -->
          <el-button class="handle-btn"
            type="primary"
            size="medium"
            v-if="scope.row.Status === 2 || scope.row.Status === -2"
            @click.stop='onProd(scope.row, scope.row.ProductID)'>上架</el-button>
          <!-- 已上架 -->
          <el-button class="handle-btn"
            type="warning"
            size="medium"
            v-if="scope.row.Status === 3"
            @click.stop="offProd(scope.row, scope.row.ProductID)">下架</el-button>
          <!-- 已推荐 -->
          <el-tag type="success"
            v-if="scope.row.Recommend"
            @click.native.stop>已推荐</el-tag>
          <!-- 已上架商品才可以推荐该商品 -->
          <el-button class="handle-btn"
            type="success"
            size="medium"
            v-if="scope.row.Status== 3 && !scope.row.Recommend"
            @click.stop="AddRecommend(scope.row, scope.row.ProductID)">推荐</el-button>
          <!-- 删除商品 -->
          <el-button class="handle-btn"
            type="danger"
            size="medium"
            @click.native.stop="deleteProd(scope.$index, prodsList, scope.row.ProductID)">删除</el-button>
          <el-button class="handle-btn"
            size="medium"
            @click.native.stop="updateProd(scope.row.ProductID)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="prodSearch.page"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="prodSearch.ProdTake"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { prodPage, prodDel, prodOnOff } from '@/api/prods';
import { addRecommend } from '@/api/market';
import { parseTime } from '@/utils/index';

const prodStatusList = [
  {
    key: 99,
    label: '全部'
  },
  {
    key: 0,
    label: '待提交'
  },
  {
    key: 1,
    label: '待审核'
  },
  {
    key: 2,
    label: '已审核'
  },
  {
    key: 3,
    label: '已上架'
  },
  {
    key: -1,
    label: '已拒绝'
  },
  {
    key: -2,
    label: '已下架'
  },
  {
    key: -3,
    label: '已作废'
  }
];
const prodStatus = prodStatusList.reduce((acc, cur) => {
  acc[cur.key] = cur.label;
  return acc;
}, {});
export default {
  data() {
    return {
      listQuery: {
        page: 1,
        ProdName: '',
        ProdMinPrice: 0,
        ProdMaxPrice: 0,
        ProdStatus: 99,
        ProdBeginTime: '1970-01-01',
        ProdEndTime: parseTime(Date.now()),
        ProdSkip: 0,
        ProdTake: 10
      },
      prodSearch: {
        page: 1,
        ProdName: '',
        ProdMinPrice: null,
        ProdMaxPrice: null,
        ProdStatus: 99,
        ProdBeginTime: null,
        ProdEndTime: null,
        ProdSkip: 0,
        ProdTake: 10
      },
      listLoading: false,
      prodsList: [],
      total: null,
      prodStatusList,
      prodStatus,
      IMAGE_API: ''
    };
  },
  filters: {
    statusFilter(status) {
      return prodStatus[status];
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      prodPage(this.listQuery).then(res => {
        if (res.Result === 1) {
          this.listLoading = false;
          this.prodsList = res.Value;
          this.total = res.Total;
        }
      });
    },
    searchBtn() {
      this.prodSearch.ProdSkip = 0;
      this.listQuery = Object.assign({}, this.prodSearch);
      if (!this.listQuery.ProdMinPrice) {
        this.listQuery.ProdMinPrice = 0;
      }
      if (!this.listQuery.ProdMaxPrice) {
        this.listQuery.ProdMaxPrice = 0;
      }
      if (!this.listQuery.ProdBeginTime) {
        this.listQuery.ProdBeginTime = '1970-01-01';
      }
      if (!this.listQuery.ProdEndTime) {
        this.listQuery.ProdEndTime = parseTime(Date.now());
      }
      this.$store
        .dispatch('SetQuery', this.listQuery)
        .then(() => {
          this.loading = false;
          this.$router.push({ path: '/' });
        })
        .catch(() => {
          this.loading = false;
        });
      this.getList();
    },

    // 添加产品
    addProd() {
      this.$router.push({
        path: 'prod_add'
      });
    },

    // 产品详情
    prodInfo(row) {
      this.$router.push('/prods/prod_detail/' + row.ProductID);
    },
    // 上架
    onProd(row, ProductID) {
      prodOnOff({
        ProdID: ProductID,
        OnOff: true
      }).then(res => {
        if (res.Result === 1) {
          this.$message({
            message: '产品已上架 !',
            type: 'success'
          });
          row.Status = 3;
        }
      });
    },

    // 下架
    offProd(row, ProductID) {
      prodOnOff({
        ProdID: ProductID,
        OnOff: false
      }).then(res => {
        if (res.Result === 1) {
          this.$message({
            message: '产品已下架 !',
            type: 'success'
          });
          row.Status = -2;
        }
      });
    },

    // 修改产品
    updateProd(prodID) {
      this.$router.push('/prods/prod_update/' + prodID);
    },

    // 删除商品
    deleteProd(index, rows, prodID) {
      prodDel({
        ProdId: prodID
      }).then(res => {
        if (res.Result === 1) {
          this.$message({
            message: '删除成功 !',
            type: 'success'
          });
          rows.splice(index, 1);
        }
      });
    },

    // 推荐商品
    AddRecommend(row, ProductID) {
      addRecommend({
        ProductID: ProductID,
        AdminID: this.$store.state.user.id
      }).then(res => {
        if (res.Result === 1) {
          this.$message({
            message: '已将该产品新增为推荐商品！',
            type: 'success'
          });
          row.Recommend = true;
        }
      });
    },
    handleSizeChange(val) {
      this.listQuery.ProdTake = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.listQuery.ProdSkip = --val * this.listQuery.ProdTake;
      this.getList();
    }
  },

  created() {
    this.getList();
  },
  mounted() {
    this.IMAGE_API = process.env.IMAGE_API; // 接口返回图片需域名拼接
  }
};
</script>
<style lang="scss">
.prodPic {
  max-height: 100px;
}

.handle-btn {
  padding: 3px 5px;
}

.pagination-container {
  margin-top: 20px;
  text-align: center;
}
</style>
