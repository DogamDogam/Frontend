<template>
    <div>
        <b-container class="body">
            <b-row class="head">
                <b-col style="text-align: left">
                    <a href="/MainBoard" style="text-decoration: none;">
                        <p>DogamDogam</p>
                    </a>
                </b-col>
            </b-row>
            <b-row class="body_button" align-v="center">
                <b-col sm>
                    <b-button class="sale_button" variant="outline-warning" @click="onViewModeChanged('saleList')">selesListBtn</b-button>
                </b-col>
                <b-col sm>
                    <b-button class="purchase_button" variant="outline-warning" @click="onViewModeChanged('purchaseList')">purchaseListBtn</b-button>
                </b-col>
                <b-col sm>
                    <b-button class="like_button" variant="outline-warning" @click="onViewModeChanged('likeList')">likeListBtn</b-button>
                </b-col>
            </b-row>
            <b-row class="body_page">
                <b-col>
                    <like-list v-if="viewMode == 'likeList'"></like-list>
                    <purchase-list v-if="viewMode == 'purchaseList'"></purchase-list>
                    <sale-list v-if="viewMode =='saleList'"></sale-list>
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
