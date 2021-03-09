<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
      :is-check="isSelectAll"
      @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{CheckLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { //全部都选中,注意这里要使用 =,而不是 ===, =代表赋值
        this.cartList.forEach(item => {item.isCheck = false});
      } else { //部分或全部不选中
        this.cartList.forEach(item => {item.isCheck = true});
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000)
        
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),

    totalPrice() {
      return '￥' + this.$store.state.carList.filter(item => {
        return item.isCheck
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
      // toFixed保留几位小数
    },
    CheckLength() {
      return this.cartList.filter(item => item.isCheck).length
    },
    isSelectAll() {
      //1.使用filter
      // if (this.cartList.length === 0) {return false} else {
      //   return !(this.cartList.filter(item => !item.ischeck).length)
      // }
      // 2.使用find
      if (this.cartList.length === 0) {return false} else {
        return !(this.cartList.find(item => !item.isCheck))
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    background-color: #eee;
    line-height: 40px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
    font-size: 14px;

  }

  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    line-height: 20px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 100px;
    background: rgb(105, 86, 86);
    color: #fff;
    text-align: center;
  }
</style>