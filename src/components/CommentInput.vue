<template>
  <b-container class="comment_body">
    <b-row>
      <b-col class="icon_area" cols="2">
          <b-avatar id="user_icon" size="lg" rounded :src="user_icon"></b-avatar>
      </b-col>
      <b-col>
        <b-form-textarea
          :id="comment"
          v-model="comment"
          placeholder="댓글란"
          rows="1"
          size="sm"
          max-rows="6"
        >
        </b-form-textarea>
      </b-col>
      <b-col cols="2"><b-button size="lg" @click="commentOnClick()">입력</b-button></b-col>
    </b-row>
    <b-row>
      <b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {URL} from '../url/BackendUrl'
import axios from 'axios'
export default {
  props: {
    postIdProps: this.postId,
    userInfo: {
      type: Object
    }
  },
  data () {
    return {
      postId: '',
      comment: '',
      user_icon: this.userInfo.userImage,
      body: {
        image: '',
        content: '',
        userId: '',
        userName: ''
      }
    }
  },
  methods: {
    commentOnClick: function () {
      this.body = {
        image: this.userInfo.userImage,
        content: this.comment,
        userId: this.userInfo.userId,
        userName: this.userInfo.userNickname
      }
      console.log(this.postId)
      axios.post(
        URL + '/api/reply/' + this.postId,
        JSON.stringify(this.body),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then((response) => {
        console.log(response)
        alert('댓글 작성 완료')
        this.comment = ''
        this.$router.go()
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  watch: {
    postIdProps: function () {
      this.postId = this.postIdProps
    }
  },
  created () {
    this.postId = this.postIdProps
  }
}
</script>

<style scoped>
  .comment_body {
    position: relative;
    width: auto;

  }
  .icon_area {
    text-align: center;
  }
</style>
