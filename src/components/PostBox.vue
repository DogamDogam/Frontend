<template>
    <div class="postbox_head">
        <b-container class="body">
            <b-row cols="2">
                <b-col id="proImg">
                    <b-img src="https://picsum.photos/300/150/?image=41" rounded fluid></b-img>
                </b-col>
                <b-col class="d-grid gap-2" id="proTex">
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
      posts: {
        image: '',
        title: '',
        price: ''
      },
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
    // this.getPosts()
  }
}
</script>

<style scoped>
  .postbox_head {
    background: gray;
    border-radius: 10px;
  }

#proImg, #proTex {
    margin-top : 2%;
    margin-bottom: 2%;
}
#proTex div {
    border: 2px dotted black;
}

</style>
