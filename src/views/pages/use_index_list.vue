<template>
	<div class="box">
		<div class="title">
			<navbar :border="true" :fixedTop="true" />
		</div>

		<div class="main">
			<index-list :indexList="indexList" :dataList="dataList">
				<div class="slot">
					<p>顶部内容1</p>
					<p>顶部内容2</p>
				</div>
			</index-list>
		</div>
	</div>
</template>

<script>
import navbar from "../../components/navbar/index.vue";
import indexList from "../../components/index_list/index.vue";
import cityRanking from "../../assets/cityRanking.js";
export default {
	components: {
		navbar,
		indexList
	},
	data() {
		return {
			indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K",
				"L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"
			],
			dataList: null
		}
	},
	mounted() {
		this.dataList = cityRanking
	}
}
</script>

<style scoped lang="scss">
.box {
	height: 100%;
	display: flex;
	flex-direction: column;

	.title {
		height: 44px;
	}

	.main {
		width: 100%;
		flex: 1;
		overflow: auto;

		.slot {
			p {
				width: 100%;
				height: 40px;
				line-height: 40px;
				border-bottom: 1px solid #f4f4f4;
				box-sizing: border-box;
				padding: 0 20px;
			}
		}
	}
}
</style>