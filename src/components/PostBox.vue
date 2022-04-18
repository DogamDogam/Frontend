<template>
    <div v-if = "posts != null" class="postbox_head">
        <b-container v-for="(post, index) in posts" :key="index">
            <b-row>
              <b-col sm="auto" id="proImg">
                <img :src="post.image" thumbnail fluid alt="Image 1" id="image">
              </b-col>
              <b-col class="d-grid gap-2" id="proTex">
                <div id="title">{{post.title}}</div>
                <div id="price">{{post.price}}</div>
              </b-col>
              <b-col id="Peo">
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
      }).catch((error) => {
        console.log(error)
        this.posts = {}
      })
    }
  },
  created () {
    this.posts = {}
    this.getPosts()
  }
}
</script>

<style scoped>
  .postbox_head {
    background: rgb(247, 203, 138);
    border-radius: 10px;
    margin: 5px;
    margin-left: 10px;
    margin-top: 20px;
  }
  #image {
    width: 100px;
    height: 100px;
    margin-left: -12px;
  }
  #proImg {
    background-color: white;
    width: 100px;
    height: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #proTex, #Peo {
      margin-top : 5%;
      margin-bottom: 5%;
  }
  #proTex div{
      border: 2px dotted black;
  }

  #Peo {
    max-width: 20%;
  }

  #title, #price {
    width: auto;
  }
</style>
