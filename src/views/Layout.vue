<template>
    <div class="Layout_Container ui-scrollbar" :class="{'collapse':!sidebar.opened}">
        <div class="side_container">
            <Sidebar/>
        </div>
        <div class="main_container">
            <Navbar/>
            <div class="App_Main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    computed:{
        sidebar(){
            return this.$store.state.view.sidebar
        }
    },
    components:{
        Sidebar:()=>import('./Sidebar'),
        Navbar:()=>import('./Navbar'),
    }
}
</script>
<style lang="scss" scoped>
.Layout_Container{
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    &.collapse{
        .side_container{
            width: $sidebarClose;
        }
        .main_container{
            margin-left: $sidebarClose;
            width: calc(100% - #{$sidebarClose});
        }
    }
    .side_container{
        width:$sidebarOpen;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        background: $sidebarBg;
        transition: width 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    }
    .main_container{
        // position: absolute;
        // top: 0;
        // right: 0;
        // min-height: 100vh;
        // left: $sidebarOpen;
        // transition: left 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        width: calc(100% - #{$sidebarOpen});
        margin-left: $sidebarOpen;
        transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    }
}
</style>