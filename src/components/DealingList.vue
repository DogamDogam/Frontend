<template>
    <div>
        <b-container class="body">
            <b-row class="head">
                <b-col style="text-align: left">
                    <router-link to="/" style="text-decoration: none;">
                        <p>DagamDagam</p>
                    </router-link>
                </b-col>
            </b-row>
            <b-row class="body_button" align-v="center">
                <b-col sm>
                    <b-button block class="w-100 p-3" variant="outline-warning" @click="onViewModeChanged('tradingList')">거래중</b-button>
                </b-col>
                <b-col sm>
                    <b-button block class="w-100 p-3" variant="outline-warning" @click="onViewModeChanged('waitingList')">대기중</b-button>
                </b-col>
                <b-col sm>
                    <b-button block class="w-100 p-3" variant="outline-warning" @click="onViewModeChanged('likeList')">관심목록</b-button>
                </b-col>
            </b-row>
            <b-row class="body_page">
                <b-col>
                    <like-list v-if="viewMode == 'likeList'"></like-list>
                    <waiting-list v-if="viewMode == 'waitingList'"></waiting-list>
                    <trading-list v-if="viewMode =='tradingList'"></trading-list>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'DealingList',
  data () {
    return {
      viewMode: 'saleList'
    }
  },
  methods: {
    onViewModeChanged: function (mode) {
      console.log(mode)
      this.viewMode = mode
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
    max-height: 100%;
}

.body_page {
  background-color: rgb(250, 244, 212);
  border-radius: 10px;
  margin: 10px;
}

p {
  text-align: center;
  font-size: 50px;
  font-family: yg-jalnan;
  color: #2F4F4F;
}

</style>
