<template>
    <div id="Mainboard" class="main">
        <b-container id="main-page" class="body" fluid="md">
            <b-row align-v="start" id="header-page">
                <b-row style="text-align: center;">
                  <b-col cols="20" md="center">
                    <p id="Logo">나누미</p>
                    <p id="font">물품 나눔 서비스</p>
                  </b-col>
                </b-row>
                <b-col cols="auto">
                    <b-dropdown v-bind:text="sort_text" dropright>
                      <b-dropdown-item @click="sortOnSelected($event)">정렬</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item @click="sortOnSelected($event)">식재료</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item @click="sortOnSelected($event)">배달비</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item @click="sortOnSelected($event)">물품</b-dropdown-item>
                    </b-dropdown>
                </b-col>
                <b-col cols="4" md style="text-align: right">
                    <b-button id= "button" variant="outline-warning" @click="onViewModeChanged('writepost')">글쓰기</b-button>
                    <b-button id= "button" variant="outline-warning" @click="dealingOnClick()">거래중/대기중</b-button>
                    <b-button v-if="isLogined" id= "button" variant="outline-warning" @click="myDealingOnClick()">내 거래</b-button>
                    <router-link to="/LoginBoard">
                      <b-button v-if="!isLogined" id= "button" variant="outline-warning">로그인</b-button>
                    </router-link>
                    <b-button v-if="isLogined" id="button" variant="outline-warning" @click="logoutonClicked">로그아웃</b-button>
                </b-col>
            </b-row>
            <b-row id="main-page-color" cols="2" style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                <b-col>
                  <div>
                    <post-list @postOnclicked="postOnclicked" :userInfo="user"></post-list>
                    <!--<post-box @postOnClicked="postOnClicked" style="padding: 5px" v-bind:categoryProps="sort_text"></post-box></b-col>-->
                  </div>
                </b-col>
                <!--
                <b-col v-else>
                  <category-postbox v-bind:categoryProps="sort_text"></category-postbox>
                </b-col>
                -->
                <b-col>
                    <write-post id="writepost" v-if="viewMode =='writepost'" :userInfo="user" style="overflow: auto;"></write-post>
                    <view-post v-bind:idProps="id" :postProp="postFromPostBox" :userInfo="user" v-if="viewMode =='viewpost'"></view-post>
                </b-col>
                <b-col style="text-align: center;">
                  <b-button id="prevBtn" ref="prevBtn" @click="decreasePageNum">이전</b-button>
                  <b-button id="nextBtn" ref="nextBtn" @click="increasePageNum">다음</b-button>
                </b-col>
            </b-row>
            <b-row id="main-page-color" style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
                  <div class="jumbotron text-center footer">
                    <p>🤩 Created by Team 다감다감</p>
                    <p>🎈 강남대학교 소프트웨어응용학부</p>
                  </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
// import axios from 'axios'
import {URL} from '../url/BackendUrl'
import {EventBus} from '../main'
export default {
  name: 'MainBoard',
  data () {
    return {
      viewMode: 'writepost',
      isLogined: false,
      sort_text: '정렬',
      id: '',
      postFromPostBox: {
        image: '',
        title: '',
        price: '',
        place: '',
        description: '',
        numOfpeople: ''
      },
      user: {},
      pageNum: 0,
      lastPage: false
    }
  },
  methods: {
    onViewModeChanged: function (mode) {
      console.log(mode)
      this.viewMode = mode
    },
    dealingOnClick: function () {
      this.$router.push('DealingList')
    },
    myDealingOnClick: function () {
      this.$router.push({name: 'MyDealingList', params: { user: this.user }})
    },
    logoutonClicked: function () {
      alert('로그아웃 성공')
      this.isLogined = false
      this.user = null
    },
    sendPostCategory (sortText) {
      EventBus.$emit('eventGiveMainSort', sortText)
    },
    sortOnSelected: function (event) {
      this.sort_text = event.target.innerHTML
      this.sendPostCategory(this.sort_text)
    },
    postOnclicked: function (result) {
      this.postFromPostBox = result
    },
    increasePageNum: function () {
      this.$refs.prevBtn.disabled = false // 이전 버튼 비활성화
      if (this.lastPage === false) { // 마지막 페이지가 아니면
        this.pageNum++ // 다음 페이지
      } else { // 마지막 페이지라면
        this.$refs.nextBtn.disabled = true // 다음 버튼 비활성화
        this.lastPage = false
        this.pageNum = this.totalPageNum - 1
      }
      console.log(this.pageNum)
    },
    decreasePageNum: function () {
      console.log(this.pageNum)
      if (this.pageNum >= this.totalPageNum) {
        this.pageNum = this.totalPageNum - 1
      }
      if (this.pageNum === 0) {
        alert('첫페이지입니다.')
        this.$refs.prevBtn.disabled = true // 이전 버튼 비활성화
      } else {
        this.pageNum--
        this.$refs.nextBtn.disabled = false
      }
    }
  },
  created () {
    console.log(URL)
    EventBus.$on('eventGiveMain', mode => {
      console.log('Main 받았다: ', mode)
      this.id = mode
      this.onViewModeChanged('viewpost')
    })
    // this.getUser()
  },
  watch: {
    pageNum: function () {
      if (!this.lastPage) {
        EventBus.$emit('sendPageNum', this.pageNum) // pageNum을 PostBox에 전달
      }
    },
    sort_text: function () {
      EventBus.$on('totalPageNum', totalPageNum => {
        this.totalPageNum = totalPageNum
        console.log(this.totalPageNum)
      })
    },
    isLogined: function () {
      if (this.isLogined === true) {
        this.user = JSON.parse(this.$route.params.data).userInfo
        console.log(this.user)
      } else {
        this.user = {}
      }
    }
  },
  mounted () {
    if (this.$route.params.data != null) {
      this.user = JSON.parse(this.$route.params.data).userInfo
      this.isLogined = true
    }
  }
}
</script>

<style scoped>
@font-face {
    font-family: 'yg-jalnan';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.body {
    max-width: 100%;
}
.main {
    margin-left: 30px;
    margin-right: 30px;
}
.footer {
  margin-top: 100px;
  margin-bottom:30px;
}
#header-page {
    margin: 15px;
    margin-bottom: 20px;
}
#main-page {
    margin: 10px;

}

#main-page-color {
      background: rgb(250, 244, 212);
      border-radius: 10px;

}
#writepost {
  margin-top: 20px;
  background-color: rgb(247, 203, 138);
  border-radius: 10px;
  margin-right: 10px;
}
#Logo {
  text-align: center;
  font-size: 50px;
  font-family: yg-jalnan;
  color: #2F4F4F;
  margin-top: 20px;
  margin-left: 100px;
  display: inline-block;

}
#font {
  text-align: center;
  font-size: 30px;
  font-family: yg-jalnan;
  color: #2F4F4F;
  display: inline-block;
  margin-left: 20px;
}

#button {
  font-size: 20px;
}
</style>
