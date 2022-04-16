<template>
    <div class="swiper">
        <div class="swiper-content">
            <div class="swiper-slider" ref="slider" @touchstart="pressRegion" @touchmove="slideRegion" @touchend="leaveRegion">
                <div class="swiper-slider-item" ref="sliderItem" v-for="item,index in data" :key="index">
                    <img :src="item">
                </div>
            </div>
        </div>
        <div class="indicator" v-if="indicatorDots">
            <div class="dot" :style="{background: currentIndex == index ? indicatorActiveColor : indicatorColor}" v-for="item,index in data" :key="index">
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
            swiperWidth: null, // swiper宽度
            proportionHeight: null, // 比例高度
            pressX: null, // 按下水平坐标
            pressY: null, // 按下垂直坐标
            move: null, // 移动距离
            leaveX: null, // 离开水平坐标
            isLevel: null, // 是否水平移动
            intensity: null, // 力度
            elasticForce: null, // 弹力
            sliderLeft: null, // 滑块左侧距离
            currentLeft: null, // 当前左侧距离
            quantity: null, // 数量
            currentIndex: 0, // 当前所在滑块的索引
            loopPlayback: null, // 循环切换计时器
            inTransition: false, // 过渡状态
            transitionTiming: null, // 过渡计时器
        }
    },
    mounted() {
        /**
         * 初始获取宽度、左侧距离、数量、弹力
         * 初始滑块位置
         * 添加动画
         * 判断开始自动切换
        **/
        this.addTransition()
        this.swiperWidth = document.querySelector(".swiper").clientWidth
        this.quantity = this.data.length
        this.elasticForce = (this.swiperWidth * 0.4).toFixed(2)

        this.currentIndex = this.current
        this.sliderLeft = -(this.swiperWidth * this.currentIndex)
        this.$refs.slider.style.left = this.sliderLeft + "px"

        // 比例
        let proportion = this.proportion.split(":")
        this.proportionHeight = (proportion[1] / proportion[0] * this.swiperWidth).toFixed(2)

        let swiperContent = document.querySelector(".swiper-content")
        swiperContent.style.height = this.proportionHeight + 'px'
        swiperContent.style.borderRadius = this.fillet + 'px'


        this.initSliderItem()
        this.addTransition()

        if (this.autoplay) this.startAutoPlay();
    },
    methods: {
        // 初始滑块位置
        initSliderItem() {
            this.$refs.sliderItem.forEach((i, j) => i.style.transform = "transLate(" + j * 100 + "%, 0)")
        },
        // 按下区域
        pressRegion(event) {
            this.pressX = event.touches[0].clientX
            this.pressY = event.touches[0].clientY
            this.leaveX = this.pressX
            this.currentLeft = this.getCurrentLeft()

            this.removeTransition()

            clearInterval(this.loopPlayback)
            clearTimeout(this.transitionTiming)

            this.$refs.slider.style.left = this.currentLeft + "px"
        },
        // 滑动区域
        slideRegion(event) {
            let clientX = event.touches[0].clientX
            let clientY = event.touches[0].clientY

            // 过渡中只能水平移动
            if (this.inTransition) this.isLevel = true;

            // 判断是否水平移动
            if (this.isLevel === null) this.isLevel = Math.abs(clientX - this.pressX) > Math.abs(clientY - this.pressY);

            // 限制水平或垂直移动
            if (this.isLevel) {
                event.preventDefault()

                this.intensity = clientX - this.leaveX
                this.leaveX = clientX

                this.$refs.slider.style.left = this.leaveX - this.pressX + this.currentLeft + "px"
            } else {
                this.leaveX = this.pressX
            }
        },
        // 离开区域
        leaveRegion() {
            this.isLevel = null
            this.currentLeft = this.getCurrentLeft()

            this.addTransition()

            // 判断是否移动
            if (this.leaveX && this.leaveX != this.pressX) {
                this.move = this.leaveX - this.pressX
                this.inTransition = true

                if (Math.abs(this.intensity) > 4) {
                    if (!this.circular && this.currentLeft > 0 || this.currentLeft < -this.swiperWidth * (this.quantity - 1)) {
                        this.$refs.slider.style.left = this.sliderLeft + "px"
                    } else {
                        // 力度切换
                        let spacing = Math.abs(Math.abs(this.currentLeft) - Math.abs(this.sliderLeft))

                        // 限制过多连续滑动
                        if (spacing < this.swiperWidth) {
                            this.judgeTheSlidingDirection(this.intensity)
                        } else {
                            this.$refs.slider.style.left = this.sliderLeft + "px"
                        }
                    }
                } else if (this.inTransition) {
                    // 中止过渡
                    console.log(111)
                    this.terminationTransition()
                }
            } else {
                this.$refs.slider.style.left = this.sliderLeft + "px"
            }

            // 是否正在过渡,结束过渡状态
            if (this.inTransition) this.endTransition();

            // 判断开始自动切换
            if (this.autoplay) this.startAutoPlay(this.inTransition);
        },
        // 判断滑动方向
        judgeTheSlidingDirection(value) {
            if (value > 0) {
                this.$refs.slider.style.left = this.sliderLeft + this.swiperWidth + "px"
                this.currentIndex <= 0 ? this.currentIndex = this.quantity - 1 : this.currentIndex--
            } else {
                this.$refs.slider.style.left = this.sliderLeft - this.swiperWidth + "px"
                this.currentIndex >= this.quantity - 1 ? this.currentIndex = 0 : this.currentIndex++
            }

            this.sliderLeft = this.getSliderLeft()
        },
        // 开始自动切换
        startAutoPlay(later) {
            clearInterval(this.loopPlayback)

            let num = 1

            this.loopPlayback = setInterval(e => {
                this.currentIndex >= this.quantity - 1 ? this.currentIndex = 0 : this.currentIndex++
                this.$refs.slider.style.left = -this.currentIndex * this.swiperWidth + "px"
                this.sliderLeft = this.getSliderLeft()

                this.inTransition = true
                this.endTransition()

                if (this.isWaitFor && !later && num == 1) this.startAutoPlay(true);

                num++

            }, this.isWaitFor && later ? this.interval + this.duration : this.interval)
        },
        // 添加过渡
        addTransition() {
            this.$refs.slider.style.transitionDuration = this.duration + "ms"
        },
        // 移除过渡
        removeTransition() {
            this.$refs.slider.style.transitionDuration = "0ms"
        },
        // 中止过渡
        terminationTransition() {
            if (this.currentLeft % this.swiperWidth !== 0) {
                // 判断方向
                if (this.currentLeft % this.swiperWidth + this.swiperWidth > this.swiperWidth / 2) {
                    this.$refs.slider.style.left = -(Math.floor(Math.abs(this.currentLeft) / this.swiperWidth) * this.swiperWidth) + "px"
                } else {
                    this.$refs.slider.style.left = -(Math.floor(Math.abs(this.currentLeft) / this.swiperWidth) * this.swiperWidth + this.swiperWidth) + "px"
                }

                this.sliderLeft = this.getSliderLeft()
                this.currentIndex = Math.abs(this.sliderLeft) / this.swiperWidth
            }
        },
        // 结束过渡状态
        endTransition() {
            this.transitionTiming = setTimeout(e => {
                this.inTransition = false
            }, this.duration)
        },
        // 获取滑块左侧距离
        getSliderLeft() {
            return parseInt(this.$refs.slider.style.left) || 0
        },
        // 获取当前左侧距离
        getCurrentLeft() {
            return this.$refs.slider.offsetLeft
        },
    },
}
</script>

<style scoped lang="scss">
.swiper {
    width: 100%;
    height: auto;
    user-select: none;
    position: relative;

    .swiper-content {
        width: 100%;
        overflow: hidden;

        .swiper-slider {
            width: 100%;
            height: 100%;
            position: relative;

            .swiper-slider-item {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;

                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    pointer-events: none;
                }
            }
        }
    }

    .indicator {
        transform: translate(-50%, 0);
        display: flex;
        justify-content: center;
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