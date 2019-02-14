<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12"
        class="orderDetail">
        <div class="grid-content bg-purple">订单产品信息</div>
        <el-row>
          <el-col :span="5"
            class="title">订单状态:</el-col>
          <el-col :span="16">{{orderDetail.StatusName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5"
            class="title">订单ID:</el-col>
          <el-col :span="16">{{orderDetail.OrderID}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5"
            class="title">购买时间:</el-col>
          <el-col :span="16">{{orderDetail.CreateTime}}</el-col>
        </el-row>
        <template v-if="orderDetail.PayType === 1">
          <el-row>
            <el-col :span="5"
              class="title">付款金额:</el-col>
            <el-col :span="16">{{orderDetail.Payable}}元</el-col>
          </el-row>
          <el-row>
            <el-col :span="5"
              class="title">赠送积分:</el-col>
            <el-col :span="16">{{orderDetail.Point}}积分</el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row>
            <el-col :span="5"
              class="title">积分支付:</el-col>
            <el-col :span="16">{{orderDetail.PointAmount}}积分</el-col>
          </el-row>
        </template>

      </el-col>
      <el-col :span="12"
        class="orderDetail"
        v-if="orderDetail.Receiver">
        <div class="grid-content bg-purple-light">收货人信息</div>
        <el-row>
          <el-col :span="5"
            class="title">收货人:</el-col>
          <el-col :span="18">{{orderDetail.Receiver.Name}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5"
            class="title">地址:</el-col>
          <el-col :span="18">{{orderDetail.Receiver.Address}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5"
            class="title">手机号码:</el-col>
          <el-col :span="18">{{orderDetail.Receiver.Phone}}</el-col>
        </el-row>
        <template v-if="orderDetail.Status === 2 ">
      <el-row>
        <el-col :span="5"
          class="title">快递公司:</el-col>
        <el-col :span="18">{{orderDetail.Express}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"
          class="title">快递单号:</el-col>
        <el-col :span="18">{{orderDetail.ExpressCode}}</el-col>
      </el-row>
    </template>
      </el-col>
    </el-row>
    
    <p class="title">订单列表：</p>
    <el-table :data="orderDetail.Products"
      border>
      <el-table-column align="center"
        prop="ProductName"
        label="产品名称">
      </el-table-column>
      <el-table-column align="center"
        prop="ProductName"
        label="产品图">
        <template slot-scope="scope">
          <img class="prodPic"
            :src="IMAGE_API + scope.row.ProductCover"
            alt="">
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="产品单价">
        <template slot-scope="scope">
          {{scope.row.ProductPrice}}元
        </template>
      </el-table-column>
      <el-table-column align="center"
        prop="ProcuctQuantity"
        label="已购买数量">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { orderInfo } from '@/api/order';
export default {
  data() {
    return {
      IMAGE_API: process.env.IMAGE_API,
      orderDetail: []
    };
  },
  components: {},
  created() {
    orderInfo({
      OrderID: this.$route.params.OrderID
    }).then(res => {
      if (res.Result) {
        this.orderDetail = res.Value;
      }
    });
  }
};
</script>

<style scoped>
.app-container {
  color: #606266;
}
.grid-content {
  font-size: 20px;
  margin-bottom: 10px;
}
.title {
  color: #909399;
}
.el-col {
  margin-bottom: 5px;
}
.prodPic {
  width: 80px;
}
</style>
