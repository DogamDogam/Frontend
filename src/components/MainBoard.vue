<template>
    <div id="Mainboard">
        <b-container class="body">
            <b-row id="header-page" cols="2">
                <b-col>
                    <button>sort</button>
                </b-col>
                <b-col style="text-align: right">
                    <button @click="onVieModeChanged('viewpost')">임시버튼</button>
                    <button @click="writeOnClick()">write post</button>
                    <button>dearling list</button>
                    <button>login</button>
                </b-col>
            </b-row>
            <b-row id="main-page" cols="2">
                <b-col>
                    <post-list></post-list>
                </b-col>
                <b-col>
                    <write-post v-if="viewMode =='writepost'"></write-post>
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
    onVieModeChanged: function (mode) {
      console.log(mode)
      this.viewMode = mode
    },
    writeOnClick: function () {
      this.$router.push('WritePost')
    }
  }
}
</script>

<style scoped>
.body {
    max-width: 100%;
}
#header-page {
    background: aquamarine;
}
#main-page {
    background: pink;
}
</style>
