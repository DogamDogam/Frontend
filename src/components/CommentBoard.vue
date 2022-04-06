<template>
    <b-container class="comment_body">
        <b-row>
            <b-col class="icon_area" cols="2">
                <b-avatar id="user_icon" rounded :src="user_icon"></b-avatar>
            </b-col>
            <b-col id="comment_content">
                <div>{{content}}!</div>
            </b-col>
    </b-row>
    </b-container>
</template>

<script>
export default {
  data () {
    return {
      content: '저 나눔 받고싶어요!',
      user_icon: 'https://placekitten.com/300/300'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.comment_body {
    position: relative;
    width: auto;

}
  .icon_area {
    text-align: center;
    width: 10%;
}
#user_icon {
    margin-top: 5px;
}
#comment_content {
    background-color: white;
    border-radius: 3px;
    padding-top: 10px;
    margin-left: 10px;
}
</style>
