<template>
    <div class="custom-drop-warp">
        <div class="drop-box"
            v-dxClickout="handleClose"
            @click.stop="dropDown"
        >
            <ul class="drop-list" v-show="show">
                <li 
                    v-for="(item,index) in list" 
                    :key="index" 
                    @click.stop.prevent="updateSize(item.value)"
                    :class="{'selected':item.value==pageSize}"
                >{{item.value}}</li>
            </ul>
            <input type="text" :value="pageSize" readonly="readonly" autocomplete="off">
            <span class="drop-icon fa fa-angle-down"></span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[
                {value:5},
                {value:10},
                {value:15}
            ],
            show:false
        }
    },
    props:['pageSize','changeSize'],
    methods:{
        dropDown(){
            this.show = !this.show;
        },
        updateSize(value){
            console.log( '开始'+value );
            this.changeSize(value);
            this.handleClose();
        },
        handleClose(){
            if( this.show ) this.show = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.custom-drop-warp{
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    user-select: none;
    box-sizing: border-box;
    .drop-box{
        width: 54px;
        margin: 0 5px;
        height: 100%;
        position: relative;
        user-select: none;
        input{
            appearance: none;
            background-color: #fff;
            background-image: none;
            border: 1px solid #dcdee2;
            box-sizing: border-box;
            color: #515a6e;
            display: inline-block;
            font-size: inherit;
            height: 100%;
            outline: 0;
            padding: 0 15px;
            border-radius: 5px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
            cursor: pointer;
            user-select: none;
            &:hover{border-color:#409EFF}
        }
        .drop-icon{
            position: absolute;
            top: 0;
            right: 5px;
            height: 100%;
            color: #606268;
            font-size:14px;
            line-height: 28px;
            pointer-events: none;
        }
        .drop-list{
            position: absolute;
            width:100%;
            bottom: calc( 100% + 5px );
            left:0;
            background:#fff;
            overflow: hidden;
            box-shadow: 0 1px 6px rgba(0,0,0,.2);
            border-color:#dcdee2;
            z-index: 5;
            >li{
                width: 100%;
                padding:0 20px;
                height: 28px;
                line-height: 28px;
                color:#606266;
                text-align: center;
                cursor: pointer;
                &:hover{
                    background: #ced0d3;
                }
                &.selected{
                    color: #409EFF;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>
