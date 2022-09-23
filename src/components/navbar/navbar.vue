<template>
    <div :class="['navbar', border ? 'border' : '', shadow ? 'shadow' : '', fixedTop ? 'fixed' : '']" :style="{background, paddingTop: topSafeHeight + 'px'}">
        <div class="navbar-content">
            <!-- 返回 -->
            <div class="back" v-if="showBack" @click="back()">
                <svg class="icon" :style="{fill: backColor}" t="1650540591785" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2039">
                    <path d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z" p-id="2040"></path>
                </svg>
            </div>
            <!-- 标题 -->
            <div class="title">
                <p :style="{color: titleColor}">{{title}}</p>
            </div>
            <!-- 自定义 -->
            <div class="custom">
                <slot></slot>
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

        }
    },
    methods: {
        // 返回上页
        back() {
            this.$router.back()
        }
    }
}
</script>

<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 44px;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    z-index: 100;

    .navbar-content {
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;

        > div {
            max-width: 30%;
            position: absolute;
            top: 50%;
        }

        .back {
            transform: translate(0, -50%);
            display: flex;
            align-items: center;
            left: 12px;

            svg {
                width: 24px;
                height: 24px;
            }
        }

        .title {
            transform: translate(-50%, -50%);
            left: 50%;

            p {
                font-size: 16px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .custom {
            transform: translate(0, -50%);
            right: 12px;
        }
    }
}

.border {
    border-bottom: 0.5px solid #ccc;
}

.shadow {
    box-shadow: 0 0 12px -4px #ddd;
}

.fixed {
    position: fixed;
    top: 0;
    left: 0;
}
</style>