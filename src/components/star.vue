<template>
<div class="star">
  <span v-for="star in stars" v-bind:class="star"></span>
</div>
</template>

<script>
  export default {
    name: 'star',
    props: ['score'],
    computed:{
      stars:function(){
        var s = [];
        var int_star = parseInt(this.score/10);
        var half_star = (parseInt(this.score)/10 - int_star == 0)?false:true;
        for (var i = 0; i < int_star; i++) {
          s.push("star-on")
        }
        if (half_star) {
          s.push('star-half')
          for (var i = 0; i < 4-int_star; i++) {
            s.push("star-off")
          }
        }else{
          for (var i = 0; i < 5-int_star; i++) {
            s.push("star-off")
          }
        }
        return s;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.star span{
    display: inline-block;
    height: 14px;
    width: 14px;
    background-size: 10px 10px;
    background-repeat: no-repeat;
  }
.star-on{
    background-image: url(../assets/star-on.png);
  }
.star-half{
    background-image: url(../assets/star-half.png);
  }
.star-off{
    background-image: url(../assets/star-off.png);
  }
</style>
