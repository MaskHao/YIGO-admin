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
        <el-form-item label="订单状态">
          <el-select style="width: 90px"
            class="filter-item"
            v-model="orderSearch.OrderStatus">
            <el-option v-for="item in orderStatusList"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
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
      <el-table-column label="订单状态"
        align="center">
        <template slot-scope="scope">
          {{scope.row.Status | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column label="支付方式"
        align="center">
        <template slot-scope="scope">
          {{scope.row.PayType | payTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column label="支付金额"
        align="center"
        width="80px">
        <template slot-scope="scope">
          {{scope.row | typeFilter}}
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
const orderStatusList = [
  {
    key: 99,
    label: '全部'
  },
  {
    key: 0,
    label: '待付款'
  },
  {
    key: 1,
    label: '已付款'
  },
  {
    key: 2,
    label: '已发货'
  },
  {
    key: 3,
    label: '已收货'
  },
  {
    key: 4,
    label: '已评价'
  },
  {
    key: 5,
    label: '已结算'
  },
  {
    key: -1,
    label: '已取消'
  },
  {
    key: -2,
    label: '已申请退款'
  },
  {
    key: -3,
    label: '已退款'
  },
  {
    key: -4,
    label: '退款申请已拒绝'
  },
  {
    key: -9,
    label: '已过期'
  },
  {
    key: -10,
    label: '已关闭'
  }
];
const orderStatus = orderStatusList.reduce((acc, cur) => {
  acc[cur.key] = cur.label;
  return acc;
}, {});
export default {
  name: 'order_list',
  data() {
    return {
      IMAGE_API: process.env.IMAGE_API,
      orderStatusList,
      selectTime: '',
      listQuery: {
        page: 1,
        OrderCode: '',
        ProductName: '',
        OrderStatus: 99,
        PayTimeStart: '1970-01-01',
        PayTimeEnd: parseTime(Date.now()),
        Skip: 0,
        Take: 20
      },
      orderSearch: {
        page: 1,
        OrderCode: '',
        ProductName: '',
        OrderStatus: 99,
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
    statusFilter(status) {
      return orderStatus[status];
    },
    payTypeFilter(PayType) {
      return PayType === 1 ? '微信支付' : '积分支付';
    },
    typeFilter(row) {
      return row.PayType === 1 ? row.PayAble + '元' : row.PayPoint + '积分';
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
