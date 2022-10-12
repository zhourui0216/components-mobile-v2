<template>
	<div class="home">
		<div @click="go('/use_navbar')">导航栏</div>
		<div @click="go('/use_tabbar')">标签栏</div>
		<div @click="go('/use_swiper')">轮播图</div>
		<div @click="go('/use_index_list')">索引列表</div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		go(path) {
			this.$router.push({ path })
		}
	}
}
</script>

<style scoped lang="scss">
.home {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 10px 10px 0;

	div {
		width: calc(50% - 5px);
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		color: #fff;
		background: #7bbfea;
		border-radius: 10px;

		& {
			margin-bottom: 10px;
		}
	}
}
</style>
