<template>
    <div class="Sidebar_Item" :class="{'is-collapse':!sidebar.opened}">
        <template v-if="!item.hidden&&item.children&&item.children.length">
            <el-submenu 
                popper-append-to-body
                :index="resolvePath(item.path)"
            >
                <template slot="title">
                    <span class="menuIcon" v-if="item.icon">{{(item.menuName).substring(0,1)}}</span>
                    <span class="menuName" v-if="sidebar.opened||!item.icon">{{item.menuName}}</span>
                </template>
                <template v-if="item.children&&item.children.length">
                    <sidebar-item
                        v-for="child in item.children"
                        :key="child.path"
                        :base-path="resolvePath(item.path)"
                        :item="child"
                    ></sidebar-item>
                </template>
            </el-submenu>
        </template>
        <template v-else>
            <router-link :to="resolvePath(item.path)">
                <el-menu-item 
                    :index="resolvePath(item.path)"
                    :class="{'active':$route.path==resolvePath(item.path)}"
                >
                    <span class="menuIcon" v-if="item.icon">{{(item.menuName).substring(0,1)}}</span>
                    <span class="menuName" v-if="sidebar.opened||!item.icon">{{item.menuName}}</span>
                </el-menu-item>
            </router-link>
        </template>
    </div>
</template>
<script>
import path from 'path'
export default {
    name:'SidebarItem',
    data(){
        return{}
    },
    props:{
        item:{
            type:Object,
            required:true
        },
        basePath:{  
            type:String
        }
    },
    computed:{
        sidebar(){
            return this.$store.state.view.sidebar
        }
    },
    methods:{
        resolvePath(routePath){
            return path.resolve(this.basePath, routePath)
        }
    }
}
</script>
<style lang="scss" scoped>
.menuName{
    color:$menuColor;
}
.menuIcon{
    font-size: 16px;
    margin-right: 14px;
    color:$menuColor;
}
.Sidebar_Item{
    transition: none;
    &.is-collapse /deep/{
        .menuIcon{
            margin-right: 28px;
        }
        .el-submenu__icon-arrow{
            display: none;
        }
    }
}
.Sidebar_Item /deep/ {
    // 有子菜单的菜单项
    .el-submenu .el-menu-item{
        color: rgba(0, 0, 0, 0.65) !important;
        background: #233546 !important;
    }
    .el-menu-item, .el-submenu__title{
        height: 40px;
        line-height: 40px;
        transition: none;
        text-overflow:ellipsis;
        &:hover{
            background: rgb(27, 47, 70) !important;
            .menuName, .menuIcon{
                color:$menuActiveColor;
            }
        }
    }
    .el-submenu__icon-arrow{
        right: 32px;
    }
    .el-submenu__title i{
        font-weight: 600;
        font-size: 15px;
        color:$menuColor;
    }
    .el-submenu__title{
        &:hover{
            .el-submenu__icon-arrow{
                color: $menuActiveColor;
            }
        }
    }
    
    // 菜单展开样式
    .el-submenu {
        &.is-opened{
            .el-submenu__title{
                .menuName, .menuIcon{
                    color:$menuActiveColor;
                }
            }
            .el-submenu__icon-arrow{
                color: $menuActiveColor;
            }
        }
    }
    // 菜单和路径匹配的样式
    .el-menu-item{
        &.active{
            .menuName, .menuIcon{
                color:$menuActiveColor;
            }
            background: rgb(18, 57, 99) !important;
        }
    }
    .el-submenu .el-menu-item{
        &.active{
            background: #1890ff !important;
            .menuName, .menuIcon{
                color:$menuActiveColor;
            }
        }
    }
    
}
</style>
<style lang="scss">
.el-menu--popup{
    .el-menu-item{
        &.active{
            background: #1890ff !important;
            .menuName, .menuIcon{
                color:$menuActiveColor;
            }
        }
    }
}
</style>