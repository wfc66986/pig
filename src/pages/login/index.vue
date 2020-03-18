<template>
    <div class="Login_Container">
        <div class="sys_title">木星零备件管理软件</div>
        <div class="form_container">
            <h3 class="tips">木星零备件管理软件</h3>
            <div class="content">
                <div class="img_warp">
                    <img src="../../assets/login/login_user.png" alt="user">
                </div>
                <div class="form_warp">
                    <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent label-position="top" class="login_form">
                        <el-form-item prop="username">
                            <el-input
                                placeholder="请输入用户名"
                                type="text"
                                clearable
                                class="custom-input"
                                v-model="form.username"
                                @keyup.enter.native="handleSubmit"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                placeholder="请输入密码"
                                type="password"
                                clearable
                                class="custom-input"
                                v-model="form.password"
                                @keyup.enter.native="handleSubmit"
                            ></el-input>
                        </el-form-item>
                        <el-form-item class="nm">
                            <el-checkbox v-model="isRemember">记住密码</el-checkbox>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="submit_div clearfix">
                <span class="lbtn cancel" @click.stop="cancelLogin">取消</span>
                <span class="lbtn confirm" @click.stop="handleSubmit">确定</span>
            </div>
        </div>
    </div>
</template>

<script>
import {Encrypt, Decrypt} from '@/utils/tools';
    export default {
        data(){
            const validPassword = (rule, value, callback) => {
                var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;
                if (!this.form.password) {
                    callback(new Error('密码不能为空'))
                } else {
                    if (reg.test(this.form.password)) {
                    callback()
                    } else {
                    callback(new Error('请检查密码格式，是否正确'))
                    }
                }
            }

            const validUsername = (rule, value, callback) => {
                var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;
                if (!this.form.username) {
                    callback(new Error('用户名不能为空'))
                } else {
                    if (reg.test(this.form.username)) {
                        callback()
                    } else {
                        callback(new Error('请检查用户名格式，是否正确'))
                    }
                }
            }
            
            return{
                form:{
                    username:null,
                    password:null
                },
                isRemember:true,
                isload:false,
                rules:{
                    username:[
                        { validator: validUsername, trigger: 'blur' }
                    ],
                    password:[
                        { validator: validPassword, trigger: 'blur' }
                    ]
                },
                pwdKey:'A2EB63B71DEA4B273AAFA4BA332A01EB',
                userKey:'678477FBED35FE215D719454EC6340B2',
                redirect:''
            }
        },
        mounted(){
            this.setRememberInfo()
        },
        watch:{
            $route: {
                handler: function(route) {
                    const query = route.query
                    if (query) {
                        this.redirect = query.redirect
                        this.otherQuery = this.getOtherQuery(query)
                    }
                },
                immediate: true
            }
        },
        methods:{
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                    }
                    return acc
                }, {})
            },
            handleSubmit(){
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        if(process.env.NODE_ENV=='production') this.CheckUserLogin()
                        else this.DebugLogin()
                    }
                })
            },
            DebugLogin(){
                this.$store.dispatch('login/DebugLogin', this.form).then(res=>{
                    this.rememberPwd()
                    this.$router.addRoutes(res)
                    this.RedirectHistoryMenu(res)
                    this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                })
            },
            RedirectHistoryMenu(routesArr){
                if( this.redirect&&this.redirect.indexOf('/')>-1 ){
                    let redirectMenuName = this.redirect.split('/')[1]
                    let tagMenu = routesArr[0].children.filter(item=>{
                        if(item.path===redirectMenuName) return true
                    })
                    if(tagMenu.length) this.$store.commit('login/SET_SLIDE_MENUS', tagMenu[0])
                }
            },
            CheckUserLogin(){
				this.DebugLogin()
            },
            rememberPwd(){
                if( this.isRemember ){
                    localStorage.setItem(this.userKey,Encrypt(this.form.username))
                    localStorage.setItem(this.pwdKey,Encrypt(this.form.password))
                }else{
                    localStorage.clear()
                }
            },
            setRememberInfo(){
                let self = this;
                if(localStorage.getItem(self.userKey)) {
                    this.form.username = Decrypt(localStorage.getItem(self.userKey));
                    this.isRemember = true;
                }
                if(localStorage.getItem(self.pwdKey)){
                    this.form.password = Decrypt(localStorage.getItem(self.pwdKey));
                    this.isRemember = true;
                }
            },
            cancelLogin(){
                this.form = {
                    username: null,
                    password: null
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.Login_Container{
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: url('../../assets/login/login_bg.png') no-repeat;
    background-size: 100% 100%;
    .sys_title{
        position: absolute;
        top: 50px;
        left: 50px;
        user-select: none;
        font-size: 20px;
        color: #054a7d;
        cursor: default;
    }
    .form_container{
        position: absolute;
        left:50%;
        top:40%;
        transform: translate(-50%,-50%);
        background: #021E35;
        padding:20px 0 10px 0;
        width:500px;
        .tips{
            color:#fff;
            font-size: 20px;
            text-align: center;
            margin-bottom: 15px;
        }
        .content{
            width: 100%;
            padding:0 80px;
        }
        .img_warp{
            width:100%;
            height:50px;
            font-size: 0;
            margin-bottom:15px;
            img{
                max-height: 100%;
            }
        }
        .form_warp{
            width:100%;
        }
        .submit_div{
            width: 100%;
            padding:10px 50px; 
            .lbtn{
                float: right;
                width: 70px;
                height: 40px;
                line-height: 38px;
                text-align: center;
                border:1px solid #fff;
                color:#fff;
                opacity: 0.7;
                user-select: none;
                cursor: pointer;
                font-size: 17px;
                &:first-child{
                    margin-left: 15px;
                }
                &:hover{
                    opacity: 1;
                }
            }
        }
    }
    .login_form /deep/ {
        .el-form-item{
            margin-bottom: 20px;
            &.nm{margin-bottom:0;}
        }
        .el-input__inner{
            border-radius: 0;
        }
        .el-checkbox__inner{
            border-radius: 0;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label{
            color: #fff;
        }
        .el-checkbox{
            color:#fff;
        }
    }
}
</style>