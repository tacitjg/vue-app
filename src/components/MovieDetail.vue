<template>
<div>
	<loading v-if="loading"></loading>
	<div v-if="!loading">
		<div class="header_title">
			<div class="msg_back" @click="goback()"><div></div></div>
			<div class="msg_title">{{detail.title}}</div>
		</div>
		<div class="msg_movie">
			<div class="msg_img">
				<img :src="detail.images.medium">
			</div>
			<div class="msg_info">
				<h3>{{detail.title}}</h3>
				<star :score="detail.rating.stars"></star>
				<p>{{detail.rating.average}}({{detail.comments_count}}人评分)</p>
				<p>{{detail.year}}年</p>
				<p><span v-for="tag in detail.genres">{{tag}},</span></p>
				<p>{{detail.countries[0]}}</p>
				<p>{{detail.mainland_pubdate}}(中国大陆)</p>
			</div>
		</div>
		<div class="content">
			<div class="msg_count">
				<span>{{detail.wish_count}}人想看</span>
				<span>{{detail.reviews_count}}人看过</span>
			</div>
			<div class="msg_summary">{{detail.summary}}</div>
			<div class="msg_actor">
				<h3>演职人员</h3>
				<ul>
					<li v-for="actor in detail.casts" @click="actors(actor.id)">
						<div>
							<img :src="actor.avatars.small">
						</div>
						<span>{{actor.name|limitText}}</span>
					</li>
				</ul>
			</div>
			<div class="comments">
				<h3>热门短评</h3>
				<div v-for="talk in detail.popular_comments">
					<div class="star_time">
						<star :score="talk.rating.value*10"></star>
						<span class="star_date">{{talk.created_at}}</span>
					</div>
					<div class="talk">{{talk.content}}</div>
					<div class="author">
						<img :src="talk.author.avatar">
						<span>{{talk.author.name}}</span>
					</div>
				</div>
				<p class="msg_all" @click="smallComment(detail.id)">查看全部短评</p>
				<p class="msg_all">查看全部影评</p>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import star from './star'
	import loading from './loading'
	export default{
		name:'MovieDetail',
		data () {
			return {
				loading:true,
				detail:{
					images:{
					},
					rating:{
					},
					countries:[
					],
					casts:{
					},
					popular_comments:[
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
			star:star,
			loading:loading
		},
		mounted () {
			var id = this.$route.params.id;
			this.$http.jsonp("https://api.douban.com/v2/movie/subject/"+id+"?apikey=0b2bdeda43b5688921839c8ecb20399b").then(function(response){
				this.detail=response.body
				this.loading=false
				console.log(response.body)
			})
		},
		filters: {
			limitText: function (value) {
				if (value.length<=5) {
					return value.substr(0,5)
				}else{
					return value.substr(0,5)+'...'
				}
			}
		},
		methods: {
			goback: function () {
				this.$router.push('/')
			},
			smallComment:function(str){
				const path = '/smallComment/' + str
				this.$router.push({path: path})
			},
			actors:function(str){
				const path = '/actors/' + str
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
	.msg_movie{
		padding: 15px;
		background-color: #b4b1b1;
	}
	.msg_movie div{
		display: inline-block;
	}
	.msg_img img{
		width: 100px;
		border: 1px solid #fff;
	}
	.msg_info{
		vertical-align: top;
		padding-left: 10px;
	}
	.msg_info h3{
		font-size: 20px;
		line-height: 30px;
	}
	.msg_info p{
		font-size: 12px;
		line-height: 18px;
	}
	.content{
		background-color: #e5e9f2;
	}
	.content h3{
		font-size: 15px;
		font-weight: 700;
	}
	.msg_count{
		padding: 10px;
		text-align: center;
	}
	.msg_count span{
		display: inline-block;
		padding: 0 10px;
		line-height: 30px;
		background-color: #e54847;
		border-radius: 5px;
		color: #fff;
		font-size: 14px;
		margin: 0 20px;
	}
	.msg_summary{
		padding: 10px;
		font-size: 14px;
		line-height: 21px;
	}
	.msg_actor{
		padding: 10px;
		overflow: scroll;
	}
	.msg_actor ul{
		margin-top: 15px;
		white-space: nowrap;
	}
	.msg_actor ul li{
		display: inline-block;
		margin-right: 5px;
	}
	.msg_actor ul li img{
		width: 70px;
	}
	.msg_actor ul li span{
		font-size: 12px;
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