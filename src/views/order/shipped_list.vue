<template>
  <div class="app-container order-container">
    <div class="filter-container">
      <el-form :inline="true"
        :model="orderSearch"
        class="order-form">
        <el-form-item label="订单编号">
          <el-input v-model="orderSearch.OrderCode"></el-input>
        </el-form-item>
        <el-form-item label="商品名">
          <el-input v-model="orderSearch.ProductName"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker v-model="selectTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="searchBtn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="orderList"
      v-loading="listLoading"
      element-loading-text="稍等..."
      border
      fit
      highlight-current-row
      @row-click="rowClick">
      <el-table-column prop="OrderCode"
        label="订单编码"
        align="center"
        width="200px"></el-table-column>
      <el-table-column prop="ProductName"
        label="产品名称"
        align="center"></el-table-column>
      <el-table-column label="支付方式"
        align="center">
        <template slot-scope="scope">
          {{scope.row.PayType | payTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="订单应支付金额"
        align="center"
        width="80px">
        <template slot-scope="scope">
          {{scope.row.PayType === 1? scope.row.PayAble + '元': scope.row.PayPoint + '积分'}}
        </template>
      </el-table-column>
      <el-table-column prop="CreateTime"
        label="创建时间"
        align="center"></el-table-column>
      <el-table-column prop="PayTime"
        label="支付时间"
        align="center">
        <template slot-scope="scope">
          {{scope.row.PayTime | payTimeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="Receiver.Name"
        label="收货人姓名"
        align="center"></el-table-column>
      <el-table-column prop="Receiver.Phone"
        label="收货人手机号"
        align="center"></el-table-column>
      <el-table-column prop="Receiver.Address"
        label="收货人地址"
        align="center"></el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="orderSearch.page"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="orderSearch.Take"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils';
import { orderPage } from '@/api/order';
const ExpressList = [
  { key: 1, label: '顺丰速运' },
  { key: 2, label: '邮政EMS' },
  { key: 3, label: '圆通快递' },
  { key: 4, label: '申通快递' },
  { key: 5, label: '中通快递' },
  { key: 6, label: '百世汇通' },
  { key: 7, label: '韵达快递' },
  { key: 8, label: '天天快递' }
];
export default {
  name: 'order_list',
  data() {
    return {
      IMAGE_API: process.env.IMAGE_API,
      selectTime: '',
      ExpressList,
      listQuery: {
        page: 1,
        OrderCode: '',
        ProductName: '',
        OrderStatus: 2,
        PayTimeStart: '1970-01-01',
        PayTimeEnd: parseTime(Date.now()),
        Skip: 0,
        Take: 20
      },
      orderSearch: {
        page: 1,
        OrderCode: '',
        ProductName: '',
        OrderStatus: 2,
        PayTimeStart: '',
        PayTimeEnd: '',
        Skip: 0,
        Take: 20
      },
      total: null,
      listLoading: false,
      orderList: []
    };
  },
  filters: {
    payTypeFilter(PayType) {
      return PayType === 1 ? '微信支付' : '积分支付';
    },
    payTimeFilter(time) {
      if (time === '1900-01-01 00:00') {
        return '——';
      } else {
        return time;
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      orderPage(this.listQuery).then(res => {
        if (res.Result) {
          this.listLoading = false;
          this.orderList = res.Value;
          this.total = res.Total;
        }
      });
    },
    searchBtn() {
      if (this.selectTime) {
        this.orderSearch.PayTimeStart = this.selectTime[0];
        this.orderSearch.PayTimeEnd = this.selectTime[1];
      } else {
        this.orderSearch.PayTimeStart = '1970-01-01';
        this.orderSearch.PayTimeEnd = parseTime(Date.now());
      }
      this.orderSearch.Skip = 0;
      this.listQuery = Object.assign({}, this.orderSearch);
      if (!this.listQuery.PayTimeStart) {
        this.listQuery.PayTimeStart = '1970-01-01';
      }
      if (!this.listQuery.PayTimeEnd) {
        this.listQuery.PayTimeEnd = parseTime(Date.now());
      }
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.Take = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.listQuery.Skip = --val * this.listQuery.Take;
      this.getList();
    },
    rowClick(row) {
      this.$router.push('/order/order_detail/' + row.OrderID);
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style>
.orderDetail {
  min-width: 262px;
  padding: 0 10px 0 30px;
  margin: 0 0 0 -1px;
  border-width: 0 0 0 1px;
}

.prodPic {
  width: 60px;
  height: 60px;
}
</style>
