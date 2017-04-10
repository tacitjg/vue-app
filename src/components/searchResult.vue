<template>
<div>
  <div class="header">
    <div>
      <img src="../assets/logo.png">
    </div>
    <div>
      <h4>狗眼电影</h4>
      <p>查影讯，上狗眼电影就够了！</p>
    </div>
    <div class="header_input pull-right">
      <a href="/#/search"><input type="text" placeholder="请输入电影名"></a>
    </div>
  </div>
  <div class="nav clearfix">
    <a class="pull-left" href="/">正在热映</a>
    <a class="pull-left" href="/#/comingSoon">即将上映</a>
  </div>
  <loading v-if="loading"></loading>
  <h1 v-if='!loading' class="title">'{{val}}'的搜索结果, 共{{result.total}}条信息</h1>
  <ul class="movies" v-if="!loading">
    <li v-for="movie in result.subjects" @click="goDetail(movie.id)">
      <div><img v-bind:src="movie.images.large"></div>
      <div class="message">
        <h2>{{movie.title}}</h2>
        <star :score="movie.rating.stars"></star>
        <p>{{movie.rating.average}}分</p>
        <p>{{movie.year}}</p>
      </div>
    </li>
  </ul>
</div> 
</template>

<script>
import star from './star'
import loading from './loading'
export default {
  name: 'result',
  data () {
    return {
    loading:true,
      val: '',
      result: {
        total: '',
        subjects: [{
          rating: {
            max: '',
            average: ''
          },
          genres: [],
          title: '',
          year: '',
          images: {
            small: '',
            large: '',
            medium: ''
          },
          directors: [{
            name: ''
          }],
          casts: [{
            name: '',
            id: ''
          }],
          collect_count: '',
          alt: '',
          id: ''
        }]
      }
    }
  },
  components:{
    star:star,
    loading:loading
  },
  mounted(){
    this.val = this.$route.query.name
    this.$http.jsonp("https://api.douban.com/v2/movie/search?q="+this.val)
    .then(function(response){
      this.result=response.body
      this.loading=false
    })
  },
  methods: {
    goDetail: function (str) {
      const path = '/movie/' + str
      this.$router.push({path: path})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .load{
    margin-top: 50%;
  }
  .title{
    font-size: 20px;
    line-height: 30px;
    font-weight: bold;
    padding: 10px 0;
    text-align: center;
    background-color: #f2fbfb;
  }
  .header{
    padding: 10px 20px;
    background-color: #e5e9f2;
  }
  .header div{
    display: inline-block;
    vertical-align: top;
  }
  .header img{
    width: 42px;
    height: 42px;
    line-height: 42px;
  }
  .header h4{
    font-size: 17px;
    font-weight: 700;
    color: #333;
    line-height: 26px;
  }
  .header p{
    color: #999;
    font-size: 12px;
    line-height: 16px;
  }
  .header input{
    width: 100px;
    height: 40px;
    border-style: none;
    border-radius: 15px;
    padding-left: 10px;
  }
  .nav{
    background-color: #df2d2d;
  }
  .nav a{
    display: block;
    text-align: center;
    width: 50%;
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    color: #f9fafc;
  }
  .movies li{
    padding: 10px 20px ;
    border-bottom: 1px solid #d6d6d6;
  }
  .movies li div{
    display: inline-block;
  }
  .movies li img{
    width: 65px;
  }
  .movies .message{
    padding-left: 20px;
  }
  .movies .message h2{
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
    line-height: 26px;
    width: 245px;
    height: 26px;
    overflow:hidden;
    text-overflow: ellipsis;
  }
  .movies .message p{
    font-size: 14px;
    line-height: 20px;
    color: #666;
    overflow: hidden;
    width: 245px;
  }
  .movies .message p span{
    font-size: 14px;
  }
</style>
