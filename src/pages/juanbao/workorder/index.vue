<template>
  <div>
    <!-- 树形控件 -->
    <div class="box">
      <h3>归集数据分类</h3>
      <hr />
      <div class="box2">
        <!-- 按钮 -->
        <div class="boxStyle1">
          <el-button
            type="primary"
            icon="el-icon-plus"
            class="boxStyle1Button1"
            @click="() => (dialogFormVisible = true)"
            >顶级添加</el-button
          >
        </div>

        <!-- 树形 -->
        <div class="boxStyle2">
          <el-tree
            :data="data"
            show-checkbox
            :default-expand-all="true"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>

              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click.stop="appendSon(data)"
                >
                  子节点添加
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click.stop="compileSon(data)"
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click.stop="() => remove(node, data)"
                >
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>

        <!-- 弹框-顶级添加 -->
        <div class="AddPopout">
          <el-dialog title="添加顶级节点" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="根节点名称">
                <el-input
                  v-model="form.name"
                  autocomplete="off"
                  style="width:300px"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="Yon">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  treeControl,
  sonControl,
  AddControl,
  deleteControl,
  compileControl
} from "@/api/workorder.js";

export default {
  data() {
    return {
      data: [
        {
          id: 1,
          name: "一级 1",
          childList: [
            {
              id: 4,
              name: "二级 1-1",
              childList: [
                {
                  id: 9,
                  name: "三级 1-1-1"
                },
                {
                  id: 10,
                  name: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 1,
          name: "一级 1",
          childList: [
            {
              id: 4,
              name: "二级 1-1",
              childList: [
                {
                  id: 9,
                  name: "三级 1-1-1"
                },
                {
                  id: 10,
                  name: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 1,
          name: "一级 1",
          childList: [
            {
              id: 4,
              name: "二级 1-1",
              childList: [
                {
                  id: 9,
                  name: "三级 1-1-1"
                },
                {
                  id: 10,
                  name: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 1,
          name: "一级 1",
          childList: [
            {
              id: 4,
              name: "二级 1-1",
              childList: [
                {
                  id: 9,
                  name: "三级 1-1-1"
                },
                {
                  id: 10,
                  name: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 1,
          name: "一级 1",
          childList: [
            {
              id: 4,
              name: "二级 1-1",
              childList: [
                {
                  id: 9,
                  name: "三级 1-1-1"
                },
                {
                  id: 10,
                  name: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 1,
          name: "一级 1",
          childList: [
            {
              id: 4,
              name: "二级 1-1",
              childList: [
                {
                  id: 9,
                  name: "三级 1-1-1"
                },
                {
                  id: 10,
                  name: "三级 1-1-2"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "childList",
        label: "name"
      },
      // 添加弹窗
      dialogFormVisible: false,
      form: {
        name: null
      },
      dialogTableVisible: false,
      formSon: {
        name: null
      }
    };
  },
  methods: {
    // 点击时回调
    async handleNodeClick(data) {},
    // 跟节点
    async treeList() {
      await treeControl().then(res => {
        this.data = res;
      });
    },

    // 顶级添加
    Yon() {
      var newChild = {
        name: this.form.name
      };
      // 调用通用方法
      this.AddMethods(newChild);
      // 隐藏顶级弹窗
      this.dialogFormVisible = false;
    },
    // 节点添加通用方法
    async AddMethods(newChild) {
      await AddControl(newChild).then(res => {
        this.data = res;
        // 调用跟节点方法
        this.treeList();
      });
    },
    // 子节点添加
    appendSon(data) {
      this.$prompt("子节点", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          // 提示成功
          this.$message({
            type: "success",
            message: "你的子节点名称是: " + value
          });
          let newChild = {
            parentId: data.id,
            name: value
          };
          // 调用通用方法
          this.AddMethods(newChild);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });

   
    },
    // 删除
    remove(node, data) {
      this.$confirm("亲，您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });

          //  ID
          let Data = data.id;
          deleteControl(Data).then(res => {
            const parent = node.parent;
            const children = parent.data.childList || parent.data;
            const index = children.findIndex(d => d.id === data.id);

            children.splice(index, 1);
            // 调用列表
            this.treeList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 编辑
    compileSon(data) {
      console.log(data.name);
      this.$prompt("编辑", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: data.name
      })
        .then(async ({ value }) => {
          // 提示成功
          this.$message({
            type: "success",
            message: "你的名字修改为: " + value
          });
          let newChild = {
            id: data.id,
            name: value
          };
          // 编辑接口
          await compileControl(newChild).then(res => {
            this.data = res;
            // 调用跟节点方法
            this.treeList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  created() {
    // 调用方法
    this.treeList();
  }
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;

  // 头
  h3 {
    padding: 0.625rem;
    font-weight: bold;
  }
  .box2 {
    width: 35%;
    height: 51.25rem;
    margin: 1.5rem auto;
    border: 1px solid #ccc;
    padding: 0.8rem;

    // 按钮
    .boxStyle1 {
      display: block;
      width: 17rem;
      height: 100px;

      padding: 1.5rem;
      .boxStyle1Button1 {
        background: #052c4f;
      }
      .boxStyle1Button2 {
        background: #f56c6c;
      }
    }
    // 树形结构
    .boxStyle2 {
      margin-top: 1.875rem;
      display: block;
      width: 100%;
      height: 34.875rem;
      overflow-y: auto;
      padding: 0.9375rem;

      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
      }
    }
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #dddddd;
    }
    // 顶级添加弹窗
    .AddPopout {
      /deep/ .el-dialog {
        width: 30%;
        height: 15.625rem;
      }
      /deep/ .el-dialog__body {
        margin: 0 50px;
      }
    }
  }
}
</style>
