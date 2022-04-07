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

<script>
export default {
  name: 'LoginBoard',
  methods: {
    LoginonClicked () {
      const params = {
        redirectUri: 'http://localhost:9090/LoginBoard/KaKaoLogin/callback'
      }
      window.Kakao.Auth.authorize(params)
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
