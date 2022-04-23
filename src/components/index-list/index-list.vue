<template>
    <div class="index-list" ref="indexList" :style="{height}" @scroll="change">
        <div class="topArea" ref="topArea">
            <slot></slot>
        </div>
        <!-- 列表 -->
        <div class="index-list-item" ref="indexListItem" v-for="item,index in dataList" :key="item.id">
            <div class="title">
                <p>{{indexList[index]}}</p>
            </div>
            <div class="item" v-for="n in item" :key="n.id">
                <p>{{n}}</p>
            </div>
        </div>
        <!-- 索引 -->
        <div class="index" :style="{pointerEvents: scrolling ? 'none' : 'auto'}" ref="index" @touchstart.prevent="clickIndex" @touchmove.prevent="move" @touchend.prevent="leave">
            <svg class="icon" width="16" height="16" t="1650621630381" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23762">
                <path d="M297.38 553.38l180.69-180.69c18.72-18.72 49.16-18.72 67.88 0l180.69 180.69c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L512 429.25 342.62 598.62c-12.5 12.5-32.75 12.5-45.25 0-6.25-6.25-9.38-14.44-9.38-22.62s3.13-16.38 9.39-22.62z m203.31-135.76v0.31-0.31z" p-id="23763"></path>
                <path d="M896 512c0 211.74-172.26 384-384 384S128 723.74 128 512s172.26-384 384-384 384 172.26 384 384m64 0c0-247.42-200.58-448-448-448S64 264.58 64 512s200.58 448 448 448 448-200.58 448-448z" p-id="23764"></path>
            </svg>
            <p :style="currentIndex == index + 1 ? {color:activeColor,background:activeBackground} : ''" v-for="item,index in indexList" :key="item.id">{{item}}</p>
        </div>
        <!-- 提示标签 -->
        <transition name="fade-scale">
            <div class="tips" ref="tips" :style="{color:activeColor,background:activeBackground}" v-show="showTips">
                <p>{{tipsValue}}</p>
            </div>
        </transition>
    </div>
</template>

<script>
import props from "./props.js"
export default {
    mixins: [props],
    data() {
        return {
            innerHeight: null,
            indexHeight: null,
            scrollPosition: null,
            currentIndex: 0,
            scrolling: false,
            timer: null,
            sideIndexHeight: null,
            indexItemHeight: null,
            indexY: null,
            showTips: false,
            tipsValue: null,
        }
    },
    mounted() {
        this.innerHeight = window.innerHeight
        this.indexHeight = this.$refs.index.clientHeight
        this.$refs.index.style.top = (this.innerHeight - this.indexHeight + this.indexTop) / 2 + "px"

        this.scrollPosition = [0]

        setTimeout(() => {
            let scrollHeight = this.$refs.topArea.clientHeight
            for (let i in this.$refs.indexListItem) {
                this.scrollPosition.push(scrollHeight)
                scrollHeight += this.$refs.indexListItem[i].clientHeight
            }
            console.log(this.scrollPosition)
        }, 0);
    },
    methods: {
        change(e) {
            let scrollTop = this.$refs["indexList"].scrollTop
            // console.log(this.scrollPosition.length)
            for (let i = this.scrollPosition.length - 1; i >= 0; i--) {
                if (scrollTop >= this.scrollPosition[i]) {
                    this.currentIndex = i
                    break
                }
            }
            this.scrolling = true
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.scrolling = false
            }, 100);
        },
        clickIndex(e) {
            clearTimeout(this.timer)

            let sizeInfo = this.$refs.index.getBoundingClientRect()
            this.sideIndexHeight = sizeInfo.height
            this.indexItemHeight = this.sideIndexHeight / (this.indexList.length + 1)
            this.indexY = sizeInfo.y
            console.log(this.sideIndexHeight, this.indexItemHeight, this.indexY)

            this.move(e)
        },
        move(e) {
            let elHeight = e.touches[0].pageY

            let index = null;

            if (elHeight <= this.indexY) {
                index = 0
            } else if (elHeight >= this.sideIndexHeight + this.indexY) {
                index = this.indexList.length
            } else {
                index = Math.floor((elHeight - this.indexY) / this.indexItemHeight)
            }

            if (this.currentIndex == index) return;

            this.currentIndex = index
            this.$refs["indexList"].scrollTop = this.scrollPosition[this.currentIndex]

            if (this.currentIndex === 0) {
                this.showTips = false
                this.tipsValue = this.indexList[0]
                this.$refs.tips.style.top = this.indexY + this.indexItemHeight / 2 + "px"
                return
            }

            this.showTips = true
            this.tipsValue = this.indexList[this.currentIndex - 1]
            this.$refs.tips.style.top = this.currentIndex * this.indexItemHeight + this.indexY - this.indexItemHeight / 2 + "px"
        },
        leave(e) {
            this.scrolling = false
            this.showTips = false
        },
    }
}
</script>

<style scoped lang="scss">
.index-list {
    width: 100%;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }

    &-item {
        width: 100%;

        .title {
            position: sticky;
            top: 0;

            p {
                width: 100%;
                height: 28px;
                line-height: 28px;
                background: #f4f4f4;
                box-sizing: border-box;
                padding: 0 24px;
            }
        }

        .item {
            border-bottom: 1px solid #f4f4f4;

            p {
                width: 100%;
                height: 40px;
                line-height: 40px;
                box-sizing: border-box;
                padding: 0 20px;
            }
        }

        &:nth-last-child(3) {
            .item:last-child {
                border: none;
            }
        }
    }

    .index {
        user-select: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-right: 8px;
        position: fixed;
        right: 0;
        z-index: 100;

        .icon {
            margin: 2px 0;
        }

        p {
            width: 16px;
            height: 16px;
            font-size: 12px;
            text-align: center;
            line-height: 16px;
            border-radius: 50%;
            margin: 2px 0;
        }
    }

    .fade-scale-enter {
        opacity: 1;
    }

    .fade-scale-enter-active {
        transition: opacity 0s;
    }

    .fade-scale-leave-active {
        transition: opacity 0.6s;
    }

    .fade-scale-leave-to {
        opacity: 0;
    }

    .tips {
        width: 40px;
        height: 40px;
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        border-top-right-radius: 0;
        transform: rotate(45deg);
        position: fixed;
        right: 60px;
        z-index: 100;

        p {
            transform: rotate(-45deg);
        }
    }
}
</style>