<template>
<div>
	<div class="header_title">
		<div class="msg_back" @click="goback(detail.id)"><div></div></div>
		<div class="msg_title">短评--{{detail.title}}</div>
	</div>
	<div class="comments">
		<h3>热门短评</h3>
		<div v-for="talk in detail.popular_reviews">
			<div>
				<star :score="talk.rating.value*10"></star>
				<span class="star_date">{{talk.created_at}}</span>
			</div>
			<div class="talk">{{talk.summary}}</div>
			<div class="author">
				<img :src="talk.author.avatar">
				<span>{{talk.author.name}}</span>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import star from './star'
	export default{
		name:'MovieDetail',
		data () {
			return {
				detail:{
					images:{
					},
					rating:{
					},
					countries:[
					],
					casts:{
					},
					popular_reviews:[
						{
							rating:{

							},
							author:{

							}
						}
					]

				}
			}
		},
		components:{
			star:star
		},
		mounted () {
			var id = this.$route.params.id;
			this.$http.jsonp("https://api.douban.com/v2/movie/subject/"+id+"?apikey=0b2bdeda43b5688921839c8ecb20399b").then(function(response){
				this.detail=response.body
				console.log(response.body)
			})
		},
		methods: {
			goback: function (str) {
				this.$router.push('/movie/'+str)
			}
		}
	}
</script>

<style scoped>
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
	.comments{
		padding: 10px;
	}
	.comments h3{
		margin-bottom: 10px;
	}
	.comments .star{
		display: inline-block;
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
		margin-bottom: 10px;
		border-bottom: 1px solid #d6d3d3;
	}
	.comments .author img{
		border-radius: 50%;
	}
	.comments .author span{
		vertical-align: 90%;
		color: #999;
		font-size: 12px;
	}
	.comments .msg_all{
		border-bottom: 1px solid #d6d3d3;
		text-align: center;
		color: #e54847;
		line-height: 30px;
	}
</style>