<template>
    <b-container class="comment_body">
        <b-row v-for="(reply, index) in replys" :key="index">
            <b-col class="icon_area" cols="2">
                <b-avatar id="user_icon" rounded :src="user_icon"></b-avatar>
            </b-col>
            <b-col id="comment_content">
                <div>{{reply.content}}</div>
                <b-button @click="test()">댓글보기</b-button>
            </b-col>
    </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    postIdProps: this.postId
  },
  data () {
    return {
      user_icon: 'https://placekitten.com/300/300',
      postId: '',
      replys: {
        image: '',
        content: ''
      },
      reply: []
    }
  },
  methods: {
    test () {
      console.log(this.postId)
      axios
        .get(
          'http://localhost:9090/api/reply/' + this.postId
        ).then((response) => {
          this.replys = response.data
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
  },
  create () {
    this.test()
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
    padding-top: 10px;
    margin-left: 10px;
}
</style>
