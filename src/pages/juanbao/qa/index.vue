<template>
  <!-- 编码段 -->
  <div class="box">
    <h3>编码段</h3>
    <hr />
    <!--内容 -->
    <div class="coding">
      <div v-for="(item, index) in formData" :key="index" class="codingStyle">
        <div class="codingStyle1 codingStyle1One">
          {{ item.meaning }}
        </div>
        <div class="codingStyle1">{{ item.extent }}</div>
        <div class="codingStyle1" @click.stop="particularsOn(item)">详情</div>
      </div>

      <div class="addSegment">
        <span>添加编码段</span>
        <div @click="dialogFormVisible = true" class="icon">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>

    <!-- 主弹框 -->
    <div class="windows">
      <el-dialog title="添加编码段" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="段含义：" :label-width="formLabelWidth">
            <el-input
              v-model="form.meaning"
              autocomplete="off"
              style="width:450px"
              placeholder="请输入段含义"
            ></el-input>
          </el-form-item>
          <el-form-item label="长度：" :label-width="formLabelWidth">
            <el-input
              v-model.number="form.extent"
              autocomplete="off"
              style="width:450px"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              placeholder="请输入长度-只可以输入数字哟~~"
            ></el-input>
          </el-form-item>
          <el-form-item label="解析规则：" :label-width="formLabelWidth">
            <el-input
              v-model="form.analysisRule"
              autocomplete="off"
              style="width:250px"
              :disabled="true"
            ></el-input>
            <el-button
              type="primary"
              class="analysisSet"
              @click.stop="windowsShow = true"
              >解析详情设置</el-button
            >
          </el-form-item>
          <el-form-item label="生成规则：" :label-width="formLabelWidth">
            <el-input
              v-model="form.generativeRule"
              autocomplete="off"
              :disabled="true"
              style="width:250px"
            ></el-input>
            <el-button
              type="primary"
              class="analysisSet"
              @click.stop="GenerateShow = true"
              >生成详情设置</el-button
            >
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="fatherOn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 子弹框-解析规则 详情设置 -->
    <div class="sonWindows">
      <el-dialog title="解析规则详情设置" :visible.sync="windowsShow">
        <el-form>
          <el-form-item label="表 ：" :label-width="formLabelWidth">
            <el-select
              v-model="form1.surface"
              placeholder="请选择"
              style="width:450px"
              @change="optionsSurfaceOn(form1.surface)"
            >
              <el-option
                v-for="(item, index) in optionsSurface"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="主键列 ：" :label-width="formLabelWidth">
            <el-select
              v-model="form1.majorKey"
              placeholder="请选择"
              style="width:450px"
            >
              <!-- 设备层级 -->
              <el-option
                v-for="item in optionsMajorKey1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey1Shwo"
              >
              </el-option>
              <!-- 设备类型 -->
              <el-option
                v-for="item in optionsMajorKey2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey2Shwo"
              >
              </el-option>
              <!--  配件标识-->
              <el-option
                v-for="item in optionsMajorKey3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey3Shwo"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="显示列 ：" :label-width="formLabelWidth">
            <el-select
              v-model="form1.generativeRule"
              placeholder="请选择"
              style="width:450px"
            >
              <el-option
                v-for="item in optionsanalysisRule1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey1Shwo"
              >
              </el-option>

              <el-option
                v-for="item in optionsanalysisRule2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey2Shwo"
              >
              </el-option>

              <el-option
                v-for="item in optionsanalysisRule3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey3Shwo"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="windowsShow = false">取 消</el-button>
          <el-button type="primary" @click="ParserSonOn">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 子弹框-生成详情设置 -->
    <div class="sonWindows">
      <el-dialog title="生成详情设置" :visible.sync="GenerateShow">
        <el-form :model="GenerateData">
          <el-form-item label="表 ：" :label-width="formLabelWidth">
            <el-select
              v-model="GenerateData.meaning"
              placeholder="请选择"
              style="width:450px"
              @change="optionsGenerate(GenerateData.meaning)"
            >
              <el-option
                v-for="(item, index) in optionsSurface"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主键列 ：" :label-width="formLabelWidth">
            <el-select
              v-model="GenerateData.extent"
              placeholder="请选择"
              style="width:450px"
            >
              <!-- 设备层级 -->
              <el-option
                v-for="item in optionsMajorKey1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey1Shwo"
              >
              </el-option>
              <!-- 设备类型 -->
              <el-option
                v-for="item in optionsMajorKey2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey2Shwo"
              >
              </el-option>
              <!--  配件标识-->
              <el-option
                v-for="item in optionsMajorKey3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey3Shwo"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="显示列 ：" :label-width="formLabelWidth">
            <el-select
              v-model="GenerateData.generativeRule"
              placeholder="请选择"
              style="width:450px"
            >
              <el-option
                v-for="item in optionsanalysisRule1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey1Shwo"
              >
              </el-option>

              <el-option
                v-for="item in optionsanalysisRule2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey2Shwo"
              >
              </el-option>

              <el-option
                v-for="item in optionsanalysisRule3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-show="optionsMajorKey3Shwo"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="GenerateShow = false">取 消</el-button>
          <el-button type="primary" @click="GenerateOn">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 详情 -->
    <div class="windows">
      <el-dialog title="添加编码段" :visible.sync="particularsForm">
        <el-form>
          <el-form-item label="段含义：" :label-width="formLabelWidth">
            <el-input
              v-model="form.meaning"
              autocomplete="off"
              style="width:450px"
              placeholder="请输入段含义"
            ></el-input>
          </el-form-item>
          <el-form-item label="长度：" :label-width="formLabelWidth">
            <el-input
              v-model.number="form.extent"
              autocomplete="off"
              style="width:450px"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              placeholder="请输入长度-只可以输入数字哟~~"
            ></el-input>
          </el-form-item>
          <el-form-item label="解析规则：" :label-width="formLabelWidth">
            <el-input
              v-model="form.analysisRule"
              autocomplete="off"
              style="width:250px"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="生成规则：" :label-width="formLabelWidth">
            <el-input
              v-model="form.generativeRule"
              autocomplete="off"
              :disabled="true"
              style="width:250px"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { codingSection, AddSection } from "@/api/qa.js";
export default {
  props: {},
  data() {
    return {
      //编码数据
      formData: [],
      // 父弹窗
      form: {
        meaning: null,
        extent: null,
        analysisRule: null,
        generativeRule: null
      },
      // 子弹窗-解析规则详情
      form1: {
        surface: null,
        majorKey: null,

        generativeRule: null
      },
      //解析规则详情-表
      optionsSurface: [
        {
          value: "设备层级",
          label: "设备层级"
        },
        {
          value: "设备类型",
          label: "设备类型"
        },
        {
          value: "配件标识",
          label: "配件标识"
        }
      ],

      //解析规则详情-主键列1 设备层级
      optionsMajorKey1: [
        {
          value: "part",
          label: "part"
        },
        {
          value: "threeDepartment",
          label: "threeDepartment"
        },
        {
          value: "twoDepartment",
          label: "twoDepartment"
        },
        {
          value: "oneDepartment",
          label: "oneDepartment"
        },
        {
          value: "machine",
          label: "machine"
        }
      ],
      //解析规则详情-主键列2 设备类型
      optionsMajorKey2: [
        {
          value: "subclass",
          label: "subclass"
        },
        {
          value: "minorDefects",
          label: "minorDefects"
        },
        {
          value: "broadHeading",
          label: "broadHeading"
        }
      ],
      //解析规则详情-主键列3 配件标识
      optionsMajorKey3: [
        {
          value: "accessoriesIdentification",
          label: "accessoriesIdentification"
        }
      ],

      //解析规则详情-显示列1 设备层级
      optionsanalysisRule1: [
        {
          value: "零件",
          label: "零件"
        },
        {
          value: "三级部套",
          label: "三级部套"
        },
        {
          value: "二级部套",
          label: "二级部套"
        },
        {
          value: "一级部套",
          label: "一级部套"
        },
        {
          value: "机器",
          label: "机器"
        }
      ],
      //解析规则详情-显示列2 设备类型
      optionsanalysisRule2: [
        {
          value: "小类",
          label: "小类"
        },
        {
          value: "中类",
          label: "中类"
        },
        {
          value: "大类",
          label: "大类"
        }
      ],
      //解析规则详情-显示列3 配件标识
      optionsanalysisRule3: [
        {
          value: "烟机配件标识",
          label: "烟机配件标识"
        }
      ],

      //解析规则详情--显示和隐藏
      optionsMajorKey1Shwo: false,
      optionsMajorKey2Shwo: false,
      optionsMajorKey3Shwo: false,

      //生成详情设置
      GenerateData: {
        meaning: null,
        extent: null,
        generativeRule: null
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",

      windowsShow: false,
      GenerateShow: false,
      // 详情
      particularsForm: false
    };
  },
  methods: {
    // 父-确认
    async fatherOn() {
      // 获取父数据
      let Data = this.form;
      await codingSection(Data).then(res => {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        // 刷新数据
        this.sonFirm();
        //成功后隐藏父框
        this.dialogFormVisible = false;
      });
    },
    // 默认
    sonFirm() {
      AddSection().then(res => {
        this.formData = res;
      });
    },
    //生成详情设置传值-确定
    GenerateOn() {
      this.GenerateShow = false;
      //传值
      this.form.generativeRule = this.GenerateData.generativeRule;
    },
    // 详情
    particularsOn(item) {
      this.form = item;
      this.particularsForm = true;
    },
    //解析规则详情-表
    optionsSurfaceOn(row) {
      if (row === "设备层级") {
        this.optionsMajorKey1Shwo = true;
        this.optionsMajorKey2Shwo = false;
        this.optionsMajorKey3Shwo = false;
      } else {
        this.form1.majorKey = null;
        this.form1.generativeRule = null;
      }
      if (row === "设备类型") {
        this.optionsMajorKey2Shwo = true;
        this.optionsMajorKey1Shwo = false;
        this.optionsMajorKey3Shwo = false;
      }
      if (row === "配件标识") {
        this.optionsMajorKey3Shwo = true;
        this.optionsMajorKey2Shwo = false;
        this.optionsMajorKey1Shwo = false;
      }
    },
    // 解析规则详情设置传值-确定
    ParserSonOn() {
      this.windowsShow = false;
      this.form.analysisRule = this.form1.generativeRule;
    },
    //生成详情-表
    optionsGenerate(row) {
      if (row === "设备层级") {
        this.optionsMajorKey1Shwo = true;
        this.optionsMajorKey2Shwo = false;
        this.optionsMajorKey3Shwo = false;
      } else {
        this.GenerateData.extent = null;
        this.GenerateData.generativeRule = null;
      }
      if (row === "设备类型") {
        this.optionsMajorKey2Shwo = true;
        this.optionsMajorKey1Shwo = false;
        this.optionsMajorKey3Shwo = false;
      }
      if (row === "配件标识") {
        this.optionsMajorKey3Shwo = true;
        this.optionsMajorKey2Shwo = false;
        this.optionsMajorKey1Shwo = false;
      }
    }
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.sonFirm();
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  // 头
  h3 {
    padding: 0.625rem;
    font-weight: bold;
  }
  //内容
  .coding {
    display: flex;
    flex-wrap: wrap;
    .codingStyle {
      text-align: center;
      padding: 10px 10px;
      width: 8%;
      height: 9.125rem;
      .codingStyle1 {
        height: 2.5rem;
        padding: 10px 10px;
        border: 1px solid #ccc;
      }
    }
    //添加编码段
    .addSegment {
      display: inline-block;
      width: 8%;
      height: 7.5rem;
      margin: 0.625rem 0.9375rem;
      border: 1px solid #79b1ee;
      text-align: center;
      line-height: 1.875rem;

      //字体
      span {
        font-weight: bold;
        color: #79b1ee;
      }
      .icon {
        line-height: 3.875rem;
        margin: 0.6875rem auto;
        width: 3.75rem;
        height: 3.75rem;
        border: 1px solid #79b1ee;
        i {
          font-size: 2.25rem;
          cursor: pointer;
          color: #79b1ee;
        }
      }
    }
    .codingStyle1One {
      background: #ffffff;
      font-weight: bold;
    }
  }

  // 主弹框
  .windows {
    // 弹框-头
    /deep/ .el-dialog__header {
      background-color: #2a3947;
    }
    /deep/ .el-dialog__title {
      color: #fff;
    }
    // 详情按钮
    .analysisSet {
      margin: 0 4rem;
    }
  }
  /deep/ .el-dialog__body {
    padding: 30px 148px;
  }
  // 子弹框
  .sonWindows {
    // 弹框-头
    /deep/ .el-dialog__header {
      background-color: #2a3947;
    }
    /deep/ .el-dialog__title {
      color: #fff;
    }
    /deep/ .el-dialog {
      height: 26.875rem;
    }
    /deep/ .el-dialog__footer {
      padding: 10px 231px 20px;
    }
  }
}
</style>
