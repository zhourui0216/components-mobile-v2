export default {
    props: {
        // 标题
        title: {
            type: String,
            default: "标题"
        },
        // 标题颜色
        titleColor: {
            type: String,
            default: "#000"
        },
        // 显示返回
        showBack: {
            type: Boolean,
            default: true
        },
        // 返回颜色
        backColor: {
            type: String,
            default: "#000"
        },
        // 背景颜色
        background: {
            type: String,
            default: "#fff"
        },
        // 开启底部边框
        border: {
            type: Boolean,
            default: false
        },
        // 开启底部阴影
        shadow: {
            type: Boolean,
            default: false
        },
        // 定位屏幕顶部
        fixedTop: {
            type: Boolean,
            default: true
        },
        // 顶部安全高度(单位:px)
        topSafeHeight: {
            type: Number,
            default: 0
        }
    }
}