<template>
    <div class="tab-control">
        <div v-for="(item, index) in titles" :key="index" 
        class="tab-control-item" :class="{active: index === currentIndex}" 
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
        <!-- 选中哪一个tab,哪一个tab的文字颜色变色，下面boder-bottom
        这里会用到currentIndex-->
    </div>
</template>
<script>
  export default {
    name: "TabControl",
    props: {
        titles: {
            type: Array,
            default() {
                return []
                // 当默认值是对象或者数组时，必须写成函数dafault() {}
            }
        }
    },
    data() {
        return {
            currentIndex: 0,
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index
            // 外面往里面传数据通过props,里面往外面传数据，通过emit
            this.$emit('tabClick', index)
        }
    }
  }
</script>

<style scoped>
    .tab-control {
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        /* background-color: rgb(22, 9, 9);背景颜色 */

        position: sticky;
        top: 44px;
        /* 当滑动到44px时，position变为固定 */
        color: slategrey;
        z-index: 2;
        background-color: var(--color-background);
    }
    .tab-control-item {
        flex: 1;
 
    }

    .tab-control-item span {
        padding: 5px;
    }
    .active {
        color: var(--color-high-text);
    }
    .active span {
        border-bottom: 3px solid var(--color-tint);
        /*加一根线*/

    }

</style>