<template>
    <div class="swiper" ref="swiper">
        <div class="swiper-content" @touchstart="startslide" @touchmove="slide" @touchend="endstart">
            <div class="swiper-slider" ref="slider">
                <div class="swiper-slider-item" ref="sliderItem" v-for="item,index in data" :key="index">
                    {{item}}
                </div>
            </div>
        </div>
        <div class="indicator">
            <div class="dot" v-for="item,index in data" :key="index">
                <!-- 点 -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            width: null,
            pressX: null,
            pressY: null,
            move: null,
            leaveX: null,
            isLevel: null,
            sliderLeft: null,
            index: 0,
        }
    },
    mounted() {


        this.init()
    },
    methods: {
        init() {
            this.width = this.$refs.swiper.clientWidth
            this.sliderLeft = parseInt(this.$refs.slider.style.left) || 0

            this.$refs.sliderItem.forEach((i, j) => {
                i.style.left = j * this.width + "px"
            })
        },
        initData() {
            this.pressX = null
            this.pressY = null
            this.move = null
            this.leaveX = null
            this.isLevel = null
        },
        startslide(event) {

            console.log(event.touches[0].clientX, event.touches[0].clientY)
            this.pressX = event.touches[0].clientX
            this.pressY = event.touches[0].clientY
            this.$refs.slider.style.transition = "all 0s"
            console.log(event)
        },
        slide(event) {

            let clientX = event.touches[0].clientX
            let clientY = event.touches[0].clientY
            if (this.isLevel === null) {
                if (Math.abs(clientX - this.pressX) > Math.abs(clientY - this.pressY)) {
                    this.isLevel = true
                } else {
                    this.isLevel = false
                }
            }
            console.log(this.isLevel)
            if (this.isLevel) {

                event.preventDefault()
                this.leaveX = clientX
            } else {
                console.log(event.touches[0].clientX, event.touches[0].clientY)
                this.leaveX = this.pressX
            }
            this.$refs.slider.style.left = this.leaveX - this.pressX + this.sliderLeft + "px"

        },
        endstart() {
            this.$refs.slider.style.transition = "all .5s"
            if (this.leaveX !== null && this.leaveX != this.pressX) {
                this.move = this.leaveX - this.pressX
                console.log(this.move)
                if (Math.abs(this.move) > this.width / 2) {
                    if (this.move > 0) {
                        console.log(this.width * --this.index)
                        this.$refs.slider.style.left = this.sliderLeft + this.width + "px"
                        console.log("往左")
                    } else {
                        this.$refs.slider.style.left = this.sliderLeft - this.width + "px"
                        console.log("往右")
                    }
                    this.sliderLeft = parseInt(this.$refs.slider.style.left)
                } else {
                    this.$refs.slider.style.left = this.sliderLeft + "px"
                }
            } else {
                this.move = 0
            }

            this.initData()
        },
    }
}
</script>


<style scoped lang="scss">
.swiper {
    width: 80%;
    height: auto;
    position: relative;
    margin: 0 auto;

    .swiper-content {
        width: 100%;
        height: 160px;
        overflow: hidden;

        .swiper-slider {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .swiper-slider-item {
            width: 100%;
            height: 100%;
            background: gray;
            position: absolute;
        }
    }

    .indicator {
        pointer-events: none;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 12px;
        left: 0;
        right: 0;

        .dot {
            width: 10px;
            height: 10px;
            background: #fff;
            border-radius: 50%;
            margin-right: 8px;

            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>