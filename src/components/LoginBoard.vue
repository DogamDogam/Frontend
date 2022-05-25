<template>
    <div id="loginboard">
        <b-container>
            <b-row align-v="center" align-h="center">
                <b-card id="bcard" no-body>
                    <b-card id="subcard" title="로그인 / 회원가입" sub-title="KaKao Login" bg-variant="light">
                        <b-card-text>
                            카카오톡과 연동되어 계정 로그인 / 생성을 진행합니다.
                        </b-card-text>
                        <b-button variant="outline-warning" @click="LoginonClicked()">
                        로그인/회원가입
                        </b-button>
                        <b-button variant="outline-warning">
                            <router-link to="/">뒤로가기</router-link>
                        </b-button>
                    </b-card>
                </b-card>
            </b-row>
        </b-container>
    </div>
</template>

<script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
<script>
import {URL} from '../url/BackendUrl'
import {TERM} from '../url/BackendUrl'
import axios from 'axios'
import {EventBus} from '../main'
export default {
  name: 'LoginBoard',
  data () {
      return {
          result: [],
          userInfo: {},
          userEmail: ''
      }
  },
  methods: {
    LoginonClicked () {
      var CryptoJS = require("crypto-js");
      var kakaowindow = window.open('https://kauth.kakao.com/oauth/authorize?client_id=32563be2662a64d66f1e3547267b03df&redirect_uri='+ URL + '/oauth/kakao&response_type=code', 'PopupWin', 'width=500,height=600')
      setTimeout(() => {
        axios.get(URL + '/oauth/getUser')
        .then(res => {
              this.userInfo = res.data
              console.log(this.userInfo)
              var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.userInfo), 'secret key 123').toString();
              this.$router.push({name: 'MainBoard', query: { data : { userInfo : ciphertext}} })
            //   kakaowindow.close() //동의시 문제발생
          })
          .catch(error => {
              console.log(error)
              alert('로그인 실패')
          })
      }, 500)
    }
  }
}
</script>

<style scoped>
    #loginboard {
        height: 100vh;
    }
    #bcard {
        max-width: 540px;
        margin-top: 25%;
        border: 0px;
    }
    button {
        background-color: white;
    }
    a {
        text-decoration: none;
        color: black;
    }
</style>
