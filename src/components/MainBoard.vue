<template>
    <div id="Mainboard" class="main">
        <b-container class="body" fluid="md">
            <b-row align-v="start" id="header-page">
                <b-col cols="auto">
                    <b-button variant="outline-warning"><b-icon icon="justify"></b-icon></b-button>
                </b-col>
                <b-col cols="20" md="auto">
                    <p id="Logo">DogamDogam</p>
                </b-col>
                <b-col cols="4" md style="text-align: right">
                    <b-button variant="outline-warning" @click="onViewModeChanged('viewpost')">임시버튼</b-button>
                    <b-button variant="outline-warning" @click="onViewModeChanged('writepost')">글쓰기</b-button>
                    <b-button variant="outline-warning" @click="dealingOnClick()">거래중</b-button>
                    <b-button variant="outline-warning" v-if="!isLogined" @click="loginOnClick()">로그인</b-button>
                    <b-button variant="outline-warning" v-if="isLogined" @click="logoutOnClick()">로그아웃</b-button>
                </b-col>
            </b-row>
            <b-row id="main-page" cols="2">
                <b-col>
                    <post-list></post-list>
                </b-col>
                <b-col>
                    <write-post id="writepost" v-if="viewMode =='writepost'" style="overflow: auto;"></write-post>
                    <view-post v-if="viewMode =='viewpost'"></view-post>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'MainBoard',
  data () {
    return {
      viewMode: 'writepost',
      isLogined: false
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
    margin-left: 10px;
}
#header-page {
    /* background: aquamarine; */
    margin: 15px;
    margin-bottom: 20px;
}
#main-page {
    background: rgb(250, 244, 212);
    border-radius: 10px;
    margin: 10px;

}
#writepost {
  margin-top: 50px;
  background-color: rgb(247, 203, 138);
  border-radius: 10px;
}
#Logo {
  text-align: center;
  font-size: 20px;
  font-family: yg-jalnan;
  color: #2F4F4F;
  margin-top: 5px;
}
</style>
