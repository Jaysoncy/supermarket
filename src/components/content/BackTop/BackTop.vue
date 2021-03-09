<template>
    <div class="back-top">
      <img src='~assets/images/common/top.png' alt=''>
    </div>
</template>

<script>
export default {
    name: 'BackTop',
}
</script>

<style scoped>
/* scoped代表作用域，加了scoped的话，意味着样式只对当前组件有效 */
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }


</style>