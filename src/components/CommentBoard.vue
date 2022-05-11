<template>
    <div>
      <b-container class="comment_body" v-for="(reply, index) in replys" :key="index">
        <b-row>
            <b-col class="icon_area" cols="2">
                <b-avatar id="user_icon" rounded :src="user_icon"></b-avatar>
            </b-col>
            <b-col cols="8">
              <div>{{reply.userName}}</div>
                <div id="comment_content">{{reply.content}}</div>
            </b-col>
            <b-col>
              <b-button @click="deleteComment(reply)">삭제</b-button>
            </b-col>
        </b-row>
    </b-container>
    </div>
</template>

<script>
import axios from 'axios'
import {EventBus} from '../main'
export default {
  props: {
    postIdProps: this.postId,
    userInfo: {
      type: Object
    }
  },
  data () {
    return {
      user_icon: this.userInfo.userImage,
      postId: '',
      replys: {
        image: '',
        content: '',
        userName: ''
      },
      reply: [],
      check: false
    }
  },
  methods: {
    getComment () {
      axios
        .get(
          'http://localhost:9090/api/reply/' + this.postId
        ).then((response) => {
          this.replys = response.data
          console.log(this.replys.length)
          this.checkComment(this.replys.length)
        }).catch((error) => {
          console.log(error)
        })
    },
    deleteComment (reply) {
      console.log(reply)
      this.$bvModal.msgBoxConfirm('댓글을 삭제하시겠습니까?', {
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
              `http://localhost:9090/api/reply/${this.postId}/${reply.id}`)
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
    checkComment (length) {
      (length > 0) === true ? this.check = true : this.check = false
      EventBus.$emit('checkComment', this.check)
    }
  },
  watch: {
    postIdProps: function () {
      this.postId = this.postIdProps
      this.getComment()
    }
  },
  created () {
    this.postId = this.postIdProps
    this.getComment()
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
    width: 10%;
}
#user_icon {
    margin-top: 5px;
}
#comment_content {
    background-color: white;
    border-radius: 3px;
    padding-left: 15px;
    height: 40px;
}
</style>
