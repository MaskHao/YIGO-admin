<template>
  <div class="app-container">
    <el-form ref='ProdForm'
      :model="ProdForm"
      label-position="left"
      label-width="120px"
      style=' margin-left:50px;'>
      <el-form-item label="百联产品ID">
        {{ProdForm.ProdBLID}}
      </el-form-item>
      <el-form-item label="产品标签">
        {{ProdForm.ProdTag}}
      </el-form-item>
      <el-form-item label="商品名称"
        prop="prodName">
        {{ProdForm.ProdName}}
      </el-form-item>
      <el-form-item label="商品主图"
        prop="ProdCover">
        <el-upload class="avatar-uploader"
          :action="uploadSingle"
          :show-file-list="false"
          :disabled="!changeState">
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
          :on-preview="handlePictureCardPreview"
          :disabled="!changeState">
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
        <div>{{ProdForm.ProdIntro}}</div>
      </el-form-item>
      <el-form-item label="商品简介"
        prop="prodDescribe">
        <tinymce :height="300"
          v-model="ProdForm.ProdDescribe"
          :editState="changeState"></tinymce>
      </el-form-item>
      <el-form-item label="产品规格">
        <el-table v-if="ProdForm.Property && ProdForm.Property.length > 0"
          :data="ProdForm.Property"
          border
          fit
          highlight-current-row>
          <el-table-column prop="Name"
            label="规格名"
            align="center"
            width="180px">
          </el-table-column>
          <el-table-column prop="Price"
            label="单价"
            align="center"
            width="80px">
          </el-table-column>
          <el-table-column prop="PointPrice"
            label="积分价"
            align="center"
            width="100px">
          </el-table-column>
          <el-table-column prop="Point"
            label="赠送积分"
            align="center"
            width="80px">
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
                :disabled="!changeState">
                <img v-if="scope.row.Cover"
                  :src="IMAGE_API + scope.row.Cover"
                  class="cover">
                <i v-else
                  class="el-icon-plus cover-uploader-icon"></i>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="产品单价"
        prop="prodPrice">
        {{ProdForm.ProdPrice}}
      </el-form-item>
      <el-form-item label="产品单位"
        prop="prodPrice">
        {{ProdForm.ProdUnit}}
      </el-form-item>
      <el-form-item label="产品市场价"
        prop="ProdMarket">
        {{ProdForm.ProdMarket}}
      </el-form-item>
      <el-form-item label="积分换购价"
        prop="ProdMarket">
        {{ProdForm.PointPrice}}
      </el-form-item>
      <el-form-item label="产品积分"
        prop="prodPoint">
        {{ProdForm.ProdPoint}}
      </el-form-item>
    </el-form>
    <div slot="footer"
      class="dialog-footer">
      <template v-if="ProdForm.ProdStatus===1">
        <el-button type="primary"
          @click="CheckProductY">审核通过</el-button>
        <el-button type="danger"
          @click="CheckProductN">审核不通过</el-button>
      </template>
      <el-button @click="cancelBtn">返回商品管理</el-button>
    </div>

    <el-dialog title="温馨提示"
      :visible.sync="warmingVisible">
      <span>审核成功，是否需要上架？</span>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="warmingVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="onProd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import { prodInfo, prodCheck, prodOnOff } from '@/api/prods';
const uploadSingle = process.env.IMAGE_API + '/Picture/UploadSingle';
export default {
  name: 'prod_detail',
  components: {
    Tinymce
  },
  data() {
    return {
      changeState: false,
      ProductID: '',
      uploadSingle,
      IMAGE_API: process.env.IMAGE_API,
      warmingVisible: false,
      ProdForm: {
        ProdBLID: '',
        ProdTag: '',
        ProdID: '',
        ProdName: '',
        ProdCover: '',
        ProdAlbum: [],
        ProdIntro: '',
        ProdDescribe: '',
        ProdUnit: '',
        ProdPrice: 0,
        ProdMarket: 0,
        ProdPoint: 0,
        Property: [],
        AdminID: this.$store.state.user.id
      },
      dialogVisible: false,
      dialogImageUrl: '',
      AlbumList: [] // 用于展示获取的数据
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 审核通过
    CheckProductY() {
      prodCheck({
        ProdID: this.ProdForm.ProdID,
        Pass: true
      }).then(res => {
        this.$message({
          message: res.Message,
          type: 'success'
        });
        this.warmingVisible = true;
      });
    },
    // 审核不通过
    CheckProductN() {
      prodCheck({
        ProdID: this.ProdForm.ProdID,
        Pass: false
      }).then(res => {
        this.$message({
          message: res.Message,
          type: 'success'
        });
      });
    },
    onProd() {
      prodOnOff({
        ProdID: this.ProdForm.ProdID,
        OnOff: true
      }).then(res => {
        if (res.Result === 1) {
          this.$message({
            message: '产品已上架 !',
            type: 'success'
          });
          this.warmingVisible = false;
        }
      });
    },
    cancelBtn() {
      this.$router.push('/prods/prod_manage');
    }
  },
  created() {
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
  },
  mounted() {
    this.ProdForm.AdminID = this.$store.state.user.id;
  }
};
</script>

<style lang="scss">
// .changeState {
//   position: absolute;
//   right: 20%;
// }
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
