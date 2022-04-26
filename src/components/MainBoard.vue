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
                      <b-dropdown-item @click="sort_text='정렬'">정렬</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item @click="ingredientOnSelected()">식재료</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item @click="deliveryOnSelected()">배달비</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item @click="goodsOnSelected()">물품</b-dropdown-item>
                    </b-dropdown>
                </b-col>
                <b-col cols="4" md style="text-align: right">
                    <b-button id= "button" variant="outline-warning" @click="onViewModeChanged('writepost')">글쓰기</b-button>
                    <b-button id= "button" variant="outline-warning" @click="dealingOnClick()">거래중</b-button>
                    <router-link to="/LoginBoard">
                      <b-button id= "button" variant="outline-warning" v-if="!isLogined">로그인</b-button>
                    </router-link>
                    <b-button id="button" variant="outline-warning" v-if="isLogined" @click="logoutonClicked">로그아웃</b-button>
                </b-col>
            </b-row>
            <b-row id="main-page-color" cols="2">
                <b-col v-if="sort_text == '정렬'">
                  <div>
                    <post-list @postOnclicked="postOnclicked"></post-list>
                  </div>
                </b-col>
                <b-col v-else>
                  <category-postbox v-bind:categoryProps="sort_text"></category-postbox>
                </b-col>
                <b-col>
                    <write-post id="writepost" v-if="viewMode =='writepost'" style="overflow: auto;"></write-post>
                    <view-post v-bind:idProps="id" :postProp="postFromPostBox" v-if="viewMode =='viewpost'"></view-post>
                </b-col>
            </b-row>
            <b-row id="main-page-color">
                  <div class="jumbotron text-center footer">
                    <p>🤩 Created by Team 다감다감</p>
                    <p>📞 010-0000-000</p>
                    <p>🎈 강남대학교 소프트웨어응용학부</p>
                  </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {EventBus} from '../main'
export default {
  name: 'MainBoard',
  props: {
    userInfo: {
      type: Object
    }
  },
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
      user: {}
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
    logoutonClicked: function () {
      alert('로그아웃 성공')
      this.isLogined = false
      this.user = null
    },
    deliveryOnSelected: function () {
      this.sort_text = '배달비'
    },
    ingredientOnSelected: function () {
      this.sort_text = '식재료'
    },
    goodsOnSelected: function () {
      this.sort_text = '물품'
    },
    postOnclicked: function (result) {
      this.postFromPostBox = result
    }
  },
  created () {
    if (this.$route.params.userInfo != null) {
      this.user = this.$route.params.userInfo
      this.isLogined = true
    }
    EventBus.$on('eventGiveMain', mode => {
      console.log('Main 받았다: ', mode)
      this.id = mode
      this.onViewModeChanged('viewpost')
    })
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
