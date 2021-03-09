<template>
  <div id="home">
    <nav-bar class='home-bar'>
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" 
      ref="topTabControl" @tabClick='tabClick'
      class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" 
    :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends='recommends'/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']" 
      ref="tabControl" @tabClick='tabClick'/>
      <!-- 动态绑定class，如果isTabFixed为true，则存在这个class;否则不存在这个class -->
      <goods-list :goods="showGoods">
      </goods-list>
    </scroll>
    <!-- <back-top @click="backClick()"></back-top> -->
  <!-- 组件不能直接监听点击，标签可以监听，比如：<div>,<p> -->
    <back-top @click.native="backTop()" v-show="isShowBackTop"/>
    <!-- .native: 监听组件根元素的原生事件 -->
  </div>
</template>

<script>
//子组件的导入
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
//公共组件的导入
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
//导入url
  import {getHomeMultidata, getHomeGoods} from 'network/home'
//导入方法
  import {itemListwnerMixin, backTop} from 'common/mixin'

    export default {
        name: "Home",
        components: {
          HomeSwiper,
          RecommendView,
          FeatureView,
          NavBar,
          TabControl,
          GoodsList,
          Scroll
              
        },
        mixins: [itemListwnerMixin, backTop],

        data() {
          return {
            // 函数调用，会压入函数栈中，函数栈会保存函数调用中所有的临时变量，
            // 函数调用结束，会弹出函数栈，释放函数所有的变量；（被内存回收掉）
          // 所以将网络请求调用的函数拿到的结果保存起来
            result: null,
            banners: [],
            recommends: [],
            goods: {
              'pop': {page: 0, list: []},
              'new': {page: 0, list: []},
              'sell': {page: 0, list: []}
            },
            currentType: 'pop',
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0,
          }
        },
        destroyed() {
          // console.log('首页被销毁')
        },
        activated() {
          //刚进入该组件时，执行
          // console.log('组件刚进来')
          this.$refs.scroll.scrollTo(0, this.saveY, 0)
          this.$refs.scroll.refresh()
          
        },
        deactivated() {
          //离开该组件时，执行
          //1.保存Y值
          this.saveY = -this.$refs.scroll.getScrollY
          //2.取消全局事件的监听
          this.$bus.$off('itemImageLoad', this.itemImgListener)
        },
        created() {
          //1.请求多个数据
          this.getHomeMultidata()
          //2.请求商品数据
          this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')
          //3.手动代码点击一次
          this.tabClick(0)
        },
        computed: {
          showGoods() {
            return this.goods[this.currentType].list
          }
        },
        methods: { 
          /*事件监听相关的方法*/

          //获取tabControl的offsetTop
          //所有的组件都有一个属性$el:用于获取组件中的元素,也就是template中的元素
          // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
          //这样获取的offsetTop是不准确的，因为很有可能图片没有加载完,
          //这样的话，求出来的高度不是我们想要的高度
          // console.log(this.tabOffsetTop)
          swiperImageLoad() {
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
            // console.log(this.tabOffsetTop)
          },
          tabClick(index) {
            switch(index) {
              case 0:
                this.currentType = 'pop'
                break
              case 1:
                this.currentType = 'new'
                break
              case 2:
                this.currentType = 'sell'
                break
            }
            // 让两个TabControl中的currentIndex保持一致
            if (this.$refs.topTabControl !== undefined) {
              this.$refs.topTabControl.currentIndex = index;
              this.$refs.tabControl.currentIndex = index;
            }


          },
          contentScroll(position) {
            // console.log(position)
            //第一步：判断BackTop是否显示
            this.isBackTop(position)
            //决定tabControl是否吸顶(position: fixed)
            this.isTabFixed = (-position.y) > this.tabOffsetTop

          },
          loadMore() {
            // console.log('上拉加载更多')
            this.getHomeGoods(this.currentType)
            // this.$refs.scroll.scroll.refresh() 
            //图片是异步加载，滚动高度固定，
            //刚开始计算的可滚动高度是众多item的高度，不包括图片的高度；
            //当图片加载过后，item的高度被撑高，所以会出现，滚动到一定程度，滚动不了
            //所以需要重新更新,重新计算可滚动的高度
            //可以一直滚动，不出现滚动不了的情况是因为：在计算可滚动高度时，图片已经加载完成
          },
          /*网络请求相关的方法*/

          //请求多个数据
          getHomeMultidata() {
            getHomeMultidata().then(res => {
              // console.log(res);
              // res变量指向一个对象,在函数执行完之后,res变量被回收
              // 没有其他变量指向这个对象了，垃圾回收站就会回收这个对象
              //通过this.result指向（将res赋值给this.result,相当于把内存地址赋值给它;
              // 这样它们两个指向同一个对象）
              // 函数执行完，res变量被回收，但是这个对象还有this.result指向它，所以这个对象不会被回收
              this.result = res;  //保存了结果
              // 箭头函数中的this往上一层寻找，这里的this指的是Home这个组件
              this.banners = res.data.banner.list;
              this.recommends = res.data.recommend.list;
            })
          },

          //请求商品数据
          getHomeGoods(type) {
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {
              console.log(res)
              this.goods[type].list.push(...res.data.list)    
              // 对res.data.list数组进行解析，将其元素一个一个地加入到push前的数组  
              this.goods[type].page += 1       
              this.$refs.scroll.finishPullUp()
            })  
          },
         
        }
    }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh; 
    /* vh -> viewport height */
  }
  .home-bar {
    /* App.vue中引入了base.css文件
    base.css文件中定义了变量color-tint */
    background-color: var(--color-tint);
    color: #fff;  /*文字颜色*/
    /* position: fixed;
    left: 0;
    right: 0; */
    top: 0;
    /* z-index: 5; */
    /* 设置元素的堆叠顺序，拥有更高堆叠顺序的元素总是处于堆叠顺序较低的元素的前面 */
  }

  .tab-control {
    /* position: sticky; */
    top: 0;
    /* 当滑动到44px时，position变为固定 */
    color: slategrey;
    z-index: 2;
    background-color: var(--color-background);
  }

  /* .content {
    margin-top: 44px;
    height: calc(100% - 93px);
    overflow: hidden;
  } */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>

