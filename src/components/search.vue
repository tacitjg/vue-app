<template>
	<div class="all">
		<div class="serch">
			<input type="text" v-model="query" @keyup.enter="submit()">
			<span @click="back()">取消</span>
		</div>
		<div class="hot_search">
			<h3>热门搜索</h3>
			<button v-for="item in hotSearch" @click="serch(item.id)">{{item.name}}</button>
		</div>
	</div>
</template>

<script>
	export default {
    data () {
      return {
        query: '',
        hotSearch: [
          {name: '金刚狼3', id: '25765735'},
          {name: '一条狗的使命', id: '6873143'},
          {name: '生化危机:终章', id: '20471852'},
          {name: '乐高蝙蝠侠', id: '26145033'},
          {name: '爱乐之城', id: '25934014'},
          {name: '欢乐好声音', id: '26354572'}
        ]
      }
    },
    methods: {
      submit: function () {
        this.$router.push({path: '/searchResult', query: { name: this.query }})
        this.query = ''
      },
      back: function () {
        window.history.go(-1)
      },
      serch: function (str) {
        const path = '/movie/' + str
        this.$router.push({path: path})
      }
    }
  }
</script>
<style scoped>
	.all{
		position: absolute;
		height: 100%;
		background-color: #e5e9f2;
	}
	.all .serch{
		padding: 10px;
	}
	input{
		width: 80%;
		height: 28px;
		border-style: none;
		border-radius: 15px;
		padding-left: 2em;
	}
	.hot_search{
		padding: 10px;
	}
	.hot_search h3{
		margin: 10px 0;
	}
	.hot_search button {
		background-color: #fff;
		border-style: none;
		padding: 5px;
		margin: 5px 5px 5px 0;
		border-radius: 8px;
		color: #e54847;
	}
</style>