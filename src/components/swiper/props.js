export default {
    props: {
        // 数据
        data: {
            type: Array,
            required: true
        },
        // 是否显示指示点
        indicatorDots: {
            type: Boolean,
            default: true
        },
        // 指示点颜色
        indicatorColor: {
            type: String,
            default: "#f5f5f5"
        },
        // 选中指示点颜色
        indicatorActiveColor: {
            type: String,
            default: "#047ef0"
        },
        // 圆角
        fillet: {
            type: Number,
            default: 0
        },
        // 是否自动切换
        autoplay: {
            type: Boolean,
            default: false
        },
        // 切换间隔时长
        interval: {
            type: Number,
            default: 3000
        },
        // 切换动画时长
        duration: {
            type: Number,
            default: 500
        },
        // 自动切换是否等待动画时长
        isWaitFor: {
            type: Boolean,
            default: true
        },
        // 是否衔接滑动
        circular: {
            type: Boolean,
            default: false
        },
        // 是否回弹
        springback: {
            type: Boolean,
            default: true
        },
    }
}