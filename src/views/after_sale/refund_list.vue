<template>
  <div class="app-container order-container">
    <div class="filter-container">
      <el-form :inline="true"
        :model="refundSearch"
        class="order-form">
        <el-form-item label="	订单编号">
          <el-input v-model="refundSearch.OrderCode"></el-input>
        </el-form-item>
        <el-form-item label="退款原因">
          <el-select style="width: 90px"
            class="filter-item"
            v-model="refundSearch.Reason">
            <el-option v-for="item in ReasonList"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退款状态">
          <el-select style="width: 90px"
            class="filter-item"
            v-model="refundSearch.Status">
            <el-option v-for="item in StatusList"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
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
    <el-table :data="refundList"
      v-loading="listLoading"
      element-loading-text="稍等..."
      border
      fit
      highlight-current-row
      @row-click="rowClick">
      <el-table-column prop="OrderCode"
        label="订单编码"
        align="center"></el-table-column>
      <el-table-column prop="ProductName"
        label="产品名称"
        align="center"></el-table-column>
      <el-table-column prop="RefundAmount"
        label="订单应支付金额"
        align="center"
        width="80px"></el-table-column>
      <el-table-column prop="StatusName"
        label="退款状态"
        align="center">
      </el-table-column>
      <el-table-column prop="ReasonName"
        label="退款原因"
        align="center">
      </el-table-column>
      <el-table-column prop="ApplyTime"
        label="申请时间"
        align="center"></el-table-column>
      <el-table-column prop="Name"
        label="收货人姓名"
        align="center"></el-table-column>
      <el-table-column prop="Phone"
        label="收货人手机号"
        align="center"></el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="refundSearch.page"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="refundSearch.Take"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils';
import { applyRefundPage } from '@/api/after_sale';
const ReasonList = [
  { key: 99, label: '全部' },
  { key: 1, label: '多拍/拍错/不想要' },
  { key: 2, label: '卖家缺货' },
  { key: 3, label: '长时间未发货' },
  { key: 4, label: '商品错发/漏发' },
  { key: 5, label: '商品质量问题' },
  { key: 6, label: '7天无理由退货' }
];
const StatusList = [
  { key: 99, label: '全部' },
  { key: 0, label: '待确认' },
  { key: 1, label: '已同意' },
  { key: 2, label: '已发货' },
  { key: -1, label: '卖家拒绝退款申请' },
  { key: -3, label: '已退款' }
];
const Status = StatusList.reduce((acc, cur) => {
  acc[cur.key] = cur.label;
  return acc;
}, {});
export default {
  name: 'order-manage',
  data() {
    return {
      IMAGE_API: process.env.IMAGE_API,
      ReasonList,
      StatusList,
      selectTime: '',
      listQuery: {
        page: 1,
        OrderCode: '',
        Reason: 99,
        Status: 99,
        ApplyBegin: '1970-01-01',
        ApplyEnd: parseTime(Date.now()),
        Skip: 0,
        Take: 20
      },
      refundSearch: {
        page: 1,
        OrderCode: '',
        Reason: 99,
        Status: 99,
        ApplyBegin: '',
        ApplyEnd: '',
        Skip: 0,
        Take: 20
      },
      total: null,
      listLoading: false,
      refundList: []
    };
  },
  filters: {
    statusFilter(status) {
      return Status[status];
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
      applyRefundPage(this.listQuery).then(res => {
        if (res.Result) {
          this.listLoading = false;
          this.refundList = res.Value;
          this.total = res.Total;
        }
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    searchBtn() {
      if (this.selectTime) {
        this.refundSearch.ApplyBegin = this.selectTime[0];
        this.refundSearch.ApplyEnd = this.selectTime[1];
      } else {
        this.refundSearch.ApplyBegin = '1970-01-01';
        this.refundSearch.ApplyEnd = parseTime(Date.now());
      }
      this.refundSearch.Skip = 0;
      this.listQuery = Object.assign({}, this.refundSearch);
      if (!this.listQuery.ApplyBegin) {
        this.listQuery.ApplyBegin = '1970-01-01';
      }
      if (!this.listQuery.ApplyEnd) {
        this.listQuery.ApplyEnd = parseTime(Date.now());
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
      this.$router.push('/after_sale/refund_detail/' + row.RefundID);
    }
  },
  created() {
    this.getList();
  }
};
</script>
