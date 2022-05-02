<template>
    <div v-if = "posts != null" class="postbox_head">
        <b-container class="body" v-for="(post, index) in posts"  :key="index">
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
                <div><b-button @click="onViewModeChanged(post,index)">상세보기</b-button></div>
              </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
import {EventBus} from '../main'
export default {
  name: 'CategoryPosts',
  props: {
    categoryProps: Array
  },
  data () {
    return {
      category: '',
      categoryNum: '',
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
    onViewModeChanged: function (post, index) {
      EventBus.$emit('eventGiveMain', this.posts[index].id)
      EventBus.$emit('emitPost', post)
    },
    getPost () {
      this.category = this.categoryProps
      console.log('bbb: ', this.category)
      if (this.category === '식재료') this.categoryNum = 1
      else if (this.category === '배달비') this.categoryNum = 2
      else if (this.category === '물품') this.categoryNum = 3
      axios
        .get(
          'http://localhost:9090/api/posts/category/' + this.categoryNum
        ).then((response) => {
          console.log(response)
          this.posts = response.data.content
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  watch: {
    categoryProps: function () {
      this.getPost()
    }
  },
  created () {
    this.category = this.categoryProps
    this.posts = {}
    this.getPost()
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
