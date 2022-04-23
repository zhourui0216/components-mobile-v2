<template>
    <div class="box">
        <div class="title">
            <navbar :border="true" :fixedTop="true" />
        </div>

        <div class="main">
            <index-list :indexList="indexList" :dataList="dataList">
                <p>顶部</p>
            </index-list>
        </div>
    </div>
</template>

<script>
import cityRanking from "../../assets/cityRanking.js"
export default {
    data() {
        return {
            indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K",
                "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"
            ],
            dataList: null
        }
    },
    mounted() {
        this.dataList = cityRanking
    }
}
</script>

<style scoped lang="scss">
.box {
    height: 100%;
    display: flex;
    flex-direction: column;

    .title {
        height: 44px;
    }

    .main {
        width: 100%;
        flex: 1;
        overflow: auto;
    }
}
</style>