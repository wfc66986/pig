<template>
    <div class="custom_confirm_wrapper">
        <div class="xwarp">
            <transition name="zoomInOut" mode="out-in">
                <div class="custom-confirm" v-show="isShow">
                    <div class="confirm_box">
                        <div class="head">
                            <span>{{title||'提示'}}</span>
                        </div>
                        <div class="body">{{msg||'确认要退出登录吗?'}}</div>
                        <div class="foot clearfix">
                            <div class="confirm_btn confirm" @click.stop="btnHandle(true)">确定</div>
                            <div class="confirm_btn cancel" @click.stop="btnHandle(false)">取消</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            title:null,
            msg:null,
            promiseStatus:null,
            isShow:false
        }
    },
    methods:{
        confirm(){
            let self = this 
            this.isShow = true 
            return new Promise((resolve, reject)=>{
                self.promiseStatus = {resolve, reject}
            })
        },
        clearInstance(){
            this.$destroy()
            this.$el.parentNode.removeChild(this.$el)
        },
        btnHandle(action){
            this.isShow = false
            if(action){
                this.promiseStatus&&this.promiseStatus.resolve('confirm')
            }else{
                this.promiseStatus&&this.promiseStatus.reject('cancel')
            }
            this.clearInstance()
        }
    }
}
</script>
<style lang="scss" scoped>
.custom_confirm_wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 1001;
    text-align: center;
    .custom-confirm{
        display: inline-block;
        margin-top: 150px;
        padding: 32px 32px 24px;
        background: #fff;
        border: 1px solid transparent;
        box-shadow: 0 2px 0 rgba(0,0,0,.015);
        border-radius: 5px;
        .confirm_box{
            width: 352px;
            .head{
                height: 30px;
                line-height: 30px;
                color: rgba(0, 0, 0, 0.8);
                font-size: 15px;
                padding-left:45px;
                text-align: left;
            }
            .body{
                padding-left: 45px;
                font-size:  14px;
                color: rgba(0, 0, 0, 0.65);
                text-align: left;
            }
            .foot{
                padding-top: 10px;
            }
            .confirm_btn{
                float: right;
                height: 32px;
                padding: 0 15px;
                font-weight: 400;
                border-radius: 4px;
                font-size: 14px;
                line-height: 32px;
                cursor: pointer;
                border: 1px solid transparent;
                transition: all 0.25s ease-in-out;
                &.cancel{
                    border-color: #d9d9d9;
                    color: rgba(0, 0, 0, 0.65);
                    margin-right: 15px;
                }
                &.cancel:hover{
                    border-color: #40a9ff;
                    color: #40a9ff;
                }
                &.confirm{
                    background: #1890ff;
                    color:#fff;
                    box-shadow: 0 2px 0 rgba(0,0,0,.045);
                    border-color: #1890ff;
                }
            }
        }
    }
}
</style>