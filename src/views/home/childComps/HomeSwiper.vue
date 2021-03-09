<template>
    <swiper>
        <swiper-item v-for="(item, index) in banners" :key='index'> 
        <a :href='item.link'>
            <img :src='item.image' alt="" @load="imageLoad">
        </a>
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
  //由于swiper文件夹中的index.js文件中已经导入了上面两个组件，所以不用分开导入了，可以一步操作
export default {
    name: 'HomeSwiper',
    data() {
        return {
            isLoad: false
        }
    },
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        SwiperItem,Swiper
    },
    methods: {
        imageLoad() {
            // console.log('轮播图加载完成')
            // 轮播图加载过一次后，就可以知道offsetTop的高度
            if(!this.isLoad) {
                this.$emit('swiperImageLoad')
                this.isLoad = true
            }
        }
    } 
}
</script>

<style scoped>
</style>