<template>
    <div class="recommend">
        <div v-for="(item,index) in recommends" :key=index class="recommend-item">
            <a :href='item.link'>
                <img :src='item.image' alt=''>
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>

</template>

<script>
export default {
    name: 'RecommendView',
    props: {
        recommends: {
            type: Array,
            default() {
                return []
            }
        }
    },
      
}
</script>

<style scoped>
    .recommend {
        display: flex; 
        /* flex布局 */
        width: 100%;
        text-align: center;/*居中*/
        font-size: 14px;/*文字大小*/
        
        padding: 10px 0 20px;/*上面10，左右0，下面20*/
        border-bottom: 10px solid #eee;
    }
    .recommend-item {
        flex: 1;
        /* 均匀布局：flex=1 */
    }
    .recommend-item img {
        width: 70px;
        height: 70px;/*图片大小*/
        margin-bottom: 10px;
    }
</style>