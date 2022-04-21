<template>
    <div class="home">
        <router-link to="/navbar" tag="div">导航栏</router-link>
        <router-link to="/tabbar" tag="div">标签栏</router-link>
        <router-link to="/swiper" tag="div">轮播图</router-link>
        <router-link to="/indexList" tag="div">索引列表</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped lang="scss">
.home {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;

    div {
        width: calc(50% - 5px);
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #fff;
        background: #a0eee1;
        border-radius: 10px;

        & {
            margin-bottom: 10px;
        }
    }
}
</style>
