<template>
    <div id="loginboard">
        <b-container>
            <b-row align-v="center" align-h="center">
            <b-card no-body="no-body" style="max-width: 540px;">
                <b-card title="로그인 / 회원가입" sub-title="KaKao Login">
                    <b-card-text>
                        카카오톡과 연동되어 계정 로그인 / 생성을 진행합니다.
                    </b-card-text>
                    <b-button>
                        <router-link to="" style="text-decoration: none;">Login / Register</router-link>
                    </b-button>
                    <b-button>
                        <router-link to="/" style="text-decoration: none;">뒤로가기</router-link>
                    </b-button>
                </b-card>
            </b-card>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'LoginBoard'
}
</script>

<style scoped>
    #loginboard {
        height: 100vh;
    }
</style>
