<template>
  <div id="body" class="d-grid gap-2">
    <br>
      <b-container fluid class="d-grid gap-3">
        <b-row class="Image_area">
          <b-col>
            <div class="Image_state">
              <state></state>
              <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Responsive image"></b-img>
            </div>
          </b-col>
        </b-row>

        <b-row class="text">
          <b-col id="title">{{posts.title}}</b-col>
        </b-row>

        <b-row class="text">
          <b-col id="category">{{posts.category}}</b-col>
          <b-col id="people">{{posts.numOfpeople}}</b-col>
        </b-row>

        <b-row class="text">
          <b-col id="price">{{posts.price}}</b-col>
        </b-row>

        <b-row class="text">
          <b-col id="description">{{posts.description}}</b-col>
        </b-row>

        <b-row>
          <b-col>
            <div class="mb-3" id="button">
              <b-button v-b-toggle.my-collapse class="toggle_button">
            <b-icon icon="caret-down"></b-icon>
          </b-button>
        </div>

        <b-collapse id="my-collapse">
          <comment-board class="comment_board"></comment-board>
        </b-collapse>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import {EventBus} from '../main'
import PostService from '../services/PostService'
export default {
  name: 'Posts',
  props: {
    idProps: this.category
  },
  data () {
    return {
      category: '',
      id: '',
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
    getPosts () {
      PostService.getPosts().then((response) => {
        console.log(response.data)
        EventBus.$on('eventGivePost', mode => {
          console.log('Post 받았다: ', mode)
          this.id = response.data[mode].id
          console.log('id: ', this.id)
        })
      })
    }
  },
  watch: {
    id (newVal) {
      axios
        .get(
          'http://localhost:9090/api/post/' + newVal
        ).then((response) => {
          console.log(response.data)
          this.posts = response.data
          console.log(this.posts)
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  created () {
    this.getPosts()
    axios
      .get(
        'http://localhost:9090/api/post/' + this.idProps
      ).then((response) => {
        console.log('bbb: ', response.data)
        this.posts = response.data
        console.log(this.posts)
      }).catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
#body{
  margin: 10px;
}
.text {
  text-align: center;
  width: 50%;
  height: 50px;
  margin-left: 25%;
}
#button {
  text-align: center;
  width: 50%;
  height: 50px;
  margin-left: 25%;
}

  #my-collapse {
    border: 1px solid rgb(255, 154, 22);
    border-radius: 10px;
    margin: 10px;
  }
  .comment_board {
    margin: 10px;
    position: relative;
  }
  .Image_area {
    text-align: center;
  }
  .Image_state {
    display: inline-block;
  }
  .toggle_button {
    width: 95%;
  }
  #price, #description, #title {
    width: 300px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid #d2d2d2;
  }
  #category, #people {
    background-color: white;
    border-radius: 10px;
  }
  #category {
    margin-right: 5px;
  }

</style>
