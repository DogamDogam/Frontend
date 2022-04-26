<template>
    <div v-if = "posts != null" class="postbox">
        <b-container v-for="(post, index) in posts" :key="index" id="post_container" style="margin: 5px;">
            <b-row>
              <b-col id="postImg_col" cols="3">
                <b-img :src="post.image" thumbnail fluid alt="Image 1" id="image" rounded> </b-img>
              </b-col>
              <b-col align-self="baseline" class="d-grid gap-2" id="postContexts_col" cols="6">
                <div id="title">{{post.title}}</div>
                <div id="price">{{post.price}}원</div>
              </b-col>
              <b-col cols="3" id="numAndButton_col">
                <div>{{post.numOfpeople}}명</div>
                <div><b-button @click="onViewModeChanged(index)">상세보기</b-button></div>
              </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
//  import axios from 'axios'
import {EventBus} from '../main'
import PostService from '../services/PostService'
export default {
  name: 'Posts',
  data () {
    return {
      posts: {
        image: '',
        title: '',
        price: '',
        place: '',
        description: '',
        numOfpeople: ''
      },
      commaPrice: '',
      post: []
    }
  },
  methods: {
    onViewModeChanged: function (index) {
      console.log('Main 보냈다: ', this.posts[index].id)
      EventBus.$emit('eventGiveMain', this.posts[index].id) // 배열 값 viewPost.vue로 보냄
      console.log('Post 보냈다: ', index)
      EventBus.$emit('eventGivePost', index)
      this.$emit('postOnClicked', this.posts)
    },
    getPosts () {
      PostService.getPosts().then((response) => {
        console.log(response.data)
        this.posts = response.data
        this.comma(this.posts)
      }).catch((error) => {
        console.log(error)
        this.posts = {}
      })
    },
    comma (res) {
      console.log(res.length)
      for (var i = 0; i < res.length; i++) {
        var num = res[i].price
        this.posts[i].price = num.toLocaleString('ko-KR')
      }
    }
  },
  created () {
    this.posts = {}
    this.getPosts()
  }
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* {
font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
}
  .postbox {
    background: rgb(247, 203, 138);
    border-radius: 10px;
    margin: 5px;
    margin-left: 10px;
    margin-top: 20px;
  }
  #image {
    max-width: 200px;
    max-height: 200px;
  }
  #title, #price {
    padding: 5px;
    width: auto;
  }
  #title {
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
    border-bottom: 2px solid #e9e9e9;
  }
  #price {
    color: #545454 ;
  }
  #post_container {
    padding: 10px;
    border-bottom: 2px solid #F0F0F0;
  }
</style>
