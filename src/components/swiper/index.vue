<template>
	<div class="swiper">
		<div class="swiper_container" @touchstart="pressRegion" @touchmove="slideRegion" @touchend="leaveRegion">
			<div class="swiper_container_slider" ref="slider">
				<div class="slider_item" ref="sliderItem" v-for="item,index in data" :key="index">
					<img :src="item">
				</div>
			</div>
		</div>
		<div class="swiper_indicator" v-if="indicatorDots">
			<div class="dot" :style="{background: currentIndex == index ? indicatorActiveColor : indicatorColor,transitionDuration: duration + 'ms'}" v-for="item,index in data" :key="index">
				<!-- 指示点 -->
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
			currentIndex: null, // 当前索引
			quantity: null, // 数量
			swiperWidth: null, // swiper宽度
			sliderWidth: null, // 滑块宽度
			lastX: null, // 最后一个位置 
			pressX: null, // 按下水平坐标
			pressY: null, // 按下垂直坐标
			move: null, // 移动距离
			isMove: null, // 是否移动
			towardsNext: null, // 朝向下个
			lastMoveX: null, // 上次移动的X位置
			leaveX: null, // 离开水平坐标
			isLevel: null, // 是否水平移动
			intensity: null, // 力度
			elasticForce: null, // 弹力
			exceeded: null, // 已超出
			beforeMovingLeft: null, // 移动前左侧距离
			sliderLeft: null, // 滑块左侧距离
			offset: null, // 偏移量
			currentLeft: null, // 当前左侧距离
			loopPlayback: null, // 循环切换计时器
			inTransition: false, // 过渡状态
			timer: null, // 计时器
			raf: null, // 动画帧
			startTime: null, // 开始时间
		}
	},
	created() {
		this.currentIndex = this.current
		this.quantity = this.data.length;
	},
	mounted() {
		this.swiperWidth = document.querySelector(".swiper").clientWidth;

		this.sliderLeft = -(this.currentIndex * 100)
		this.$refs.slider.style.transform = "translate(" + this.sliderLeft + "%, 0)"

		let proportion = this.proportion.split(":");
		let proportionHeight = (proportion[1] / proportion[0] * this.swiperWidth).toFixed(2);
		let swiperContent = document.querySelector(".swiper_container");
		swiperContent.style.height = proportionHeight + 'px';
		swiperContent.style.borderRadius = this.fillet + 'px';

		this.initSliderItem();
	},
	methods: {
		// 初始滑块位置
		initSliderItem() {
			this.$refs.sliderItem.forEach((i, j) => i.style.transform = "transLate(" + j * 100 + "%, 0)");
		},
		// 按下
		pressRegion(e) {
			console.log("按下")
			this.pressX = e.touches[0].clientX;
			this.pressY = e.touches[0].clientY;
			this.lastMoveX = this.pressX;
			this.beforeMovingLeft = this.sliderLeft

			this.cancelAnimation()
			this.drag()
		},
		// 滑动
		slideRegion(e) {
			let clientX = e.touches[0].clientX
			let clientY = e.touches[0].clientY

			this.isMove = true

			// 过渡中只能水平移动
			if (this.inTransition) this.isLevel = true;

			// 判断是否水平移动
			if (this.isLevel === null) this.isLevel = Math.abs(clientX - this.pressX) > Math.abs(clientY - this.pressY);

			// 限制水平或垂直移动
			if (this.isLevel) {
				e.preventDefault()

				this.intensity = clientX - this.lastMoveX
				this.towardsNext = this.lastMoveX > clientX
				this.lastMoveX = clientX
				this.sliderLeft = (clientX - this.pressX) / this.swiperWidth * 100 + this.beforeMovingLeft
				// console.log(((clientX - this.pressX) / this.swiperWidth + this.currentIndex) * 100)

			}
		},
		// 离开
		leaveRegion() {
			this.isLevel = null
			this.cancelAnimation()

			this.startTime = new Date().getTime()

			this.beforeMovingLeft = this.sliderLeft

			let deviation = this.sliderLeft % 100
			console.log(this.sliderLeft)

			if (Math.abs(this.intensity) >= 4) {
				if (this.intensity > 0) {
					console.log("力度右")
					this.currentIndex--
				} else {
					console.log("力度左")
					this.currentIndex++
				}
				this.offset = -this.currentIndex * 100 - this.sliderLeft
				console.log(this.offset)
				this.righting()
			} else if (deviation) {
				console.log("移动")
				if (Math.abs(deviation) > 50) {
					this.currentIndex = Math.ceil(Math.abs(this.sliderLeft / 100))
					console.log("移动左")
				} else {
					this.currentIndex = Math.floor(Math.abs(this.sliderLeft / 100))

					console.log("移动右")
				}
				this.offset = -this.currentIndex * 100 - this.sliderLeft
				console.log(this.offset)
				this.righting()
			}
		},
		// 拖动
		drag() {
			// 未移动不渲染
			if (!this.isMove) {
				this.raf = requestAnimationFrame(this.drag)
				return
			}

			console.log("拖动")

			this.$refs.slider.style.transform = "translate(" + this.sliderLeft + "%, 0)"
			this.isMove = false

			requestAnimationFrame = this.getAnimation()
			this.raf = requestAnimationFrame(this.drag)
		},
		// 回正
		righting() {
			let currentTime = new Date().getTime()

			if (currentTime - this.startTime > this.duration) {
				console.log("时间到")
				this.sliderLeft = -(this.currentIndex * 100)
				this.$refs.slider.style.transform = "translate(" + this.sliderLeft + "%, 0)"
				this.cancelAnimation()
				return
			}

			this.sliderLeft = this.beforeMovingLeft + (currentTime - this.startTime) / this.duration * this.offset
			this.$refs.slider.style.transform = "translate(" + this.sliderLeft + "%, 0)"

			requestAnimationFrame = this.getAnimation()
			this.raf = requestAnimationFrame(this.righting)
		},
		//RAF 支持
		getAnimation() {
			return window.requestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				function (callback) { return setTimeout(callback, 1000 / 60); };
		},
		//RAF 移除
		cancelAnimation() {
			cancelAnimationFrame = window.cancelAnimationFrame ||
				window.mozCancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.msCancelAnimationFrame ||
				window.oCancelAnimationFrame ||
				function (callback) { return clearTimeout(callback, 1000 / 60); };
			cancelAnimationFrame(this.raf)
			console.log("RAF 移除")
		},
	},
}
</script>

<style scoped lang="scss">
.swiper {
	width: 100%;
	user-select: none;
	position: relative;

	&_container {
		width: 100%;
		overflow: hidden;

		&_slider {
			width: 100%;
			height: 100%;
			position: relative;

			.slider_item {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;

				> * {
					width: 100%;
					height: 100%;
					display: block;
					position: relative;
				}
			}
		}
	}

	&_indicator {
		display: flex;
		justify-content: center;
		transform: translate(-50%, 0);
		pointer-events: none;
		position: absolute;
		bottom: 12px;
		left: 50%;

		.dot {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin: 0 4px;
		}
	}
}
</style>