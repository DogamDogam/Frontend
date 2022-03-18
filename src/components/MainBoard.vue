<template>
    <div id="Mainboard" class="main">
        <b-container class="body">
            <b-row id="header-page" cols="2">
                <b-col>
                    <b-button variant="outline-warning"><b-icon icon="justify"></b-icon></b-button>
                </b-col>
                <b-col style="text-align: right">
                    <b-button variant="outline-warning" @click="onViewModeChanged('viewpost')">임시버튼</b-button>
                    <b-button variant="outline-warning" @click="onViewModeChanged('writepost')">글쓰기</b-button>
                    <b-button variant="outline-warning" @click="dealingOnClick()">거래중</b-button>
                    <b-button variant="outline-warning">로그인</b-button>
                </b-col>
            </b-row>
            <b-row id="main-page" cols="2">
                <b-col>
                    <post-list></post-list>
                </b-col>
                <b-col>
                    <write-post id="writepost" v-if="viewMode =='writepost'"></write-post>
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
      viewMode: 'writepost'
    }
  },
  methods: {
    onViewModeChanged: function (mode) {
      console.log(mode)
      this.viewMode = mode
    },
    dealingOnClick: function () {
      this.$router.push('DealingList')
    }
  }
}
</script>

<style scoped>
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
</style>
