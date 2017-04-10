<template>
<div>
	<loading v-if="loading"></loading>
	<div v-if="!loading">
		<div class="header_title">
			<div class="msg_back" @click="goback()"><div></div></div>
			<div class="msg_title">{{actors.name_en}} {{actors.name}}</div>
		</div>
		<div class="actor_msg">
			<div class="actor_img">
				<img :src="actors.avatars.large">
			</div>
			<div class="actor_info">
				<h3>影星资料</h3>
				<p>{{actors.name}}</p>
				<p>{{actors.name_en}}</p>
				<p>{{actors.gender}}</p>
			</div>
		</div>
		<div class="content">
			<h3>他的代表作品</h3>
			<div class="actor_cast" v-for="cast in actors.works" @click="gotocast(cast.subject.id)">
				<div class="cast_img">
					<img :src="cast.subject.images.small">
				</div>
				<div class="cast_info">
					<p>{{cast.subject.title}}</p>
					<p>{{cast.roles[0]}}</p>
					<p>{{cast.subject.year}}</p>
					<star :score="cast.subject.rating.stars"></star>
					<p>{{cast.subject.rating.average}}分 {{cast.subject.collect_count}}人评价</p>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import star from './star'
	import loading from './loading'
	export default{
		name:'actors',
		data () {
			return {
				loading:true,
				actors:{
					works:[{
						roles:[],
						subject:{
							images:{

							}
						}
					}]
				}
			}
		},
		components:{
			star:star,
			loading:loading
		},
		mounted () {
			var id = this.$route.params.id;
			this.$http.jsonp("http://api.douban.com/v2/movie/celebrity/"+id+"?apikey=0b2bdeda43b5688921839c8ecb20399b").then(function(response){
				this.actors=response.body
				this.loading=false
				console.log(response.body)
			})
		},
		methods: {
			goback: function () {
				window.history.go(-1)
			},
			gotocast: function (str) {
				const path = '/movie/' + str
     			this.$router.push({path: path})
			}
		}
	}
</script>
<style scoped>
	.load{
		margin-top: 30%;
	}
	.header_title{
		background-color: #e54847;
		height: 50px;
		position: relative;
	}
	.msg_back{
		position: absolute;
		width: 40px;
		height: 40px;
		margin: 5px;
	}
	.msg_back div{
		position: absolute;
		top: 12px;
		left: 12px;
		height: 13px;
		width: 13px;
		border: 2px solid #fff;
		border-width: 0 0 2px 2px;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}
	.msg_title{
		text-align: center;
		line-height: 50px;
		color: #fff;
		font-size: 20px;
	}
	.actor_msg{
		padding: 10px;
		background-color: #b4b1b1;
	}
	.actor_msg div{
		display: inline-block;
	}
	.actor_img img{
		width: 150px;
	}
	.actor_info{
		padding-left: 10px;
		vertical-align: bottom;
	}
	.actor_info h3{
		font-size: 25px;
		color: #fff;
		line-height: 40px;
	}
	.actor_info p{
		font-size: 20px;
		color: #f0eeee;
		line-height: 30px;
	}
	.content{
		background-color: #e5e9f2;
		padding: 10px;
	}
	.content h3{
		font-size: 18px;
		margin-bottom: 10px;
	}
	.actor_cast{
		padding: 10px 0;
		border-bottom: 1px solid #d6d3d3;
	}
	.actor_cast div{
		display: inline-block;
	}
	.cast_info{
		padding-left: 10px;
		vertical-align: top;
	}
	.cast_info p{
		font-size: 14px;
		line-height: 21px;
	}
</style>