<template>
    <div class="Sidebar">
        <!-- <div class="logo_div">
            <img src="../assets/logo.png" class="mwh" v-if="sidebar.opened">
            <img src="../assets/flogo.png" class="mwh" v-else>
        </div> -->
        <el-scrollbar wrap-class="scrollbar-wrapper">
           <el-menu
                :collapse="!sidebar.opened"
                :background-color="variables.sidebarBg"
                :active-text-color="'#fff'"
                :collapse-transition="false"
                :popper-class="'popup-menu'"
                :default-openeds="openedArr"
                v-if="menuRoutes.length"
           >
                <sidebar-item
                    v-for="(route, key) in menuRoutes[0].children"
                    :key="key"
                    :item="route"
                    :base-path="'/'"
                />
           </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import variables from '@/styles/basic/variables.scss';
export default {
    data(){
        return{
            openedArr:[]
        }
    },
    computed:{
        sidebar(){
            return this.$store.state.view.sidebar
        },
        menuRoutes(){
            return this.$store.state.login.menuRoutes
        },
        variables(){
            return variables
        }
    },
    components:{
        SidebarItem:()=>import('./SidebarItem')
    },
    mounted(){
        this.setOpenedMenu()
    },
    methods:{
        setOpenedMenu(){
            let matchRoutes = this.$route.matched
            let self = this
            
            if(matchRoutes.length>=3){
                matchRoutes.forEach((item, index)=>{
                    if(index>=1&&index<matchRoutes.length-1){
                        self.openedArr.push(item.path)
                    }
                })
            }else{
                this.openedArr.push('/'+this.menuRoutes[0].children[0].path)
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
.Sidebar{
    width: 100%;
    height: 100%;
    // .logo_div{
    //     width: 100%;
    //     height: $navbarHigh;
    //     text-align: center;
    // }
    .el-scrollbar /deep/ {
        width: 100%;
        overflow-x: hidden;
        height: calc(100% - #{$navbarHigh});
        .scrollbar-wrapper{
            overflow-y: auto;
            overflow-x: hidden;
        }
        .el-menu{
            border: none;
        }
    }
}
</style>
