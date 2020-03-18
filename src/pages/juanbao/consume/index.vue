<template>
  <!-- 表格 -->
  <div class="box">
    <h3>归集数据查询</h3>
    <hr />
    <!-- 列表 -->
    <div class="list2">
      <el-table
        ref="singleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        highlight-current-row
        @cell-mouse-enter="dispose"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="编号" width="150">
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column prop="productDate" label="时间" width="165">
        </el-table-column>
        <el-table-column prop="shift" label="班次" width="150">
        </el-table-column>
        <el-table-column prop="equipment" label="机台" width="165">
        </el-table-column>
        <el-table-column prop="team" label="班组" width="165">
        </el-table-column>
        <el-table-column prop="brand" label="牌号" width="120">
        </el-table-column>
        <el-table-column prop="beginTime" label="开始时间" width="180">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="180">
        </el-table-column>
        <el-table-column prop="yield" label="产品" width="120">
        </el-table-column>

        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <span class="operation">
              <span @click="Compile_on(scope.$index, scope.row)">编辑</span>
              <span @click="Diary_on(scope.$index, scope.row)">数据日记</span>
              <span @click="Remove_on(scope.$index, scope.row)">删除</span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pageFooter">
      <page-footer
        style="display: block"
        :total="total"
        :curPage="queryForm.current"
        :sumPage="sumPage"
        :pageSize="queryForm.size"
        :selectSize="selectArr.length"
        @turnPage="turnPage"
        @changeSize="changeSize"
      ></page-footer>
    </div>

    <!-- 弹窗-编辑 -->
    <div class="sonWindows">
      <el-dialog title="编辑" :visible.sync="windowsShow">
        <el-form :model="form1" ref="form1">
          <el-form-item label="编号 ：" :label-width="formLabelWidth">
            <el-input
              v-model="form1.code"
              placeholder="请输入内容"
              style="width:450px"
            ></el-input>
          </el-form-item>
          <el-form-item label="班次 ：" :label-width="formLabelWidth">
            <el-input
              v-model="form1.shift"
              placeholder="请输入内容"
              style="width:450px"
            ></el-input>
          </el-form-item>

          <el-form-item label="机台 ：" :label-width="formLabelWidth">
            <el-input
              v-model="form1.equipment"
              placeholder="请输入内容"
              style="width:450px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="windowsShow = false">取 消</el-button>
          <el-button type="primary" @click.stop="compileOn">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 弹窗-数据日记 -->
    <div class="diarySt">
      <el-dialog title="数据日记" :visible.sync="diaryShow">
        <el-form :model="form2">
          <el-form-item label="来源系统 ：" :label-width="formLabelWidth">
            <span>MES</span>
          </el-form-item>
          <el-form-item label="接收时间 ：" :label-width="formLabelWidth">
            <span>{{ form2.productDate }}</span>
          </el-form-item>
          <el-form-item>
            <div class="interfaceData">接口数据内容</div>
            <hr />
            <div>
              <el-card class="box-card">
                <div class="box-card-1">
                  {{ form2.jsonData }}
                </div>
              </el-card>
            </div>
          </el-form-item>
        </el-form>

   
        <div slot="footer" class="dialog-footer">
          <el-button @click="diaryShow = false">取 消</el-button>
          <el-button type="primary" @click="diaryShow = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { listRequest, compileRequest, deleteRequest } from "@/api/consume.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      // list
      tableData: [],
      msg: [],
      //   分页
      queryForm: {
        current: 1,
        size: 5
      },
      // 总页数
      total: 0,
      selectArr: [],

      // 编辑
      form1: {},
      windowsShow: false,
      formLabelWidth: "120px",

      // 数据日记
      form2: {},
      diaryShow: false
    };
  },
  methods: {
    // 删除
    Remove_on(index, row) {
      this.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let id = row.id;
          await deleteRequest(id).then(res => {
            this.tableData.splice(index, 1);
            //左边√选项删除
            this.$refs.singleTable.clearSelection();
            // 弹窗
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //   列表
    handleSelectionChange(val) {
      this.selectArr = val;
    },
    // 状态分析
    // hover默认拿到数据
    dispose(row) {
      this.msg = row;
    },
    // 编辑
    Compile_on(index, row) {
      this.windowsShow = true;
      this.form1 = row;
    },

    //编辑确认
    async compileOn() {
      let row = this.form1;
      //调用
      await compileRequest(row).then(res => {
        this.windowsShow = false;
        this.$message({
          message: "修改成功",
          type: "success"
        });
      });
    },
    // 分页
    //点击下一页切换
    turnPage(pg) {
      this.queryForm.current = pg;
      this.default();
    },
    changeSize(size) {
 
      
      if (size == this.queryForm.size) return;
      this.queryForm.size = size;
    },
    Diary_on(index, row) {
      this.diaryShow = true;
    },
    // 默认值
    default() {
      let pageList = this.queryForm;
      listRequest(pageList).then(res => {
        // 数据日记
        this.form2 = res.records[0];
        // list数据
        this.tableData = res.records;
        //分页
        this.queryForm.size = res.size;
        this.queryForm.current = res.current;
        this.total = res.total;
      });
    },
    // 存放
    async save() {
      // 默认
      await this.default();
    }
  },
  computed: {
    // 计算向上取整共多少页
    sumPage() {
      return Math.ceil(this.total / this.queryForm.size);
    }
  },
  created() {},
  mounted() {
    // 调用
    this.save();
  },
  watch: {},
  updated() {}
};
</script>

<style scoped lang="scss">
// 列表内容
.box {
  width: 100%;
  height: 100%;
  // 头
  h3 {
    padding: 0.625rem;
    font-weight: bold;
  }
  .list2 {
    width: 95%;
    margin: 1.875rem auto;
    /deep/ .el-table th.is-leaf {
      background-color: #dfdcdc;
    }
    /deep/ .el-table .el-table__row {
      &:nth-child(odd) {
        background-color: #efefef;
      }
    }

    //   横向滚动取消
    /deep/ .el-table--scrollable-x .el-table__body-wrapper {
      overflow-x: hidden;
    }

    .operation {
      display: flex;
      justify-content: space-around;
      color: #0079fe;
      cursor: pointer;
    }
  }
  //   分页
  .pageFooter {
    margin: 0.625rem 1.875rem;
  }
  //  编辑
  .sonWindows {
    // 弹框-头
    /deep/ .el-dialog__header {
      background-color: #2a3947;
    }
    /deep/ .el-dialog__title {
      color: #fff;
    }
    /deep/ .el-dialog {
      height: 23.875rem;
    }
    /deep/ .el-dialog__footer {
      padding: 10px 234px 20px;
    }
    /deep/ .el-dialog__body {
      padding: 30px 150px;
    }
  }

  // 数据日记
  .diarySt {
    // 弹框-头
    /deep/ .el-dialog__header {
      background-color: #2a3947;
    }
    /deep/ .el-dialog__title {
      color: #fff;
    }
    /deep/ .el-dialog {
      height: 40.875rem;
      width: 40%;
    }
    /deep/ .el-dialog__footer {
      margin: 0 4rem;
    }
    /deep/ .el-dialog__body {
      padding: 30px 100px;
    }
    .interfaceData {
      display: block;
      margin: 0 32px;
    }
    // 卡片
    .box-card {
      margin: 2.25rem 0;
      overflow-y: auto;
      ::-webkit-scrollbar-track-piece {
        background-color: #f8f8f8;
      }
      .box-card-1 {
        height: 10.75rem;
      }
    }
  }
}
</style>
