export default {
    props: {
        // 当前选中标签索引
        currentIndex: {
            type: Number,
            default: 0
        },
        // 标签颜色
        tabColor: {
            type: String,
            default: "#000"
        },
        // 选中标签颜色
        activeColor: {
            type: String,
            default: "#7bbfea"
        },
        // 背景颜色
        background: {
            type: String,
            default: "#fff"
        },
        // 开启顶部边框
        border: {
            type: Boolean,
            default: false
        },
        // 开启顶部阴影
        shadow: {
            type: Boolean,
            default: false
        },
        // 定位屏幕底部
        fixedBottom: {
            type: Boolean,
            default: true
        },
        // 底部安全高度(单位:px)
        bottomSafeHeight: {
            type: Number,
            default: 0
        },
    }
}