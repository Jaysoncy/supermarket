<template>
    <swiper class="detail-swiper" >
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'
//默认导出swiper文件夹中的index文件
export default {
  name: "DetailSwiper",
  components: {
    Swiper,SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      } 
    }
  },

}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
    /* 设置图片高度为300px，超出部分隐藏起来 */
  }
</style>