<template>
<div>
	<loading v-if="loading"></loading>
	<div v-if="!loading">
		<div class="header_title">
			<div class="msg_back" @click="goback(comment.subject.id)"><div></div></div>
			<div class="msg_title">短评--{{comment.subject.title}}</div>
		</div>
		<div class="content">
			<div class="comments">
				<div v-for="talk in comment.comments">
					<div class="star_time">
						<star :score="talk.rating.value*10"></star>
						<span class="star_date">{{talk.created_at}}</span>
					</div>
					<div class="talk">{{talk.content}}</div>
					<div class="author">
						<img :src="talk.author.avatar">
						<span>{{talk.author.name}}</span>
						<span class="agree pull-right">{{talk.useful_count}}赞同</span>

					</div>
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
		name:'Moviecomment',
		data () {
			return {
				loading:true,
				comment:{

				}
			}
		},
		components:{
			star:star,
			loading:loading
		},
		mounted () {
			var id = this.$route.params.id;
			this.$http.jsonp("https://api.douban.com/v2/movie/subject/"+id+"/comments?apikey=0b2bdeda43b5688921839c8ecb20399b").then(function(response){
				this.comment=response.body
				this.loading=false
				console.log(response.body)
			})
		},
		methods: {
			goback: function (str) {
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
	.content{
		background-color: #e5e9f2;
	}
	.comments{
		padding: 10px;
	}
	.comments h3{
		margin-bottom: 10px;
	}
	.comments .star{
		display: inline-block;
	}
	.comments .star_time{
		margin-top: 6px;
	}
	.comments .star_date{
		font-size: 12px;
		vertical-align: top;
	}
	.comments .talk{
		margin: 10px 0;
	}
	.comments .author{
		padding-bottom: 5px;
		border-bottom: 1px solid #d6d3d3;
	}
	.comments .author img{
		border-radius: 50%;
	}
	.comments .author span{
		vertical-align: 150%;
		color: #999;
		font-size: 12px;
	}
	.comments .msg_all{
		border-bottom: 1px solid #d6d3d3;
		text-align: center;
		color: #e54847;
		line-height: 30px;
	}
	.comments .agree{
		margin-top: 18px;
	}
</style>