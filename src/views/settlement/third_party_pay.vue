<template>
  <div class="app-container settlement-container">
    <div class="filter-container">
      <el-form :inline="true"
        :model="settlement"
        class="settlement-form">
        <el-form-item label="合作平台">
          <el-input v-model="settlement.prods"></el-input>
          <span>最后一次结算时间为{time} </span>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="settlement.startTime"
            type="datetime"
            placeholder="选择日期时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-date-picker v-model="settlement.endTime"
            type="datetime"
            placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="settleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="6">
          <span>{{startTime}}至{{endTime}}</span>
        </el-col>
        <el-col :span="6">
          <span>绩算总金额为{{account}}</span>
        </el-col>
        <el-col :span="6">
          <span>尚未结算</span>
        </el-col>
        <el-col :span="6">
          <el-button type="primary"
            @click="exportExcel">生成绩算单</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list"
      v-loading="listLoading"
      element-loading-text="稍等..."
      border
      fit
      highlight-current-row>
      <el-table-column prop="platformName"
        label="合作平台"></el-table-column>
      <el-table-column prop="number"
        label="交易数量"></el-table-column>
      <el-table-column prop="sun"
        label="交易金额"></el-table-column>
      <el-table-column prop="serviceCharge"
        label="交易手续费"></el-table-column>
      <el-table-column prop="getMoney"
        label="易购待收款"></el-table-column>
      <el-table-column prop="payMoney"
        label="易购待付款"></el-table-column>
      <el-table-column prop="startTime"
        label="开始时间"></el-table-column>
      <el-table-column prop="endTime"
        label="结束时间"
        width="100"></el-table-column>
      <el-table-column prop="state"
        label="结算状态"></el-table-column>
      <el-table-column prop="remitTime"
        label="打款时间"></el-table-column>
      <el-table-column prop="billingTime"
        label="开票时间"></el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: 'thirdPartyPay',
  props: {},
  data() {
    return {
      settlement: {
        username: '',
        tel: '',
        startTime: null,
        endTime: null,
        gender: null,
        address: '',
        userSource: ''
      },
      listLoading: false,
      list: [
        {
          platformName: '招商平台',
          number: 3526,
          sun: 2221,
          serviceCharge: 22451,
          getMoney: 231,
          payMoney: 1312,
          startTime: '2018-04-25',
          endTime: '2018-05-01',
          state: '0',
          remitTime: '2018-01-01',
          billingTime: '2018-06-12'
        }
      ]
    };
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    settleSearch() {},
    exportExcel() {
      console.log('导出');
    }
  }
  // computed() {
  // }
};
</script>
<style>
</style>
