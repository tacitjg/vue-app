<template>
<div>
  <div class="header">
    <div>
      <img src="../assets/mao.png">
    </div>
    <div>
      <h4>鸮眼电影</h4>
      <p>查影讯，上鸮眼电影！</p>
    </div>
    <div class="header_input pull-right">
      <a href="/#/search"><input type="text" placeholder="请输入电影名"></a>
    </div>
  </div>
  <div class="nav clearfix">
    <router-link to="/" class="v-nav">正在上映</router-link>
    <router-link to="/comingSoon" class="v-nav nav_coming">即将上映</router-link>
  </div>
  <loading v-if="loading"></loading>
  <ul class="movies" v-if="!loading">
    <li v-for="movie in MovieList" @click="goDetail(movie.id)">
      <div class="movie_img"><img v-bind:src="movie.images.large"></div>
      <div class="message">
        <h2>{{movie.title|limitText}}</h2>
        <star :score="movie.rating.stars"></star>
        <p>{{movie.rating.average}}分</p>
        <p>导演：{{movie.directors[0].name}}</p>
        <p>主演：<span v-for="actor in movie.casts">{{actor.name}} </span></p>
        <!-- <p>主演：{{movie.casts[0].name}}，{{movie.casts[1].name}}</p> -->
      </div>
    </li>
  </ul>
</div> 
</template>

<script>
import star from './star'
import loading from './loading'
export default {
  name: 'comingSoon',
  data () {
    return {
      loading:true,
      MovieList:[]
    }
  },
  components:{
    star:star,
    loading:loading
  },
  mounted(){
    this.$http.jsonp("https://api.douban.com/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b").then(function(response){
      this.MovieList=response.body.subjects
      this.loading=false
    })
  },
  filters: {
    limitText: function (value) {
      return value.substr(0,10)
    }
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
    border-radius: 50%;
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
    position: absolute;
    right: 15px;
    top: 15px;
    width: 100px;
    height: 30px;
    border-style: none;
    border-radius: 15px;
    padding-left: 10px;
  }
  .nav{
    background-color: #789;
  }
  .nav .v-nav{
    float: left;
    text-align: center;
    width: 50%;
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    color: #f9fafc;
  }
  .nav .nav_coming{
    background-color: #369;
  }
  .movies li{
    display: flex;
    align-items:center;
    border-bottom: 1px solid #d6d6d6;
    background-color: #eee ;
  }
  .movies .movie_img{
    flex: 2;
    padding: 10px 15px;
    max-width: 85px;
  }
  .movies .movie_img img{
    width: 100%;  
  }
  .movies .message{
    flex: 6;
    padding: 10px 0;
    padding-right: 15px;
  }
  @media screen and (min-width: 500px){
    .movies{
      overflow: hidden;
      background-color: #333;
    }
    .movies li{
      display: block;
      border: none;
    }
    .movies li:first-child{
      padding-top: 20px;
    }
    .movies .movie_img{
      display: inline-block;
      width: 80px;
    }
    .movies .message{
      display: inline-block;
    }
  }
  @media screen and (min-width: 800px){
    .movies li:nth-child(2){
      padding-top: 20px;
    }
    .movies li{
      float: left;
      display: inline-block;
      width: 50%;
      height: 140px;
    }
    .movies .message{
      width: 250px;
    }
  }
  @media screen and (min-width: 1000px){
    .movies .message{
      width: 350px;
    }
  }
  .movies .message h2{
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
    line-height: 26px;
  }
  .movies .message p{
    font-size: 14px;
    line-height: 20px;
    color: #666;
    overflow: hidden;
  }
  .movies .message p span{
    font-size: 14px;
  }
</style>
