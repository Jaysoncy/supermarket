<template>
    <div class="tab-bar-item" @click='itemClick'>
        <div v-if='!isActive'><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>     
        <div :style='activeStyle'><slot name="item-text"></slot></div>
        <!-- 动态绑定样式：<:style='{color: currentColor, fontSize: fontSize + 'px'}>' -->
    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    props: {
      path: String,
      //字符串形式
      activeColor: {
        type: String,
        default: 'red'
      },
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) != -1
        //拿到处于活跃路由的path
        //a.indexOf(b)：从a中找b，找到的话，不等于-1；找到的话，就等于-1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
        // this.isActive是true吗？是的话，就执行{里面的内容};不是的话，就执行后面空的{}
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.path)
      }
    }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 5;
    text-align: center;
    height: 49px;
    font-size: 14px;  
    /* 文字大小 */  
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 一般来说，图片image下面会多3个px，为了去掉这三个px，可以这么操作：
     vertical-align: middle;*/
    vertical-align: middle;
    margin-bottom: 3px;
  }
   
</style>