<template>
    <div class="postbox_head">
        <b-container class="body">
            <b-row>
              <b-col sm="auto" id="proImg">
                <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1" style="width: 100px;"></b-img>
              </b-col>
              <b-col class="d-grid gap-2" id="proTex">
                <div id="title">Title</div>
                <div id="price">Price</div>
              </b-col>
              <b-col id="Peo">
                <div>
                  모집인원
                </div>
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
    background: rgb(247, 203, 138);
    border-radius: 10px;
    margin: 10px;
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
