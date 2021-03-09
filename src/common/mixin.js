import {debounce} from 'common/utils.js'
import BackTop from 'components/content/BackTop/BackTop'


export const itemListwnerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    //先import {debounce}
    this.refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {this.refresh()}
    this.$bus.$on("itemImageLoad", this.itemImgListener)
    // console.log("我是混入中的mounted")
  }
}

export const backTop = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    isBackTop(position) {
      this.isShowBackTop = - position.y > 1000 
    }
  }
}