<template>
	<div class="load">
		<img src="../assets/ripple3.gif">
		<div>不要急 ,马上就好</div>
	</div>
</template>

<script>
	export default{
		name: 'search',
		data () {
			return {

			}
		}
	}
</script>
<style scoped>
	.load{
		position: relative;
		text-align: center;
		padding-right: 80px;
	}
	.load img{
		position: absolute;
		top: 40%;
	}
	.load div{
		position: absolute;
		text-align: center;
		left: 0%;
		width: 100%;
		top: 85px;
		font-weight: bold;
	}
</style>