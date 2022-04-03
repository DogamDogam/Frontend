<template>
    <div id="Mainboard" class="main">
        <b-container id="main-page" class="body" fluid="md">
            <b-row align-v="start" id="header-page">
                <b-row><b-col cols="20" md="center"><p id="Logo">DogamDogam</p></b-col></b-row>
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
                    <b-button id= "button" variant="outline-warning" v-if="!isLogined" @click="loginOnClick()">로그인</b-button>
                    <b-button id= "button" variant="outline-warning" v-if="isLogined" @click="logoutOnClick()">로그아웃</b-button>
                </b-col>
            </b-row>
            <b-row id="main-page-color" cols="2">
                <b-col v-if="sort_text == '정렬'">
                  <div @click="onViewModeChanged('viewpost')">
                    <post-list></post-list>
                  </div>
                </b-col>
                <b-col v-else>
                  <category-post-box v-bind:categoryProps="sort_text"></category-post-box>
                </b-col>
                <b-col>
                    <write-post id="writepost" v-if="viewMode =='writepost'" style="overflow: auto;"></write-post>
                    <view-post v-bind:idProps="sort_id" v-if="viewMode =='viewpost'"></view-post>
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
import CategoryPostBox from './CategoryPostBox.vue'
export default {
  components: { CategoryPostBox },
  name: 'MainBoard',
  data () {
    return {
      viewMode: 'writepost',
      isLogined: false,
      sort_text: '정렬'
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
    kakaoLogin: function () {
      window.open('https://kauth.kakao.com/oauth/authorize?client_id=32563be2662a64d66f1e3547267b03df&redirect_uri=http://localhost:9090/kakao/callback&response_type=code', 'target')
    },
    loginOnClick: function () {
      this.kakaoLogin()
      alert('로그인 성공')
      this.isLogined = true
    },
    logoutOnClick: function () {
      window.open('http://localhost:9090/logout', 'target')
      alert('로그아웃 성공')
      this.isLogined = false
    },
    deliveryOnSelected: function () {
      this.sort_text = '배달비'
    },
    ingredientOnSelected: function () {
      this.sort_text = '식재료'
    },
    goodsOnSelected: function () {
      this.sort_text = '물품'
    }

  },
  created () {
    EventBus.$on('eventGiveMain', mode => {
      console.log('Main 받았다: ', mode)
      this.sort_id = mode
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
}

#button {
  font-size: 20px;
}
</style>
