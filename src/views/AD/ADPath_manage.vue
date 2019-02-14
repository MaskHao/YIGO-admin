<template>
  <div class="app-container">
    <el-button type="primary"
      @click="addADPathPath">添加</el-button>
    <el-form :inline="true"
      :model="ADPathPathSearch"
      class="">
      <el-form-item label="广告位名称">
        <el-input v-model="ADPathSearch.ADPathName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="ADPathSearch.ADPathStatus">
          <el-option v-for="(item, index) in ADPathStatus"
            :key="index"
            :value="item.key"
            :label="item.label"></el-option>
        </el-select>
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
        label='广告位Id'>
        <template slot-scope="scope">
          <span>{{scope.row.ADPathId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='广告位名称'>
        <template slot-scope="scope">
          <span>{{scope.row.ADpathName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='广告位位置'>
        <template slot-scope="scope">
          <span>{{scope.row.ADPathLocation}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='描述'>
        <template slot-scope="scope">
          <span>{{scope.row.ADpathDescribe}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
        label='状态'>
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
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
        :current-page="ADPathSearch.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="ADPathSearch.limit"
        layout=" sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <!-- addADPathuct's dialog -->
    <el-dialog title="广告位添加"
      :visible.sync="dialogFormVisible"
      class="dialog">
      <el-form ref='addADPathForm'
        :model="addADPathForm"
        label-position="left"
        label-width="120px"
        style=' margin-left:50px;'>
        <el-form-item label="广告位名称"
          prop="ADPathName">
          <el-input placeholder="请填写广告位名称"
            style="width:220px"
            v-model="addADPathForm.ADPathName"></el-input>
        </el-form-item>
        <el-form-item label="广告位位置"
          prop="ADPathLocation">
          <el-input placeholder="请填写广告位位置"
            style="width:220px"
            v-model="addADPathForm.ADPathLocation"></el-input>
        </el-form-item>
        <el-form-item label="广告位描述"
          prop="ADPathDescribe">
          <el-input style="width:220px"
            v-model="addADPathForm.ADPathDescribe"></el-input>
        </el-form-item>
        <el-form-item label="状态"
          prop="auditStatus">
          <el-select v-model="addADPathForm.auditStatus">
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
          @click="addADPathBtn">添加</el-button>
        <el-button @click="cancel">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { prodPage } from '@/api/prods';
const ADPathPathList = [
  { key: '0', label: '易购网络' },
  { key: '1', label: '百联网络' }
];
const ADPathStatus = [
  { key: '0', label: '待审核' },
  { key: '1', label: '已审核' }
];
const auditStatus = [
  { key: '0', label: '待上架' },
  { key: '1', label: '已上架' }
];
export default {
  name: 'r',
  data() {
    return {
      ADPathSearch: {
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
          ADPathName: 'Xx面膜',
          ADPathTitle: 'xx面膜',
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
          ADPathName: 'Xx面膜',
          ADPathTitle: 'xx面膜',
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
          ADPathName: 'Xx面膜',
          ADPathTitle: 'xx面膜',
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
          ADPathName: 'Xx面膜',
          ADPathTitle: 'xx面膜',
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
          ADPathName: 'Xx面膜',
          ADPathTitle: 'xx面膜',
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
      dialogFormVisible: false, // addADPathct dialog's visibale
      addADPathForm: {
        ADPathName: '',
        ADPathPrice: null,
        ADPathStatus: null
      },
      ADPathPathList,
      ADPathStatus,
      auditStatus,
      rules: {
        ADPathName: [
          {
            required: true,
            message: 'ADPathName is required',
            trigger: 'change'
          }
        ],
        ADPathPic: [
          {
            type: 'number',
            required: true,
            message: 'ADPathPic is required',
            trigger: 'change'
          }
        ],
        ADPathPrice: [
          {
            required: true,
            message: 'ADPathPrice is required',
            trigger: 'blur'
          }
        ],
        ADPathStatus: [
          {
            required: true,
            message: 'ADPathStatus is required',
            trigger: 'blur'
          }
        ],
        ADPathDescribe: [
          {
            required: true,
            message: 'ADPathDescribe is required',
            trigger: 'blur'
          }
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
      console.log('查询条件');
      this.getList(this.ADPathSearch).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    handleChange() {},
    handleDelete() {},
    addADPath() {
      console.log('addADPath');
      this.dialogFormVisible = true;
    },
    addADPathBtn() {
      console.log('addADPathBtn');
    },
    cancel() {},
    preview() {
      console.log('preview');
    },
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
.ADPathPic {
  max-height: 100px;
}
</style>


