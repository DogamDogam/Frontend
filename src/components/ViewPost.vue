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
          <b-col cols="12" md="auto">
            <div class="Image_state">
              <state></state>
              <b-img :src="post.image" thumbnail fluid alt="Image 1" id="image"></b-img>
            </div>
          </b-col>
          <b-col>
            <b-row class="title_box" align-v="center">
              <b-col v-if="Mode=='viewMode'" md="auto"><div id="title">{{post.title}}</div></b-col>
              <b-col v-else-if="Mode=='updateMode'" md="auto"><b-form-input :id="title" v-model="title" placeholder="제목"></b-form-input></b-col>
            </b-row>
            <b-row style="text-align: right; padding-right: 200px;">
              <div>작성자: {{post.userName}}</div>
              <div>작성일: {{post.createDate.substr(0,10)}} {{post.createDate.substr(11,8)}}</div>
            </b-row>
            <b-row id="text">
              <b-col id="category" cols="12" md="auto"><b-badge variant="success" pill>{{post.category}}</b-badge></b-col>
              <b-col id="people" cols="12" md="auto"><b-badge variant="success" pill>{{post.numOfpeople}}명 모집</b-badge></b-col>
              <b-col id="price" cols="12" md="auto"><b-badge variant="success" pill>{{post.price}}원</b-badge></b-col>
            </b-row>

            <b-row>
              <b-col v-if="Mode=='viewMode'" id="description">{{post.description}}</b-col>
              <b-col v-else-if="Mode=='updateMode'"><b-form-input :id="description" v-model="description" placeholder="내용"></b-form-input></b-col>
            </b-row>
          </b-col>
      </b-row>

        <b-row>
          <b-col>
            <div class="mb-3" id="button">
              <b-button :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="my-collapse"
                @click="visible = !visible">
            <b-icon icon="caret-down"></b-icon>
          </b-button>
        </div>

        <b-collapse id="my-collapse" v-model="visible">
          <comment-input class="comment_input" :userInfo="userInfo" v-bind:postIdProps="postId"></comment-input>
          <comment-board class="comment_input" :userInfo="userInfo" v-bind:postIdProps="postId"></comment-board>
        </b-collapse>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import {URL} from '../url/BackendUrl'
import axios from 'axios'
import {EventBus} from '../main'
import CommentBoard from './CommentBoard.vue'
export default {
  components: { CommentBoard },
  name: 'ViewPost',
  props: {
    idProps: this.postId,
    postProps: {
      type: Object,
      default: () => {
        return {
          image: '',
          title: '',
          price: '',
          place: '',
          description: '',
          numOfpeople: '',
          userName: '',
          createDate: ''
        }
      }
    },
    userInfo: {
      type: Object
    }
  },
  data () {
    return {
      category: '',
      postId: '',
      title: '',
      description: '',
      post: {
        image: this.postProps.image,
        title: this.postProps.title,
        price: this.postProps.price,
        place: this.postProps.place,
        description: this.postProps.description,
        numOfpeople: this.postProps.numOfpeople,
        userName: this.postProps.userName
      },
      body: {
        title: '',
        description: ''
      },
      Mode: 'viewMode',
      visible: false
    }
  },
  methods: {
    getPost (postId) {
      axios
        .get(
          URL + '/api/post/' + postId
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
              URL + '/api/post/' + this.postId)
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
            URL + '/api/post/' + this.postId,
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
      this.visible = false
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
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* {
font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
}

#body{
  margin: 10px;
  border-radius: 10px;
  background: rgb(247, 203, 138);
  margin: 5px;
  margin-left: 10px;
  margin-top: 20px;
}
.badge {
  background-color: gray;
  font-size: 1.1em;
}
.text {
  text-align: center;
  width: 50%;
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
  #image {
    width: 300px;
    height: 200px;
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
  .title_box {
    font-size: 1.5em;
    font-weight: 700;
    text-align: left;
    border-bottom: 2px solid white;
    max-width: 400px;
  }
  #description {
    height: 100px;
    width: 300px;
    text-align: left;
    font-size: 1.2em;
    background-color: white;
    border-radius: 10px;
    margin-top: 10px;
  }
  #category, #people, #price {
    margin-top: 10px;
    color: #1F1F1F;
  }
  #category {
    margin-right: 5px;
  }

</style>
