<template>
    <div v-if = "posts != null" class="postbox_head">
        <b-container v-for="(post, index) in posts" :key="index">
            <b-row @click="onViewModeChanged(index)">
              <b-col sm="auto" id="proImg">
                <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1" style="width: 100px;"></b-img>
              </b-col>
              <b-col class="d-grid gap-2" id="proTex">
                <div id="title">{{post.title}}</div>
                <div id="price">{{post.price}}</div>
              </b-col>
              <b-col id="Peo">
                <div>
                  {{post.numOfpeople}}명
                </div>
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
    onViewModeChanged: function (mode) {
      console.log('보냈다: ', mode)
      EventBus.$emit('eventGive', mode) // 배열 값 viewPost.vue로 보냄
      //    axios
      //      .get(
      //        'http://localhost:9090/api/posts/'
      //      ).then((response) => {
      //        this.postsGive = response.date[mode].id
      //        console.log('보냈다: ', this.postsGive)   // id 값을 보냄
      //        EventBus.$emit('eventGive', this.postsGive)
      //      }).catch((error) => {
      //        console.log(error)
      //      })
    },
    getPosts () {
      PostService.getPosts().then((response) => {
        console.log(response.data)
        this.posts = response.data
        console.log(this.posts)
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

#proImg, #proTex, #Peo {
    margin-top : 5%;
    margin-bottom: 5%;
}
#proTex div, #Peo {
    border: 2px dotted black;
}

#Peo {
  max-width: 20%;
}

#title, #price {
  width: auto;
}
</style>
