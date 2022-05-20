<template>
    <div v-if = "posts != null" class="postbox">
        <b-container fluid="sm" v-for="(post, index) in posts" :key="index" id="post_container" style="margin: 5px;">
            <b-row md="4">
              <b-col id="postImg_col" cols="3">
                <b-img :src="post.image" thumbnail fluid alt="Image 1" id="image" rounded> </b-img>
              </b-col>
              <b-col class="d-grid gap-1" id="postContexts_col" cols="12" lg="10" xl="5">
                <b-row>
                  <b-col align-self="start" id="title">
                    <div>{{post.title}}</div>
                  </b-col>
                </b-row>
                <b-row align-h="between">
                  <b-col align-self="start" id="place">
                    <div>작성자: {{post.userName}}</div>
                    <div>장소: {{post.place}}</div>
                    <div>{{post.price}} 원 / {{post.numOfpeople}}명 모집</div>
                    <div>작성일: {{post.createDate.substr(0,10)}} {{post.createDate.substr(11,8)}}</div>
                  </b-col>
                  <b-col cols="3" sm="4">                    <!-- <b-icon icon="heart-fill" class="gap_margin_5px_horizontal"
                      :style="currentMode == 'grid' ? 'color:red;' : ''"
                      v-on:click="greet()"
                    /> -->
                    <b-button @click="onViewModeChanged(index)">상세보기</b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import {EventBus} from '../main'
import axios from 'axios'
export default {
  name: 'Posts',
  props: {
  },
  data () {
    return {
      category: '',
      categoryNum: '',
      posts: {
        image: '',
        title: '',
        price: '',
        place: '',
        description: '',
        numOfpeople: '',
        userName: '',
        createDate: ''
      },
      commaPrice: '',
      post: [],
      pageNum: 0,
      pageLast: false,
      totalPage: 0,
      currentMode: ''
    }
  },
  methods: {
    greet: function () {
      this.currentMode === 'grid' ? this.currentMode = '' : this.currentMode = 'grid'
    },
    onViewModeChanged: function (index) {
      console.log('Main 보냈다: ', this.posts[index].id)
      EventBus.$emit('eventGiveMain', this.posts[index].id) // 배열 값 viewPost.vue로 보냄
      console.log('Post 보냈다: ', index)
      EventBus.$emit('eventGivePost', index)
      this.$emit('postOnClicked', this.posts)
    },
    emitTotalPageNum (res) {
      this.totalPage = res.data.totalPages
      EventBus.$emit('totalPageNum', this.totalPage) // pageNum을 MainBoard에에 전달
    },
    getPosts () {
      axios.get('http://localhost:9090/api/posts/?page=' + this.pageNum)
        .then((response) => {
          this.emitTotalPageNum(response)
          this.posts = response.data.content
          this.comma(this.posts)
        }).catch((error) => {
          console.log(error)
          this.posts = {}
        })
    },
    getCategory () {
      EventBus.$on('eventGiveMainSort', mode => {
        console.log('Sort 받았다: ', mode)
        this.pageNum = 0
        this.$parent.$parent.$refs.nextBtn.disabled = false
        this.category = mode
        this.setCategoryNum()
      })
    },
    setCategoryNum () {
      if (this.category === '식재료') {
        this.categoryNum = 1
        this.getCategoryPosts(this.categoryNum)
      } else if (this.category === '배달비') {
        this.categoryNum = 2
        this.getCategoryPosts(this.categoryNum)
      } else if (this.category === '물품') {
        this.categoryNum = 3
        this.getCategoryPosts(this.categoryNum)
      } else if (this.category === '정렬') {
        this.categoryNum = 0
        this.getCategoryPosts(this.categoryNum)
      }
    },
    getCategoryPosts (categoryNum) {
      console.log('다시 0이 되었습니다: ' + this.pageNum)
      axios
        .get(
          'http://localhost:9090/api/posts/category/' + categoryNum + '?page=' + this.pageNum)
        .then((response) => {
          this.emitTotalPageNum(response)
          this.posts = response.data.content
        }).catch((error) => {
          console.log(error)
        })
    },
    comma (res) {
      for (var i = 0; i < res.length; i++) {
        var num = res[i].price
        this.posts[i].price = num.toLocaleString('ko-KR')
      }
    },
    checkLastPage () {
      if (this.totalPage <= this.pageNum) {
        console.log(this.pageNum)
        this.pageLast = true
        // alert('마지막 페이지입니다.') // 중첩 오류
        this.pageNum -= 1
        this.$parent.$parent.$refs.nextBtn.disabled = true
      } else {
        this.pageLast = false
      }
    }
  },
  watch: {
    categoryProps: function () {
      this.getPost()
    },
    pageNum: function () {
      if (this.categoryNum === '') {
        this.getPosts()
        this.checkLastPage()
      } else {
        console.log(this.categoryNum)
        this.setCategoryNum()
        this.checkLastPage()
      }
    },
    category: function () {
      this.getCategoryPosts(this.categoryNum)
    }
    // pageLast: function () {
    //   this.$emit('informpageLast', this.pageLast, this.totalPage) // 마지막 페이지면 Mainboard에 알림
    // }
  },
  created () {
    // this.category = this.categoryProps
    this.posts = {}
    this.getCategory() // 카테고리를 눌렀는지
    this.getPosts()
    EventBus.$on('sendPageNum', num => {
      this.pageNum = num
    })
  }
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

* {
font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
}
  .postbox {
    background: rgb(247, 203, 138);
    border-radius: 10px;
    margin: 5px;
    margin-left: 10px;
    margin-top: 20px;
  }
  #image {
    max-width: 200px;
    max-height: 200px;
  }
  #title, #price, #place {
    padding: 5px;
    width: auto;
  }
  #title {
    font-size: 1.2em;
    font-weight: 700;
    text-align: left;
    border-bottom: 2px solid #F7F7F7;
  }
  #place {
    margin-top: -10px;
    font-size: 0.9em;
    color: #1F1F1F;
  }
  #post_container {
    padding: 10px;
  }
</style>
