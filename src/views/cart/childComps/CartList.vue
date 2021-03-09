<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" 
      :key="index" :product="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
/* 必须给scroll一个固定高度，才能决定应该如何滚动 */
/* 使用了calc,就必须确定父组件的固定高度 */
/*cart-list的父组件是cart */
  .cart-list {
    height: calc(100% - 44px  - 49px - 40px);
  }
  /* content的父组件是cart-list */
  .content {
    height: calc(100%);
    overflow: hidden
  }
</style>