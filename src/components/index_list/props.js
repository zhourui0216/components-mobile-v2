export default {
    props: {
        // 数据列表
        dataList: {
            type: Array,
            default: []
        },
        // 索引列表
        indexList: {
            type: Array,
            default: []
        },
        // 高度
        height: {
            type: String,
            default: "100%"
        },
        // 索引顶部距离
        indexTop: {
            type: Number,
            default: 0
        },
        // 索引颜色
        indexColor: {
            type: String,
            default: "#ccc"
        },
        // 选中颜色
        activeColor: {
            type: String,
            default: "#fff"
        },
        // 选中背景
        activeBackground: {
            type: String,
            default: "#7bbfea"
        }
    }
}