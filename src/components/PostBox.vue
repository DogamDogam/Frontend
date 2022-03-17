<template>
    <div>
        <b-container class="body">
            <b-row cols="2">
                <b-col id="proImg">
                    Product Image
                </b-col>
                <b-col id="proTex">
                    <div>Title</div>
                    <div>Price</div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import PostService from '../services/PostService'
export default {
  name: 'Posts',
  data () {
    return {
      posts: {},
      post: []
    }
  },
  methods: {
    getPosts () {
      PostService.getPosts().then((response) => {
        console.log(response.data)
        this.posts = response.data
      })
    }
  },
  created () {
    this.getPosts()
  }
}
</script>

<style scoped>
.body {
    border: 2px dotted black;
}

#proImg {
    border: 2px dotted black;
}
#proTex div {
    border: 2px dotted black;
}
</style>
