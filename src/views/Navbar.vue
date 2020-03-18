<template>
    <div class="Navbar_Container clearfix">
        <hamburger 
            @toggleClick="toggleSideBar"
            :is-active="sidebar.opened" 
            class="hamburger-container">
        </hamburger>
        <div class="right_box clearfix">
            <div class="logout" @click.stop="logout">退出登录</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    components:{
        Hamburger:()=>import('@/components/Hamburger')
    },
    computed:{
        sidebar(){
            return this.$store.state.view.sidebar
        }
    },
    methods:{
        toggleSideBar(){
            this.$store.dispatch('view/toggleSideBar')
        },
        logout(){
            this.userLogout()
        }
    }
}
</script>
<style lang="scss" scoped>
.Navbar_Container{
    position: relative;
    width: 100%;
    height: $navbarHigh;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    padding-right: 10px;
    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color:transparent;
        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }
    .right_box{
        float: right;
        height: 100%;
        .logout{
            height: 100%;
            padding: 0 10px;
            color: rgba(0,0,0,0.5);
            font-size: 15px;
            float: right;
            user-select: none;
            cursor: pointer;
            line-height: $navbarHigh;
            &:hover{color: #000}
        }
    }
}
</style>