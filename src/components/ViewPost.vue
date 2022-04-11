<template>
  <div id="body" class="d-grid gap-2">
    <br>
      <b-container fluid class="d-grid gap-3">
        <b-row>
          <b-col v-if="Mode=='viewMode'" style="text-align: right">
            <b-button @click="updatePostform()">수정</b-button>
            <b-button @click="deletePost()">삭제</b-button>
          </b-col>
          <b-col v-if="Mode=='updateMode'" style="text-align: right">
            <b-button @click="updatePostCancle()">수정취소</b-button>
            <b-button @click="updatePost()">수정완료</b-button>
          </b-col>
        </b-row>
        <b-row class="Image_area">
          <b-col>
            <div class="Image_state">
              <state></state>
              <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Responsive image"></b-img>
            </div>
          </b-col>
        </b-row>

        <b-row class="text">
          <b-col v-if="Mode=='viewMode'" id="title">{{post.title}}</b-col>
          <b-col v-else-if="Mode=='updateMode'"><b-form-input :id="title" v-model="title" placeholder="제목"></b-form-input></b-col>
        </b-row>

        <b-row class="text">
          <b-col id="category">{{post.category}}</b-col>
          <b-col id="people">{{post.numOfpeople}}</b-col>
        </b-row>

        <b-row class="text">
          <b-col id="price">{{post.price}}</b-col>
        </b-row>

        <b-row class="text">
          <b-col v-if="Mode=='viewMode'" id="description">{{post.description}}</b-col>
          <b-col v-else-if="Mode=='updateMode'"><b-form-input :id="description" v-model="description" placeholder="내용"></b-form-input></b-col>
        </b-row>

        <b-row>
          <b-col>
            <div class="mb-3" id="button">
              <b-button v-b-toggle.my-collapse class="toggle_button">
            <b-icon icon="caret-down"></b-icon>
          </b-button>
        </div>

        <b-collapse id="my-collapse">
          <comment-input class="comment_input" v-bind:postIdProps="postId"></comment-input>
          <comment-board class="comment_input" v-bind:postIdProps="postId"></comment-board>
        </b-collapse>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import {EventBus} from '../main'
import CommentBoard from './CommentBoard.vue'
export default {
  components: { CommentBoard },
  name: 'ViewPost',
  props: {
    idProps: this.postId
  },
  data () {
    return {
      category: '',
      postId: '',
      title: '',
      description: '',
      post: {
        image: '',
        title: '',
        price: '',
        place: '',
        description: '',
        numOfpeople: ''
      },
      body: {
        title: '',
        description: ''
      },
      Mode: 'viewMode'
    }
  },
  methods: {
    getPost (postId) {
      axios
        .get(
          'http://localhost:9090/api/post/' + postId
        ).then((response) => {
          console.log(response.data)
          this.post = response.data
        }).catch((error) => {
          console.log(error)
        })
    },
    getCategoryPost () {
      EventBus.$on('emitPost', post => {
        console.log('Post 받았다: ', post)
        this.post = post
      })
    },
    deletePost () {
      this.$bvModal.msgBoxConfirm('게시물을 삭제하시겠습니까?', {
        title: ' ',
        okTitle: '확인',
        cancelTitle: '취소',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        hideHeaderClose: false
      }).then(value => {
        if (value === true) {
          axios
            .delete(
              'http://localhost:9090/api/post/' + this.postId)
            .then((response) => {
              alert('삭제 완료되었습니다.')
              this.$router.go()
            }).catch((error) => {
              console.log(error)
            })
        } else {
          this.$bvModal.hide()
        }
      })
    },
    updatePostform () {
      this.Mode = 'updateMode'
    },
    postNullCheck () {
      if ((this.title === '') || (this.description === '')) {
        alert('내용을 채워주세요!')
        return false
      } else return true
    },
    updatePost () {
      if (this.postNullCheck()) {
        this.post.title = this.title
        this.post.description = this.description
        this.body = {
          title: this.title,
          description: this.description
        }
        axios
          .put(
            'http://localhost:9090/api/post/' + this.postId,
            JSON.stringify(this.body),
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          ).then((response) => {
            console.log(response)
            alert('수정 완료되었습니다.')
            this.$router.go()
          }).catch((error) => {
            console.log(error)
          })
        this.Mode = 'viewMode'
      }
    },
    updatePostCancle () {
      this.Mode = 'viewMode'
    }
  },
  watch: {
    post: function () {
      this.post = this.post
    },
    Mode: function () {
      this.mode = this.mode
    },
    idProps: function () {
      this.postId = this.idProps
      this.getPost(this.postId)
    }
  },
  created () {
    this.postId = this.idProps
    this.getPost(this.postId)
    this.getCategoryPost()
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
  .comment_input {
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
