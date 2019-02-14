<template>
  <div class="app-container">
    <el-button type="primary"
      @click="addAD">添加</el-button>
    <el-form :inline="true"
      :model="ADSearch"
      class="">
      <el-form-item label="广告位名称">
        <el-input v-model="ADSearch.ADName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="ADSearch.ADStatus">
          <el-option v-for="(item, index) in ADStatus"
            :key="index"
            :value="item.key"
            :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告开始时间">
        <el-date-picker v-model="ADSearch.startTime"
          type="datetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="广告结束时间">
        <el-date-picker v-model="ADSearch.endTime"
          type="datetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="searchBtn">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list"
      v-loading='listLoading'
      element-loading-text="稍等..."
      boADer
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column align="center"
        label='广告商名称'>
        <template slot-scope="scope">
          <span>{{scope.row.advertiserName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='广告位名称'>
        <template slot-scope="scope">
          <span>{{scope.row.ADPathName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='广告名称'>
        <template slot-scope="scope">
          <span>{{scope.row.ADName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='广告图片'>
        <template slot-scope="scope">
          <span>{{scope.row.ADPic}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='广告链接'>
        <template slot-scope="scope">
          <span>{{scope.row.ADPic}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='状态'>
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='广告开始时间'>
        <template slot-scope="scope">
          <span>{{scope.row.ADStartTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='广告结束时间'>
        <template slot-scope="scope">
          <span>{{scope.row.ADEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='操作'>
        <template slot-scope="scope">
          <el-button type="primary"
            size="mini"
            @click="handleChange(scope.row)">修改</el-button>
          <el-button size="mini"
            type="success"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="ADSearch.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="ADSearch.limit"
        layout=" sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <!-- addADuct's dialog -->
    <el-dialog title="广告管理添加"
      :visible.sync="dialogFormVisible"
      class="dialog">
      <el-form ref='addADForm'
        :model="addADForm"
        label-position="left"
        label-width="150px"
        style=' margin-left:50px;'>
        <el-form-item label="请输入广告上名称"
          prop="advertiserName">
          <el-input placeholder="请填写广告名称"
            style="width:220px"
            v-model="addADForm.advertiserName"></el-input>
        </el-form-item>
        <el-form-item label="请选择广告位"
          prop="ADPath">
          <el-select v-model="addADForm.ADPath">
            <el-option v-for="item in ADPathList"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入广告名称"
          prop="ADName">
          <el-input placeholder="请填写广告名称"
            style="width:220px"
            v-model="addADForm.ADName"></el-input>
        </el-form-item>
        <el-form-item label="请上传广告图片"
          prop="ADPic">
          <el-input style="width:220px"
            v-model="addADForm.ADPic"></el-input>
        </el-form-item>
        <el-form-item label="请输入广告链接"
          prop="ADLink">
          <el-input style="width:220px"
            v-model="addADForm.ADLink"></el-input>
        </el-form-item>
        <el-form-item label="状态"
          prop="auditStatus">
          <el-select v-model="addADForm.auditStatus">
            <el-option v-for="item in auditStatus"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择广告开始时间">
          <el-date-picker v-model="addADForm.startTime"
            type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="请选择广告结束时间">
          <el-date-picker v-model="addADForm.endTime"
            type="datetime">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button type="primary"
          @click="addADBtn">添加</el-button>
        <el-button @click="cancel">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { prodPage } from '@/api/prods';
const ADPathList = [
  { key: '0', label: '易购网络' },
  { key: '1', label: '百联网络' }
];
const ADStatus = [{ key: '0', label: '待审核' }, { key: '1', label: '已审核' }];
const auditStatus = [
  { key: '0', label: '待上架' },
  { key: '1', label: '已上架' }
];
export default {
  name: 'r',
  data() {
    return {
      ADSearch: {
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
          ADName: 'Xx面膜',
          ADTitle: 'xx面膜',
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
          ADName: 'Xx面膜',
          ADTitle: 'xx面膜',
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
          ADName: 'Xx面膜',
          ADTitle: 'xx面膜',
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
          ADName: 'Xx面膜',
          ADTitle: 'xx面膜',
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
          ADName: 'Xx面膜',
          ADTitle: 'xx面膜',
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
      dialogFormVisible: false, // addADct dialog's visibale
      addADForm: {
        ADName: '',
        ADPrice: null,
        ADStatus: null
      },
      ADPathList,
      ADStatus,
      auditStatus,
      rules: {
        ADName: [
          { required: true, message: 'ADName is required', trigger: 'change' }
        ],
        ADPic: [
          {
            type: 'number',
            required: true,
            message: 'ADPic is required',
            trigger: 'change'
          }
        ],
        ADPrice: [
          { required: true, message: 'ADPrice is required', trigger: 'blur' }
        ],
        ADStatus: [
          { required: true, message: 'ADStatus is required', trigger: 'blur' }
        ],
        ADDescribe: [
          { required: true, message: 'ADDescribe is required', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      prodPage().then();
    },
    searchBtn() {
      this.getList(this.ADSearch).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    handleChange() {},
    handleDelete() {},
    addAD() {
      this.dialogFormVisible = true;
    },
    addADBtn() {},
    cancel() {},
    preview() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }

  // must open
  // created() {
  //   this.getList()
  // }
};
</script>
<style lang="scss">
.ADPic {
  max-height: 100px;
}
</style>


