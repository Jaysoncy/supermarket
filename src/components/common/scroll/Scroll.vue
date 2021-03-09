<template>
<!-- ref/children -->
    <div class="wrapper" ref='wrapper'>
      <div class='content'>
        <slot></slot>
      </div>

    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // this.scroll = new BScroll(document.querySelector('.wrapper'))
      //通过document.querySelector拿对象的话，不一定拿到该公共组件下的wrapper，
      // 可能会拿到引用该公共组件的组件中出现的wrapper
      //1.创建BSscroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        observeDOM: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observerImage: true //根据加载图片的高度动态更新滚动高度

      })
      //2. 监听滚动的位置
      if (this.probeType === 2 || this.probeType ===3) {
        this.scroll.on('scroll',(position) => {
        // console.log(position)
        this.$emit('scroll', position) //自定义一个事件，scroll
        //自定义的事件相当于click，可以通过@click来处理；
        })
      }

      //3.监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多')
        this.$emit('pullingUp')
        })
      }

    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        // console.log("------")
        this.scroll && this.scroll.refresh()
        //当this.scroll不为null时，才可以更新
      },
      getScrollY() {
        return this.scroll.y ? this.scroll.y : 0
        //this.scroll有值的话，返回该值，没值的话，返回0
      }
    }
}
    </script>

<style scoped>
/* scoped代表作用域，加了scoped的话，意味着样式只对当前组件有效 */

</style>