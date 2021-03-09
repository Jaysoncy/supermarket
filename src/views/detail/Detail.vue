<template>
  <div id="detail">
    <detail-nav-bar ref="detailNavBar" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="scroll-content" ref="scroll"
     :probe-type="2" @scroll="contentScroll" >
      <!-- <ul>
        <li v-for="(item, index) in $store.state.carList" :key="index">{{item}}</li>
      </ul> -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backTop()" v-show="isShowBackTop"/>
    <!-- <toast :message="message" v-show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import {getDeTail} from '@/network/detail'
import {Goods, Shop, GoodsParam, getRecommend} from '@/network/detail'
import DetailBaseInfo from './childComps/DeleteBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from '@/components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from '@/components/content/goods/GoodsList'
import {itemListwnerMixin, backTop} from 'common/mixin'
import {debounce} from 'common/utils'
import {mapActions} from 'vuex'
// import Toast from 'components/common/toast/Toast'
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  mixins: [itemListwnerMixin, backTop],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends:[],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: "",
      // show: false
      
    }
  },

  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      //1.获取y值
      const positionY = - position.y
      let length = this.themeTopYs.length
      //2.positionY和主题中的值进行对比
      // this.themeTopYs = [0, 12949, 13887, 14277]
      for(let i in this.themeTopYs) {
        // i = i*1 //将字符i转化为Num i
        i = parseInt(i)
        if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] &&
         positionY < this.themeTopYs[i+1])
         || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          // 将currentIndex传入到nav-bar组件当中
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        } 
      }
      //3.判断BackTop是否显示
      this.isBackTop(position)
    },
    addToCart() {
      // window.open("http://www.baidu.com");
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2.将商品添加到购物车里(1.Promise 2.mapActions)
      //这种方式的意思是在调用自己的方法addCart
      this.addCart(product).then(res => {
        // console.log(res)
        // this.show = true;
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ""
        //   // 在1.5秒后，不显示
        // }, 1500)
        this.$toast.show(res, 2000)
      })
      // 这个方式的意思是调用vuex中actions中的方法addcCart
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res);
      // })
    },
    
  },
  mounted() {
    console.log(this.themeTopYs)
  },

  created() {
    // console.log(this.$route.params.iid)
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    // console.log(this.iid)
    
    //2.根据iid请求详情数据
    getDeTail(this.iid).then(res => {
      // console.log(res);
      // 1.获取顶部的图片轮播数据
      const data = res.result;
      // console.log(data)
      this.topImages = res.result.itemInfo.topImages
      // console.log(this.topImages)

      //2.获取商品信息的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取商品参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
   
      //6.取出评论的信息
      if(data.rate.cRate !== 0) {
        this.commentInfo =  data.rate.list[0]
      }
      
      // this.$nextTick的意思是将当前组件的内容全部渲染好，之后会回调这个函数
      // 但是一定要注意：根据最新的数据，对应的DOM是已经被渲染出来的
      // 但是图片依然没有加载完
      // this.$nextTick(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      //   console.log(this.themeTopYs);
      // })
    })
    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
      // console.log(this.recommends)
    })
      
    //4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 48)
      console.log(this.themeTopYs);
    }, 400)
   
  
    
  },

  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener)
  }
  
}
</script>

<style scoped>
  #detail {
    /* 在详情页的信息中，将APP下方的导航栏覆盖掉 */
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  
  .detail-nav {
    position: relative; 
    /* 相对定位会保证位置不变，一般是用作微调的或者设置z-index的
    z-index是用来设置置于某一层的 */
    /* 注意：能用相对定位，尽量使用相对定位，不要使用fixed */
    z-index: 10;
    background-color: #fff;
    height: 44px;
  }

  .scroll-content {
    height: calc(100% - 44px - 46px);
    /* 这里的100%相当于父组件 */
    /* 父组件没有设置固定的高度，那么父组件会根据内容撑高的，
    所以希望父组件是固定高度的，在父组件那里设置height：100vh */
    /* overflow: hidden; */


  }
</style>