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
            currentIndex: null, // 当前所在滑块的索引
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
        this.currentIndex = this.current;
    },
    mounted() {
        /**
         * 初始
         * 设置比例高度、圆角
         * 设置过渡时长
         * 设置滑块左侧距离
         * 初始滑块位置
         * 判断衔接
         * 判断开始自动切换
        **/

        this.swiperWidth = document.querySelector(".swiper").clientWidth;

        let proportion = this.proportion.split(":");
        let proportionHeight = (proportion[1] / proportion[0] * this.swiperWidth).toFixed(2);
        let swiperContent = document.querySelector(".swiper-content");
        swiperContent.style.height = proportionHeight + 'px';
        swiperContent.style.borderRadius = this.fillet + 'px';

        this.setDuration(0);
        let dot = Array.from(document.querySelectorAll(".dot"));
        dot.forEach(i => i.style.transitionDuration = this.duration + "ms");


        this.quantity = this.data.length;
        this.sliderWidth = this.swiperWidth * (this.quantity - 1)
        this.lastX = -(this.swiperWidth * (this.quantity - 2))
        this.sliderLeft = -(this.swiperWidth * this.currentIndex);
        this.elasticForce = Math.round(this.swiperWidth * 0.4);

        this.setSliderX(this.sliderLeft)

        this.initSliderItem();
        this.setDuration(this.duration);

        if (this.circular) this.connectionPosition(this.sliderLeft)
        if (this.autoplay) this.startAutoPlay();
        setInterval(() => {
            this.sliderLeft += 10
        }, 100);
    },
    methods: {
        // 初始滑块位置
        initSliderItem() {
            this.$refs.sliderItem.forEach((i, j) => i.style.transform = "transLate(" + j * 100 + "%, 0)");
        },
        // 判断衔接位置
        connectionPosition(left) {
            if (left >= 0) {
                console.log("第一项")
                this.$refs.sliderItem[this.quantity - 1].style.transform = "transLate(" + -100 + "%, 0)";
            } else if (left < -(this.swiperWidth * (this.quantity - 2))) {
                console.log("最后一项")
                this.$refs.sliderItem[0].style.transform = "transLate(" + (this.quantity) * 100 + "%, 0)";
            } else {
                console.log("其他项")
                this.$refs.sliderItem[0].style.transform = "transLate(0%, 0)";
                this.$refs.sliderItem[this.quantity - 1].style.transform = "transLate(" + (this.quantity - 1) * 100 + "%, 0)";
            }
        },
        // 开始自动切换
        startAutoPlay(later) {
            clearInterval(this.loopPlayback);

            let num = 1;

            this.loopPlayback = setInterval(e => {
                this.currentIndex >= this.quantity - 1 ? this.currentIndex = 0 : this.currentIndex++;
                this.sliderLeft = -this.currentIndex * this.swiperWidth
                this.setSliderX(this.sliderLeft)

                this.inTransition = true;
                this.endTransition();

                if (this.isWaitFor && !later && num == 1) this.startAutoPlay(true);

                num++;

            }, this.isWaitFor && later ? this.interval + this.duration : this.interval)
        },
        // 按下区域
        pressRegion(event) {
            this.setDuration(0);

            clearInterval(this.loopPlayback);
            clearTimeout(this.transitionTiming);

            this.pressX = event.touches[0].clientX;
            this.pressY = event.touches[0].clientY;
            this.leaveX = this.pressX;
            this.currentLeft = this.getSliderX();
            this.setSliderX()

            console.log(this.exceeded)
        },
        slideRegion(event) {
            // this.setDuration(10);

            let clientX = event.touches[0].clientX
            let clientY = event.touches[0].clientY
            this.sliderLeft = clientX - this.pressX
            // this.setSliderX()
        },
        leaveRegion() {

        },
        // 设置左侧位置
        setSliderX() {
            console.log
            this.$refs.slider.style.left = this.sliderLeft + "px"
            window.requestAnimationFrame(this.setSliderX)
        },
        // // 滑动区域
        // slideRegion(event) {
        //     this.setDuration(10);

        //     let clientX = event.touches[0].clientX
        //     let clientY = event.touches[0].clientY

        //     // 过渡中只能水平移动
        //     if (this.inTransition) this.isLevel = true;

        //     // 判断是否水平移动
        //     if (this.isLevel === null) this.isLevel = Math.abs(clientX - this.pressX) > Math.abs(clientY - this.pressY);

        //     // 限制水平或垂直移动
        //     if (this.isLevel) {
        //         event.preventDefault()

        //         this.intensity = clientX - this.leaveX
        //         this.towardsNext = this.leaveX > clientX
        //         this.leaveX = clientX

        //         let target = this.leaveX - this.pressX + this.currentLeft

        //         // 是否衔接
        //         if (this.circular) {
        //             console.log("衔接")
        //         } else {
        //             // 是否回弹
        //             if (this.springback) {
        //                 console.log("回弹")
        //                 // 左侧或右侧极限
        //                 if (target >= 0) {
        //                     this.exceeded = true
        //                     let overstep = this.leaveX - this.pressX
        //                     target = overstep * this.elasticForce / (this.elasticForce + overstep)
        //                 } else if (target <= -this.sliderWidth) {
        //                     this.exceeded = true
        //                     let overstep = target + this.sliderWidth
        //                     target = -this.sliderWidth + overstep * this.elasticForce / (this.elasticForce - overstep)
        //                 }
        //             } else {
        //                 if (target >= 0) {
        //                     target = 0
        //                 } else if (target <= -this.sliderWidth) {
        //                     target = -this.sliderWidth
        //                 }
        //             }
        //         }

        //         this.setSliderX(target)
        //     } else {
        //         this.leaveX = this.pressX
        //     }
        // },
        // // 离开区域
        // leaveRegion() {
        //     this.setDuration(this.duration)

        //     this.isLevel = null
        //     this.currentLeft = this.getSliderX()

        //     // 判断是否移动
        //     if (this.leaveX && this.leaveX != this.pressX) {
        //         this.move = this.leaveX - this.pressX
        //         this.inTransition = true

        //         console.log(this.currentLeft)

        //         if (Math.abs(this.intensity) > 4) {
        //             if (!this.circular && (this.currentLeft > 0 || this.currentLeft < -this.swiperWidth * (this.quantity - 1))) {
        //                 console.log("不衔接")
        //                 this.setSliderX(this.sliderLeft)
        //             } else if (this.circular && (this.currentLeft > 0 || this.currentLeft < -this.swiperWidth * (this.quantity - 1))) {
        //                 console.log("衔接")
        //                 if (this.currentLeft < -this.swiperWidth * (this.quantity - 1)) {
        //                     console.log("顺序超出")
        //                     let overstep = this.currentLeft + (this.swiperWidth * (this.quantity - 1))
        //                     let left = this.swiperWidth + overstep
        //                     this.setDuration(0)
        //                     this.$refs.sliderItem[this.quantity - 1].style.transform = "transLate(" + -100 + "%, 0)";
        //                     this.$refs.sliderItem[0].style.transform = "transLate(0%, 0)";
        //                     this.setSliderX(left)
        //                     this.sliderLeft = left

        //                     // return
        //                     setTimeout(e => {
        //                         this.setDuration(this.duration)
        //                         this.setSliderX(0)
        //                         this.sliderLeft = 0
        //                         this.currentIndex = 0
        //                     }, 10)



        //                 } else if (this.currentLeft > 0) {
        //                     let overstep = this.swiperWidth - this.currentLeft
        //                     let right = -(this.swiperWidth * (this.quantity - 1) + overstep)
        //                     console.log("反向超出", right)
        //                     this.setDuration(0)
        //                     this.$refs.sliderItem[this.quantity - 1].style.transform = "transLate(" + (this.quantity - 1) * 100 + "%, 0)";
        //                     this.$refs.sliderItem[0].style.transform = "transLate(" + (this.quantity) * 100 + "%, 0)";
        //                     this.setSliderX(right)
        //                     this.sliderLeft = right

        //                     // return
        //                     setTimeout(e => {
        //                         this.setDuration(this.duration)
        //                         let position = -(this.swiperWidth * (this.quantity - 1))
        //                         this.setSliderX(position)
        //                         this.sliderLeft = position
        //                         this.currentIndex = this.quantity - 1
        //                     }, 10)
        //                 }
        //             } else {
        //                 // 力度切换
        //                 let spacing = Math.abs(Math.abs(this.currentLeft) - Math.abs(this.sliderLeft))

        //                 // 限制过多连续滑动
        //                 if (spacing < this.swiperWidth / 2) {
        //                     if (this.intensity > 0) {
        //                         this.sliderLeft = this.sliderLeft + this.swiperWidth

        //                         this.currentIndex <= 0 ? this.currentIndex = this.quantity - 1 : this.currentIndex--
        //                     } else {
        //                         this.sliderLeft = this.sliderLeft - this.swiperWidth

        //                         this.currentIndex >= this.quantity - 1 ? this.currentIndex = 0 : this.currentIndex++
        //                     }


        //                 }

        //                 this.setSliderX(this.sliderLeft)
        //             }
        //         } else if (this.inTransition) {
        //             // 中止过渡
        //             console.log("中止")
        //             // 判断方向
        //             if (this.currentLeft % this.swiperWidth + this.swiperWidth > this.swiperWidth / 2) {
        //                 this.sliderLeft = -(Math.floor(Math.abs(this.currentLeft) / this.swiperWidth) * this.swiperWidth)
        //             } else {
        //                 this.sliderLeft = -(Math.floor(Math.abs(this.currentLeft) / this.swiperWidth) * this.swiperWidth + this.swiperWidth)
        //             }
        //             this.setSliderX(this.sliderLeft)

        //             this.currentIndex = Math.abs(this.sliderLeft) / this.swiperWidth
        //         }
        //     } else {
        //         this.setSliderX(this.sliderLeft)
        //     }

        //     // 是否正在过渡,结束过渡状态
        //     if (this.inTransition) this.endTransition();

        //     if (this.circular) this.connectionPosition(this.sliderLeft)
        //     // 判断开始自动切换
        //     if (this.autoplay) this.startAutoPlay(this.inTransition);
        // },
        // 设置过渡时长
        setDuration(millisecond) {
            this.$refs.slider.style.transitionDuration = millisecond + "ms";
        },
        // 结束过渡状态
        endTransition() {
            this.transitionTiming = setTimeout(e => {
                this.inTransition = false;
                this.exceeded = false
            }, this.duration)
        },

        // 获取左侧位置
        getSliderX() {
            return this.$refs.slider.offsetLeft;
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