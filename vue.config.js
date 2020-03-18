module.exports = {
    publicPath:'/',
    productionSourceMap:false,
    devServer:{
        port:3000
    },
    lintOnSave:false,
    css:{
        loaderOptions:{
            //  https://cli.vuejs.org/zh/guide/css.html#css-modules
            scss:{
                prependData:`@import "@/styles/global.scss";`
            }
            //  yarn add postcss-plugin-px2rem -s
            // postcss:{
            //     plugins: [
            //         require('postcss-plugin-px2rem')({
            //             // 换算基数 默认 100
            //             rootValue: 100,
            //             // 排除不需要转换的文件夹(false)
            //             exclude: /(node_modules)/,
            //             // 保留为px的选择器
            //             selectorBlackList:[],
            //             // 允许在媒体查询中转换px
            //             mediaQuery:false,
            //             // 最小转换像素
            //             minPixelValue:2
            //         })
            //     ]
            // }
        }
    }
}