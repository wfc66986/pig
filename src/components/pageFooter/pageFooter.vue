<template>
  <div class="page-footer-warp clearfix" v-show="sumPage>1">

    <div class="page-info">
        <span v-show="selectSize>0">已选择{{selectSize}}条记录，</span>
        <span :style="{'marginLeft':'1rem'}">共{{sumPage}}页 {{total}} 条记录</span>  
        <span :style="{'marginLeft':'1rem'}">每页显示</span>
        <drop-list :pageSize="pageSize" :changeSize="changeSize"></drop-list>
        <span class="page-sum">条记录</span>
    </div>

    <!-- 按钮 -->
    <div class="page-footer">
      <span class="arrow"
            :class="{'inval': curPage <= 1}"
            @click="turn(curPage-1)">&lt;</span>
      <span v-for="n in left"
            @click="turn(n,'left')"
            :key="n">{{ n }}</span>
      <span class="active">{{ curPage }}</span>
      <span v-for="n in right"
            @click="turn(n,'right')"
            :key="(n+1)">{{ n }}</span>
      <span class="arrow"
            :class="{'inval': curPage >= sumPage}"
            @click="turn(curPage+1)">&gt;</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    sumPage: {	// 总页数
      type: [String, Number],
      default: 8
    },
    curPage: {	// 当前页码
      type: [String, Number],
      default: 3
    },
    total: {	//记录总数
      type: [String, Number],
      default: 66
    },
    pageSize: {
      type: [String, Number],
      default: 10
    },
    selectSize: {
      type: [String, Number],
      default: 0
    }
  },
  components:{
    dropList:()=>import('./dropList')
  },
  computed: {
    maxPage () {
      if (this.curPage * this.pageSize > this.total) return this.total;
      else return this.curPage * this.pageSize;
    },
    left () {
      const curPage = Number(this.curPage);
      let left = [];
      if (curPage > 1) {
        if (curPage <= 4) {
          for (let i = 1; i < this.curPage; i++) {
            left.push(i);
          }
        } else {
          left = [1, '...'];
          left.push(curPage - 2);
          left.push(curPage - 1);
        }
      }
      return left;
    },
    right () {
      const sumPage = this.sumPage;
      const curPage = Number(this.curPage);
      let right = [];
      if (sumPage - curPage > 0) {
        if (sumPage - curPage < 4) {
          for (let i = curPage + 1; i <= sumPage; i++) {
            right.push(i);
          }
        } else {
          right = ['...', sumPage];
          right.unshift(curPage + 2);
          right.unshift(curPage + 1);
        }
      }
      return right;
    }
  },
  methods: {
    changeSize (value) {
      this.$emit('changeSize', value);
    },
    turn (page, type = '') {
      let to = '';

      if (page < 1) {
        console.log('这已经是第一页了')
        return
      }
      if (page > this.sumPage) {
        console.log('前面没有更多内容了');
        return
      }


      if (page == '...') {
        const index = this[type].indexOf('...');
        if (type == 'left') {
          to = this.left[index + 1] - 1;
        } else {
          to = this.right[index - 1] + 1;
        }
      } else {
        to = page;
      }
      this.$emit('turnPage', to);
    }
  }
}
</script>
<style lang="scss" scoped>
$color-light-blue: #777778;
$lightGray: #777778;

.page-footer-warp {
  width: 100%;
  user-select: none;
  margin-top: 1rem;

  .page-info {
    float: left;
    font-size: 0.7rem;
    line-height: 30px;
    color: #828282;
  }

  // 按钮组
  .page-footer {
    float: right;
    vertical-align: middle;
    text-align: center;
    font-size: 0;
    overflow: hidden;
    border-radius: 2px;
    span {
      vertical-align: top;
      display: inline-block;
      min-width: 28px;
      width: 35px;
      height: 30px;
      padding: 0 3px;
      background: #fff;
      border: 1px solid transparent;
      text-align: center;
      line-height: 28px;
      font-size: 13px;
      color: #656565;
      cursor: pointer;
      user-select: none;
      &.inval {
        cursor: default;
        opacity: 0.8;
      }
      &.active {
        background: #00aae8;
        color: #fff;
        cursor: default;
      }
      &.arrow {
        font-family: "simsun";
      }
    }
  }
}
</style>
