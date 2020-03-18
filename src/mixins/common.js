let commonMixin = {
    methods: {
        delayLoad(ms){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve()
                },ms)
            })
        },
        userLogout(){
            this.$decide().then(res=>{
                this.$store.dispatch('login/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }).catch(e=>{})
        }
    }
}

export default commonMixin