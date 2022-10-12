<template>
	<div :class="['tabbar', border ? 'border' : '', shadow ? 'shadow' : '', fixedBottom ? 'fixed' : '']" :style="{background, paddingBottom: bottomSafeHeight + 'px'}">
		<div class="tabbar-content">
			<div class="item" @click="switchTab(0)">
				<svg class="icon" :style="{fill: currentIndex === 0 ? activeColor : tabColor}" t="1650559402216" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2039">
					<path d="M511.707429 298.861714l382.171428 338.066286 0.512 387.072H134.070857l-0.365714-387.072 378.002286-338.066286z m124.635428 513.462857H383.122286v211.602286H636.342857v-211.602286zM512 0l95.085714 80.237714 225.28 189.878857L1024 431.762286l-86.893714 96.182857L512 160.402286 85.869714 527.945143 0 431.762286l416.914286-351.524572L512 0z" p-id="2040"></path>
				</svg>
				<p :style="{color: currentIndex === 0 ? activeColor : tabColor}">首页</p>
			</div>
			<div class="item" @click="switchTab(1)">
				<svg class="icon" :style="{fill: currentIndex == 1 ? activeColor : tabColor}" t="1650559788633" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7036">
					<path d="M361.472 192c-11.264 0-20.992-9.728-20.992-20.992v-87.04c0-11.264 9.728-20.992 20.992-20.992h302.592c11.264 0 20.992 9.728 20.992 20.992v86.016c0 11.264-9.728 20.992-20.992 20.992H361.472v1.024z" p-id="7037"></path>
					<path d="M856.064 135.68h-124.928v69.632c0 16.384-13.312 29.184-29.184 29.184H323.584c-15.872 0-29.184-13.312-29.184-29.184V136.192H169.472c-18.432 0-33.792 14.848-33.792 33.792v687.616c0 18.432 14.848 33.792 33.792 33.792h687.616c14.848 0 32.256-4.096 32.256-34.304V169.472c0.512-17.92-14.848-33.792-33.28-33.792z m-134.656 299.008l-243.2 242.688c-12.8 12.8-32.768 12.8-45.568 0l-130.048-130.048c-12.8-12.8-12.8-32.768 0-45.568s32.768-12.8 45.568 0l107.52 106.496 219.648-219.648c12.8-12.8 32.768-12.8 45.568 0 6.656 6.656 10.24 14.336 10.24 23.04 0 8.704-3.072 16.384-9.728 23.04z" p-id="7038"></path>
				</svg>
				<p :style="{color: currentIndex == 1 ? activeColor : tabColor}">订单</p>
			</div>
			<div class="item" @click="switchTab(2)">
				<svg class="icon" :style="{fill: currentIndex == 2 ? activeColor : tabColor}" t="1650559603364" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6228">
					<path d="M519.850667 627.029333c352.213333 0 348.672 220.928 348.672 220.928 2.666667 20.053333-11.605333 36.309333-31.936 36.309334H203.093333c-20.309333 0-35.392-16.490667-31.936-36.309334 0 0-3.52-220.928 348.693334-220.928zM519.765333 149.333333h220.48v220.48c0 121.770667-98.709333 220.48-220.48 220.48-121.770667 0-220.48-98.709333-220.48-220.48C299.285333 248.042667 397.994667 149.333333 519.765333 149.333333z" p-id="6229"></path>
				</svg>
				<p :style="{color: currentIndex == 2 ? activeColor : tabColor}">我的</p>
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
		switchTab(index) {
			this.currentIndex = index
		}
	}
}
</script>

<style scoped lang="scss">
.tabbar {
	width: 100%;
	height: 50px;
	user-select: none;
	-webkit-tap-highlight-color: transparent;
	z-index: 100;

	.tabbar-content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-content: center;

		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0 5px;

			svg {
				width: 24px;
				height: 24px;
			}

			p {
				font-size: 12px;
				transform: scale(0.8);
				margin-top: 2px;
			}
		}
	}
}

.border {
	border-top: 0.5px solid #ccc;
}

.shadow {
	box-shadow: 0 0 12px -4px #ddd;
}

.fixed {
	position: fixed;
	bottom: 0;
	left: 0;
}
</style>