<template>
  <div class="app-container settlement-container">
    <el-button type="primary"
      @click="addBLSettle">添加</el-button>
    <div class="filter-container">
      <el-form :inline="true"
        :model="BLSearch"
        class="">
        <el-form-item label="开始时间">
          <el-date-picker v-model="BLSearch.startTime"
            type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="BLSearch.endTime"
            type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合作平台">
          <el-input v-model="BLSearch.BLName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="BLSearchBtn">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="selectByDate">
        <el-radio-group v-model="radio2">
          <el-radio :label="3">按天</el-radio>
          <el-radio :label="6">按周</el-radio>
          <el-radio :label="9">按月</el-radio>
        </el-radio-group>
      </div>
    </div>

    <el-table :data="list"
      v-loading="listLoading"
      element-loading-text="稍等..."
      boBLer
      fit
      highlight-current-row>
      <!--<el-table-column align="center" :label="" width="65">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{scope.row.id}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column fixed
        prop="platformName"
        label="合作平台"></el-table-column>
      <el-table-column prop="number"
        label="商品数量"></el-table-column>
      <el-table-column prop="importPrice"
        label="商品进货价"></el-table-column>
      <el-table-column prop="cost"
        label="采购成本"></el-table-column>
      <el-table-column prop="startTime"
        label="开始时间"></el-table-column>
      <el-table-column prop="endTime"
        label="结束时间"></el-table-column>
      <el-table-column prop="pay"
        label="应付金额"></el-table-column>
      <el-table-column prop="remitDetails"
        label="打款详情"
        width="150">
        <template slot-scope="scope">
          <el-button type="primary"
            size="mini"
            @click="handleChange(scope.row)">修改</el-button>
          <el-button size="mini"
            type="success"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="remitTime"
        label="打款时间"></el-table-column>
      <el-table-column prop="remitNumber"
        label="需打款金额"></el-table-column>
      <el-table-column prop="currentRemitNumber"
        label="本次打款金额"></el-table-column>
      <el-table-column prop="NORemitNumber"
        label="未打款金额"></el-table-column>
      <el-table-column fixed="right"
        prop="state"
        label="开票状态"></el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="BLSearch.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="BLSearch.limit"
        layout=" sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <el-dialog title="推荐管理添加"
      :visible.sync="dialogFormVisible"
      class="dialog">
      <el-form ref='addBLForm'
        :model="addBLForm"
        label-position="left"
        label-width="120px"
        style=' margin-left:50px;'>
        <el-form-item label="合作平台"
          prop=" platform">
          <el-select v-model="addBLForm.BLPath">
            <el-option v-for="item in platformList"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品"
          prop="BLName">
          <el-input placeholder="请填写商品名称"
            style="width:220px"
            v-model="addBLForm.BLName"></el-input>
        </el-form-item>
        <el-form-item label="状态"
          prop="auditStatus">
          <el-select v-model="addBLForm.auditStatus">
            <el-option v-for="item in auditStatus"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button type="primary"
          @click="addBLBtn">添加</el-button>
        <el-button @click="cancel">关闭</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
const platformList = [
  { key: '0', label: '易购网络' },
  { key: '1', label: '百联网络' }
];
const BLStatus = [{ key: '0', label: '待审核' }, { key: '1', label: '已审核' }];
const auditStatus = [
  { key: '0', label: '待上架' },
  { key: '1', label: '已上架' }
];
export default {
  name: 'settlement-manage',
  props: {},
  data() {
    return {
      radio2: 2,
      BLSearch: {
        page: 1,
        limit: 20,
        proName: '',
        startTime: null,
        endTime: null,
        auditStatus: null,
        saleStatus: null
      },
      listLoading: false,
      list: [
        {
          channelName: '易购网络',
          BLName: 'Xx面膜',
          BLTitle: 'xx面膜',
          marketPrice: 100,
          salePrice: 50,
          memberPrice: 95,
          promotionPrice: 85,
          startTime: '2018-04-25',
          endTime: '2018-04-29',
          getNumber: 85,
          onOrOff: 'on',
          onTime: '2018-04-25',
          offTime: '2018-04-29',
          auditStatus: '通过'
        },
        {
          channelName: '易购网络',
          BLName: 'Xx面膜',
          BLTitle: 'xx面膜',
          marketPrice: 100,
          salePrice: 50,
          memberPrice: 95,
          promotionPrice: 85,
          startTime: '2018-04-25',
          endTime: '2018-04-29',
          getNumber: 85,
          onOrOff: 'on',
          onTime: '2018-04-25',
          offTime: '2018-04-29',
          auditStatus: '通过'
        },
        {
          channelName: '易购网络',
          BLName: 'Xx面膜',
          BLTitle: 'xx面膜',
          marketPrice: 100,
          salePrice: 50,
          memberPrice: 95,
          promotionPrice: 85,
          startTime: '2018-04-25',
          endTime: '2018-04-29',
          getNumber: 85,
          onOrOff: 'on',
          onTime: '2018-04-25',
          offTime: '2018-04-29',
          auditStatus: '通过'
        },
        {
          channelName: '易购网络',
          BLName: 'Xx面膜',
          BLTitle: 'xx面膜',
          marketPrice: 100,
          salePrice: 50,
          memberPrice: 95,
          promotionPrice: 85,
          startTime: '2018-04-25',
          endTime: '2018-04-29',
          getNumber: 85,
          onOrOff: 'on',
          onTime: '2018-04-25',
          offTime: '2018-04-29',
          auditStatus: '通过'
        },
        {
          channelName: '易购网络',
          BLName: 'Xx面膜',
          BLTitle: 'xx面膜',
          marketPrice: 100,
          salePrice: 50,
          memberPrice: 95,
          promotionPrice: 85,
          startTime: '2018-04-25',
          endTime: '2018-04-29',
          getNumber: 85,
          onOrOff: 'on',
          onTime: '2018-04-25',
          offTime: '2018-04-29',
          auditStatus: '通过'
        }
      ],
      dialogFormVisible: true, // addBLct dialog's visibale
      addBLForm: {
        BLName: '',
        BLPrice: null,
        BLStatus: null
      },
      platformList,
      BLStatus,
      auditStatus,
      rules: {
        BLName: [
          { required: true, message: 'BLName is required', trigger: 'change' }
        ],
        BLPic: [
          {
            type: 'number',
            required: true,
            message: 'BLPic is required',
            trigger: 'change'
          }
        ],
        BLPrice: [
          { required: true, message: 'BLPrice is required', trigger: 'blur' }
        ],
        BLStatus: [
          { required: true, message: 'BLStatus is required', trigger: 'blur' }
        ],
        BLDescribe: [
          { required: true, message: 'BLDescribe is required', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    BLSearchBtn() {},
    searchBtn() {},
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addBLSettle() {},
    settleSearch() {},
    exportExcel() {
      console.log('导出');
    },
    handleChange() {},
    handleDelete() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    addBLBtn() {},
    cancel() {}
  }
  // computed() {
  // }
};
</script>
<style>

</style>
