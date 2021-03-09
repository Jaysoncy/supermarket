module.exports = {
    configureWebpack: {
      //resolve解决路径相关的问题
        resolve: {
            extensions: [],
            //引用文件时，可省略后缀名
            alias: {
                //配置别名
                'assets':'@/assets', //@已经配置过了，是src的别名
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                //store不需要配，在所有的地方，通过this.$router
                //和this.$store都可以拿到
                //router不用配，一般只在main.js当中引用
                'views':'@/views',
            }
    },



    },
    // devServer: {//环境配置
    //   host: '0.0.0.0',
    //   public: '172.20.3.3:8080',
    //   port: '8080',
    //   https: false,
    //   disableHostCheck: true,
    //   open: false // 配置自动启动浏览器
    // },
    

}