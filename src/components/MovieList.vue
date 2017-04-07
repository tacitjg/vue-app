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
      <input type="text" placeholder="请输入电影名">
    </div>
  </div>
  <div class="nav clearfix">
    <a class="pull-left" href="">正在热映</a>
    <a class="pull-left" href="">即将上映</a>
  </div>
  <ul class="movies">
    <li v-for="movie in MovieList" @click="goDetail(movie.id)">
      <div><img v-bind:src="movie.images.large"></div>
      <div class="message">
        <h2>{{movie.title|limitText}}</h2>
        <star :score="movie.rating.stars"></star>
        <!-- <div>
          <span class="star star-on"></span><span class="star star-on"></span><span class="star star-on"></span><span class="star star-off"></span><span class="star star-off"></span>{{movie.rating.stars}}{{movie.rating.stars|countStar}}
        </div> -->
        <p>{{movie.rating.average}}分</p>
        <p>导演：{{movie.directors[0].name}}</p>
        <p>主演：<span v-for="actor in movie.casts">{{actor.name}},</span></p>
        <!-- <p>主演：{{movie.casts[0].name}}，{{movie.casts[1].name}}</p> -->
      </div>
    </li>
  </ul>
</div> 
</template>

<script>
import star from './star'
export default {
  name: 'MovieList',
  data () {
    return {
      MovieList:[]
    }
  },
  components:{
    star:star
  },
  mounted(){
    //this.$http.jsonp("https://api.douban.com/v2/movie/in_theaters")
    this.$http.get("static/data.json").then(function(response){
      this.MovieList=response.body.subjects
    })
  },
  filters: {
    limitText: function (value) {
      return value.substr(0,10)
    }
    /*,
    countStar:function(value){
      var s = '';
      var int_star = parseInt(value/10);
      var half_star = (parseInt(value)/10 - int_star == 0)?false:true;
      for (var i = 0; i < int_star; i++) {
        s += "*"
      }
      if (half_star) {
        s += '-'
      }
    }*/
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
