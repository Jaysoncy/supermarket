<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>



<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    /* 设置left和right属性可以保证整个标签s的宽度是
    占据整个页面的宽度 */
    bottom: 0;  
    /* 距底面距离为0 */
    box-shadow: 0 -1px 1px rgba(100,100,100,1);
  }

</style>
