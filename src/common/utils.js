// 防抖函数
export function debounce(func, delay = 100) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


//正则表达式：字符串匹配  利器(规则太多)
// y
// y+ -> 1个或者多个y
// y* -> 0个或者多个y
// y? -> 0个或者1个y
export function formatDate(date, fmt) {
  //1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
// 如果传进来的是yyyy,则y+代表的是yyyy,RegExp.$1指的是yyyy,将yyyy代替为后面的格式
// substr意思是截取,()里面是几，就截取掉几位
  //2.获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
