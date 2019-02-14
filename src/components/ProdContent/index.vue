<template>
  <div class="app-container">
    <el-form ref='ProdForm'
      :model="ProdForm"
      label-position="left"
      label-width="120px"
      style=' margin-left:50px;'>
      <el-form-item label="百联产品ID">
        <el-input style="width:220px"
          v-model="ProdForm.ProdBLID"></el-input>
      </el-form-item>
      <el-form-item label="产品标签">
        <el-select style="width:220px"
          v-model="ProdForm.ProdTag" change="selectFunc">
          <el-option key="1"
            value="百联供货"
            label="百联供货"></el-option>
          <el-option key="2"
            value="百联海淘"
            label="百联海淘"></el-option>
          <el-option key="3"
            value="海伦凯勒"
            label="海伦凯勒"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称"
        prop="prodName">
        <el-input type="textarea"
          :rows="2"
          placeholder="请填写商品名称"
          style="width:420px"
          v-model="ProdForm.ProdName"></el-input>
      </el-form-item>
      <el-form-item label="商品主图"
        prop="ProdCover">
        <el-upload class="avatar-uploader"
          :action="uploadSingle"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ProdForm.ProdCover"
            :src="IMAGE_API + ProdForm.ProdCover"
            class="avatar">
          <i v-else
            class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品相册"
        prop="ProdAlbum">
        <el-upload :action="uploadSingle"
          multiple
          list-type="picture-card"
          :file-list="AlbumList"
          :on-success="handleProdAlbumSuccess"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%"
            :src="dialogImageUrl"
            alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="一句话简介"
        prop="ProdIntro">
        <el-input type="textarea"
          :rows="2"
          style="width:620px"
          v-model="ProdForm.ProdIntro"></el-input>
      </el-form-item>
      <el-form-item label="商品简介"
        prop="prodDescribe">
        <tinymce :height="300"
          v-model="ProdForm.ProdDescribe"></tinymce>
      </el-form-item>
      <el-form-item label="产品规格">
        <el-button type="primary"
          @click="addProperty">新增产品规格</el-button>
        <el-table v-if="ProdForm.Property.length > 0"
          :data="ProdForm.Property"
          border
          fit
          highlight-current-row>
          <el-table-column prop="Name"
            label="规格名"
            align="center"
            width="220px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.Name"
                @change="(value) =>checkLength(value, scope.$index)"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="Price"
            label="单价"
            align="center"
            width="80px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.Price"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="PointPrice"
            label="积分价"
            align="center"
            width="100px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.PointPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="Point"
            label="赠送积分"
            align="center"
            width="80px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.Point"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="Cover"
            label="封面图"
            align="center"
            width="100px">
            <template slot-scope="scope">
              <el-upload ref="scope.$index"
                class="avatar-uploader"
                :action="uploadSingle"
                :show-file-list="false"
                :on-success="(res,file)=>{return handleCoverSuccess(res,file, scope.$index)}"
                :before-upload="beforeAvatarUpload">
                <img v-if="scope.row.Cover"
                  :src="IMAGE_API + scope.row.Cover"
                  class="cover">
                <i v-else
                  class="el-icon-plus cover-uploader-icon"></i>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="操作"
            align="center"
            width="80px">
            <template slot-scope="scope">
              <el-button type="danger"
                @click="deleteBtn(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="产品单价"
        prop="prodPrice">
        <el-input class="prodPrice"
          style="width:120px"
          type="number"
          v-model="ProdForm.ProdPrice"></el-input>
      </el-form-item>
      <el-form-item label="产品单位"
        prop="ProdUnit">
        <el-input class="ProdUnit"
          style="width:100px"
          v-model="ProdForm.ProdUnit"></el-input>
      </el-form-item>
      <el-form-item label="产品市场价"
        prop="ProdMarket">
        <el-input class="ProdMarket"
          style="width:120px"
          type="number"
          v-model="ProdForm.ProdMarket"></el-input>
      </el-form-item>
      <el-form-item label="产品积分"
        prop="prodPoint">
        <el-input class="ProdPoint"
          style="width:120px"
          type="number"
          v-model="ProdForm.ProdPoint"></el-input>
      </el-form-item>
      <el-form-item label="积分换购价"
        prop="ProdMarket">
        <el-input class="PointPrice"
          style="width:120px"
          type="number"
          v-model="ProdForm.PointPrice"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
      class="dialog-footer">
      <el-button v-if="action === 1"
        type="primary"
        @click="addProdBtn">添加</el-button>
      <el-button v-if="action === 2"
        type="primary"
        @click="UpdateBtn">确定</el-button>
      <el-button @click="cancelBtn">取消</el-button>
    </div>
    <el-dialog title="温馨提示"
      :visible.sync="warmingVisible">
      <span>新增或修改产品需要重新审核才能上架，是否需要审核？</span>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="warmingVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="toCheck">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce';
import { prodAdd, prodInfo, prodCheck, prodUpdate } from '@/api/prods';
const uploadSingle = process.env.IMAGE_API + '/Picture/UploadSingle';
const prodStatus = [
  {
    key: 0,
    label: '未审核'
  },
  {
    key: 1,
    label: '已审核'
  }
];
export default {
  name: 'Prod',
  props: {
    action: {
      type: Number
    }
  },
  components: {
    Tinymce
  },
  data() {
    return {
      IMAGE_API: process.env.IMAGE_API,
      uploadSingle,
      prodStatus: prodStatus,
      dialogVisible: false,
      warmingVisible: false,
      ProdForm: {
        ProdBLID: '',
        ProdTag: '百联供货',
        ProdName: '',
        ProdCover: '',
        ProdAlbum: [],
        ProdIntro: '',
        ProdDescribe: '',
        ProdUnit: '',
        ProdPrice: 0,
        ProdMarket: 0,
        ProdPoint: 0,
        PointPrice: 0,
        Property: [],
        AdminID: this.$store.state.user.id
      },
      dialogImageUrl: '',
      AlbumList: []
    };
  },
  watch: {},
  methods: {
    selectFunc() {},
    checkLength(value, index) {
      if (value.length > 20) {
        this.$message({
          message: '请输入不超过20个字符',
          type: 'warning'
        });
        this.ProdForm.Property[index].Name = '';
      }
    },
    addProperty() {
      this.ProdForm.Property.push({
        ID: '',
        Name: '',
        Price: 0,
        PointPrice: 0,
        Point: 0,
        Cover: ''
      });
    },
    deleteBtn(index) {
      this.ProdForm.Property.splice(index, 1);
    },
    handleAvatarSuccess(res, file) {
      this.ProdForm.ProdCover = file.response.Value;
    },
    handleCoverSuccess(res, file, index) {
      this.ProdForm.Property[index].Cover = res.Value;
    },

    handleProdAlbumSuccess(res, file, fileList) {
      this.AlbumList = fileList;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file.size);
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    CheckProductY() {
      prodCheck({
        ProdID: this.ProdForm.ProdID,
        Pass: true
      }).then(res => {
        this.$message({
          message: res.Message,
          type: 'success'
        });
      });
      this.$router.go(-1);
    },
    CheckProductN() {
      prodCheck({
        ProdID: this.ProdForm.ProdID,
        Pass: false
      }).then(res => {
        this.$message({
          message: res.Message,
          type: 'success'
        });
        setTimeout(() => {
          this.$router.go(-1);
        }, 500);
      });
    },
    addProdBtn() {
      this.ProdForm.ProdAlbum = [];
      this.AlbumList.forEach((value, i) => {
        this.ProdForm.ProdAlbum.push(value.response.Value);
      });
      prodAdd(this.ProdForm).then(res => {
        if (res.Result === 1) {
          this.$message({
            message: res.Message,
            type: 'success'
          });
          this.ProdForm.ProdID = res.Value;
          this.warmingVisible = true;
        } else {
          this.$message({
            message: res.Message,
            type: 'error'
          });
        }
      });
    },
    UpdateBtn() {
      this.ProdForm.ProductID = this.ProdForm.ProdID;
      this.ProdForm.AdminID = this.$store.state.user.id;
      this.ProdForm.ProdAlbum = [];
      this.AlbumList.forEach((value, i) => {
        if (value.response) {
          this.ProdForm.ProdAlbum.push(value.response.Value);
        } else {
          this.ProdForm.ProdAlbum.push(value.name);
        }
      });
      prodUpdate(this.ProdForm).then(res => {
        if (res.Result === 1) {
          this.$message({
            message: res.Message,
            type: 'success'
          });
          this.warmingVisible = true;
        }
      });
    },
    toCheck() {
      this.$router.push('/prods/prod_detail/' + this.ProdForm.ProdID);
    },
    cancelBtn() {
      this.$router.go(-1);
    }
  },
  created() {
    if (this.action === 2) {
      return new Promise((resolve, reject) => {
        prodInfo({
          ProdID: this.$route.params.prodID
        }).then(res => {
          if (res.Result === 1) {
            this.ProdForm = res.Value;
            const albumList = JSON.parse(this.ProdForm.ProdAlbum);
            this.AlbumList = albumList.map((value, index) => {
              return {
                name: value,
                url: this.IMAGE_API + value
              };
            });
          } else {
            this.$message({
              message: res.Message,
              type: 'warning'
            });
          }
        });
      });
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.cover {
  width: 80px;
  height: 80px;
  display: block;
}

.dialog-footer {
  margin-left: 5%;
}
</style>
