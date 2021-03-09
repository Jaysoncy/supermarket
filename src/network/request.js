import axios from 'axios'

//1.使用export default只能导出一个实例
// export default instance1() {

// }

//2.多个实例：
// export function request(config, success, failure) {
//     //1)创建axios的实例
//     const instance = axios.create({
//         baseURL: 'http://123.207.32.32:8000',
//         timeout: 5000
//       })
//     //2)发送真正的网络请求
//     instance(config)
//       .then(res => {
//           success(res)
//       })
//       .catch(err => {
//           failure(err)
//       })
// }

// export function request(config) {
//     return new Promise((resolve, reject) => {
//         //1.创建axios的实例
//         const instance = axios.create({
//             baseURL: 'http://123.207.32.32:8000',
//             timeout: 5000
//         })
//         //2.发送真正的网络请求
//         instance(config)
//             .then(res => {
//                 resolve(res)
//             })
//             .catch(err => {
//                 reject(err)
//             })
//     })
// }

export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout: 5000
    })
    //2.axios的拦截器
    //拦截请求
    instance.interceptors.request.use(config => {
        // console.log(config);
        //请求拦截的作用 
        //1.config中的一些信息不符合服务器要求；
        //2. 每次发送网络请求时，希望在界面中显示一个请求的图标
        //3.某些网络请求（比如登录token），必须携带一些特殊的信息

        // 拦截后，赶快返回结果，不然其他地方拿不到数据
        return config
    }, err => {
        console.log(err);
    });

    // 拦截响应
    instance.interceptors.response.use(res => {
        // console.log(res.data)
        return res.data
    }, err => {
        console.log(err)
    });

    //2.发送真正的网络请求,返回promise,所有其他地方调用函数可以直接.then
    return instance(config)
}