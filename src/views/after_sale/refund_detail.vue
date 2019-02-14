<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- 订单信息 -->
      <el-col :span="12"
        class="refundDetail">
        <div class="grid-content bg-purple">退款信息</div>
        <el-row>
          <el-col :span="6"
            class="title">退款状态:</el-col>
          <el-col :span="16">{{refundDetail.StatusName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
            class="title">订单ID:</el-col>
          <el-col :span="16">{{refundDetail.OrderID}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
            class="title">订单编码:</el-col>
          <el-col :span="16">{{refundDetail.OrderCode}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
            class="title">申请退款时间:</el-col>
          <el-col :span="16">{{refundDetail.ApplyTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
            class="title">退款金额:</el-col>
          <el-col :span="16">{{refundDetail.RefundAmount}}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
            class="title">退款原因:</el-col>
          <el-col :span="16">{{refundDetail.ReasonName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
            class="title">退款原因补充:</el-col>
          <el-col :span="16">{{refundDetail.ReasonAdd}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
            class="title">退款原因补充图片:</el-col>
          <el-col :span="16">
            <img v-if="refundDetail.ReasonAddPics"
              class="ReasonAddPics"
              style="width:80px"
              :src="IMAGE_API + refundDetail.ReasonAddPics"
              alt="退款原因补充图片"></el-col>
        </el-row>
      </el-col>
      <!-- 收货人信息 -->
      <el-col :span="12"
        class="Receiver">
        <div class="grid-content bg-purple-light">收货人信息</div>
        <el-row>
          <el-col :span="5"
            class="title">订单收货人姓名:</el-col>
          <el-col :span="18">{{refundDetail.ReceiverName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5"
            class="title">订单收货地址:</el-col>
          <el-col :span="18">{{refundDetail.ReceiverAddress}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5"
            class="title">手机号码:</el-col>
          <el-col :span="18">{{refundDetail.ReceiverPhone}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="title">退款商品列表：</p>
    <el-table :data="refundDetail.Products"
      border>
      <el-table-column align="center"
        prop="ProductName"
        label="产品名称">
      </el-table-column>
      <el-table-column align="center"
        prop="PropertyName"
        label="产品规格">
      </el-table-column>
      <el-table-column align="center"
        prop="ProductName"
        label="产品图">
        <template slot-scope="scope">
          <img class="prodPic"
            :src="IMAGE_API + scope.row.PropertyCover"
            alt="">
        </template>
      </el-table-column>
      <el-table-column align="center"
        label="产品单价">
        <template slot-scope="scope">
          {{scope.row.PropertyPrice}}元
        </template>
      </el-table-column>
      <el-table-column align="center"
        prop="Quantity"
        label="已购买数量">
      </el-table-column>
    </el-table>
    <!-- 卖家拒绝退款申请 -->
    <template v-if="refundDetail.RefundStatus == -1">
      <el-row>
        <el-col :span="6"
          class="title">拒绝退款原因:</el-col>
        <el-col :span="16">{{refundDetail.RefuseReason}}</el-col>
      </el-row>
    </template>
    <!-- 已同意或已拒绝 -->
    <template v-if="refundDetail.RefundStatus == -1 || refundDetail.RefundStatus == 1 ">
      <el-row>
        <el-col :span="6"
          class="title">审核时间 :</el-col>
        <el-col :span="16">{{refundDetail.AuditorTime}}</el-col>
      </el-row>
    </template>
    <!-- 已同意||已发货||已退款 -->
    <template v-if="refundDetail.RefundStatus == 1 || refundDetail.RefundStatus == 2 || refundDetail.RefundStatus == -3 ">
      <el-row>
        <el-col :span="6"
          class="title">退货收货人姓名 :</el-col>
        <el-col :span="16">{{refundDetail.RefundName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6"
          class="title">退货收货人手机号 :</el-col>
        <el-col :span="16">{{refundDetail.RefundPhone}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6"
          class="title">退货地址 :</el-col>
        <el-col :span="16">{{refundDetail.RefundAddress}}</el-col>
      </el-row>
    </template>
    <template v-if="refundDetail.RefundStatus == 2 || refundDetail.RefundStatus == -3 ">
      <el-row>
        <el-col :span="6"
          class="title">买家发货快递名称 :</el-col>
        <el-col :span="16">{{refundDetail.Express}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6"
          class="title">买家发货快递单号 :</el-col>
        <el-col :span="16">{{refundDetail.ExpressCode}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6"
          class="title">买家发货时间 :</el-col>
        <el-col :span="16">{{refundDetail.ExpressTime}}</el-col>
      </el-row>
    </template>
    <template v-if="refundDetail.RefundStatus == -3 ">
      <el-row>
        <el-col :span="6"
          class="title">退款到账时间 :</el-col>
        <el-col :span="16">{{refundDetail.RefundTime}}</el-col>
      </el-row>
    </template>
    <!-- 待确认 -->
    <el-row v-if="refundDetail.RefundStatus == 0"
      type="flex"
      justify="center"
      class="actButton">
      <el-col :span="5">
        <el-button type="primary"
          @click="agreeRefund">同意退款</el-button>
      </el-col>
      <el-col :span="5">
        <el-button type="danger"
          @click="RefuseRefund">拒绝退款</el-button>
      </el-col>
    </el-row>
    <div v-if="refundDetail.RefundStatus == 2"
      style="text-align:center;margin-top:60px">
      <el-button type="primary"
        @click="confirmRefund">确认退款</el-button>
    </div>
    <!-- 同意退款dialog -->
    <el-dialog title="同意退款"
      :visible.sync="dialogAgreeFormVisible">
      <el-form :model="agreeForm"
        :rules="agreeFormRules"
        ref="agreeForm">
        <el-form-item label="退款收货人"
          label-width="120px"
          prop="RefundName">
          <el-input v-model="agreeForm.RefundName"></el-input>
        </el-form-item>
        <el-form-item label="退款收货手机号"
          label-width="120px"
          prop="RefundPhone">
          <el-input v-model.number="agreeForm.RefundPhone"></el-input>
        </el-form-item>
        <el-form-item label="退款收货地址"
          label-width="120px"
          prop="RefundAddress">
          <el-input type="textarea"
            v-model="agreeForm.RefundAddress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="resetForm('agreeForm')">取 消</el-button>
        <el-button type="primary"
          @click="submitAgreeForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 拒绝退款dialog -->
    <el-dialog title="拒绝退款"
      :visible.sync="dialogRefuseFormVisible">
      <el-form :model="refuseForm"
        :rules="refuseFormRules"
        ref="refuseForm">
        <el-form-item label="拒绝原因"
          label-width="120px"
          prop="RefuseReason">
          <el-input type="textarea"
            v-model="refuseForm.RefuseReason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="dialogRefuseFormVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="submitRefuseForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  refundInfo,
  agreeRefundApply,
  refuseRefundApply,
  confirmRefund
} from '@/api/after_sale';
export default {
  data() {
    return {
      IMAGE_API: process.env.IMAGE_API,
      refundDetail: [],
      dialogAgreeFormVisible: false,
      dialogRefuseFormVisible: false,
      agreeForm: {
        RefundID: this.$route.params.RefundID,
        RefundName: '',
        RefundPhone: '',
        RefundAddress: '',
        AdminID: this.$store.state.user.id
      },
      refuseForm: {
        RefundID: this.$route.params.RefundID,
        RefuseReason: '',
        AdminID: this.$store.state.user.id
      },
      agreeFormRules: {
        RefundName: [
          { required: true, message: '请输入退款收货人', trigger: 'blur' }
        ],
        RefundPhone: [
          { required: true, message: '请输入退款收货手机号' },
          { type: 'number', message: '手机号必须为数字值' }
        ],
        RefundAddress: [
          { required: true, message: '请输入退款收货地址', trigger: 'blur' }
        ]
      },
      refuseFormRules: {
        RefuseReason: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
          { min: 3, message: '长度在 3 个字符以上', trigger: 'blur' }
        ]
      }
    };
  },
  components: {},
  methods: {
    getData() {
      refundInfo({
        RefundID: this.$route.params.RefundID
      }).then(res => {
        if (res.Result) {
          this.refundDetail = res.Value;
        }
      });
    },
    agreeRefund() {
      this.dialogAgreeFormVisible = true;
    },
    RefuseRefund() {
      this.dialogRefuseFormVisible = true;
    },
    submitAgreeForm() {
      this.$refs.agreeForm.validate(valid => {
        if (valid) {
          return new Promise((resolve, reject) => {
            agreeRefundApply(this.agreeForm).then(res => {
              this.dialogAgreeFormVisible = false;
              this.$message({
                message: '已同意退款',
                type: 'success'
              });
              this.getData();
            });
          });
        }
      });
    },
    submitRefuseForm() {
      this.$refs.refuseForm.validate(valid => {
        if (valid) {
          return new Promise((resolve, reject) => {
            refuseRefundApply(this.refuseForm).then(res => {
              this.dialogRefuseFormVisible = false;
              this.$message({
                message: '已拒绝退款',
                type: 'success'
              });
              this.getData();
            });
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogAgreeFormVisible = false;
      this.dialogRefusFormVisible = false;
    },
    confirmRefund() {
      return new Promise((resolve, reject) => {
        const data = {
          RefundID: this.refundDetail.RefundID,
          AdminID: this.$store.state.user.id
        };
        confirmRefund(data).then(res => {
          this.$message({
            message: '退款成功',
            type: 'success'
          });
          this.getData();
        });
      });
    }
  },
  created() {
    this.getData();
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
.actButton {
  margin-top: 60px;
  text-align: center;
}
</style>
