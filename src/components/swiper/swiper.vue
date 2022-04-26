<template>
    <div class="swiper">
        <div class="swiper_container" @touchstart="pressRegion" @touchmove="slideRegion" @touchend="leaveRegion">
            <div class="swiper_container_slider" ref="slider">
                <div class="slider_item" ref="sliderItem" v-for="item,index in data" :key="index">
                    <img :src="item">
                </div>
            </div>
        </div>
        <div class="swiper_indicator" v-if="indicatorDots">
            <div class="dot" :style="{background: currentIndex == index ? indicatorActiveColor : indicatorColor,transitionDuration: duration + 'ms'}" v-for="item,index in data" :key="index">
                <!-- 指示点 -->
            </div>
        </div>
    </div>
</template>

<script>
import props from "./props.js"
export default {
    mixins: [props],
    data() {
        return {
            currentIndex: null, // 当前索引
            quantity: null, // 数量
            swiperWidth: null, // swiper宽度
            sliderWidth: null, // 滑块宽度
            lastX: null, // 最后一个位置 
            pressX: null, // 按下水平坐标
            pressY: null, // 按下垂直坐标
            move: null, // 移动距离
            towardsNext: null, // 朝向下个
            leaveX: null, // 离开水平坐标
            isLevel: null, // 是否水平移动
            intensity: null, // 力度
            elasticForce: null, // 弹力
            exceeded: null, // 已超出
            sliderLeft: null, // 滑块左侧距离
            currentLeft: null, // 当前左侧距离
            loopPlayback: null, // 循环切换计时器
            inTransition: false, // 过渡状态
            transitionTiming: null, // 过渡计时器
        }
    },
    created() {
        this.currentIndex = this.current
        this.quantity = this.data.length;
    },
    mounted() {
        this.swiperWidth = document.querySelector(".swiper").clientWidth;

        let proportion = this.proportion.split(":");
        let proportionHeight = (proportion[1] / proportion[0] * this.swiperWidth).toFixed(2);
        let swiperContent = document.querySelector(".swiper_container");
        swiperContent.style.height = proportionHeight + 'px';
        swiperContent.style.borderRadius = this.fillet + 'px';

        this.initSliderItem();
    },
    methods: {
        // 初始滑块位置
        initSliderItem() {
            this.$refs.sliderItem.forEach((i, j) => i.style.transform = "transLate(" + j * 100 + "%, 0)");
        },
        pressRegion() {
            console.log("按下")
        },
        slideRegion() {
            console.log("移动")
        },
        leaveRegion() {
            console.log("离开")
        },
    },
}
</script>

<style scoped lang="scss">
.swiper {
    width: 100%;
    user-select: none;
    position: relative;

    &_container {
        width: 100%;
        overflow: hidden;

        &_slider {
            width: 100%;
            height: 100%;
            position: relative;

            .slider_item {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;

                > * {
                    width: 100%;
                    height: 100%;
                    display: block;
                    position: relative;
                }
            }
        }
    }

    &_indicator {
        display: flex;
        justify-content: center;
        transform: translate(-50%, 0);
        pointer-events: none;
        position: absolute;
        bottom: 12px;
        left: 50%;

        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin: 0 4px;
        }
    }
}
</style>