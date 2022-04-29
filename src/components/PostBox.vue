<template>
    <div v-if = "posts != null" class="postbox">
        <b-container fluid="sm" v-for="(post, index) in posts" :key="index" id="post_container" style="margin: 5px;">
            <b-row md="4">
              <b-col id="postImg_col" cols="3">
                <b-img :src="post.image" thumbnail fluid alt="Image 1" id="image" rounded> </b-img>
              </b-col>
              <b-col class="d-grid gap-1" id="postContexts_col" cols="12" lg="10" xl="5">
                <b-row>
                  <b-col align-self="start" id="title">
                    <div>{{post.title}}</div>
                  </b-col>
                </b-row>
                <b-row align-h="between">
                  <b-col align-self="start" id="place">
                    <div>{{post.place}}</div>
                    <div>{{post.price}} 원 / {{post.numOfpeople}}명 모집</div>
                  </b-col>
                  <b-col cols="3" sm="4">
                    <b-button @click="onViewModeChanged(index)">상세보기</b-button>
                  </b-col>
                </b-row>
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
  #title, #price, #place {
    padding: 5px;
    width: auto;
  }
  #title {
    font-size: 1.2em;
    font-weight: 700;
    text-align: left;
    border-bottom: 2px solid #F7F7F7;
  }
  #place {
    margin-top: -10px;
    font-size: 0.9em;
    color: #1F1F1F ;
  }
  #post_container {
    padding: 10px;
  }
</style>
