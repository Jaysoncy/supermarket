<template>
    <div class="goods">
        <goods-list-item v-for="(item, index) in goods" :key=index
        :goods-item='item'/>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    name: 'GoodsList',
    components: {
        GoodsListItem
    },
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
    .goods {
        display: flex;
        /*flex-wrap: nowrap;/*不包裹,默认全部在一行，均匀分布*/
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2px;
    }
</style>