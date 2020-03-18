const juanbaoRouter = {
    path:'juanbao',
    component:'juanbao',
    menuName:'卷包过程',
    icon:true,
    children:[
        {
            path:'workorder',
            component:'juanbao/workorder',
            menuName:'归集数据分类'
        },
        {
            path:'qa',
            component:'juanbao/qa',
            menuName:'卷包质量检测信息'
        },
        {
            path:'consume',
            component:'juanbao/consume',
            menuName:'归集数据管理'
        }
    ]
}

export default juanbaoRouter