<template>
    <div class="home">
        <swiper :data="list" :circular="false"></swiper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                "https://img2.baidu.com/it/u=4028963788,1491236689&fm=253&fmt=auto&app=138&f=JPG?w=889&h=500",
                "https://img1.baidu.com/it/u=1724157493,2813978428&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
                "https://img1.baidu.com/it/u=1542608407,2645267206&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
                "https://img1.baidu.com/it/u=1568193619,25276165&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=281",
                "https://img0.baidu.com/it/u=2134805653,2919336616&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
            ]
        }
    },
    mounted() {
        setTimeout(e => {
            this.a++
        }, 1000)
    }
}
</script>

<style scoped>
.home {
    width: 100%;
    height: 200vh;
}
</style>
