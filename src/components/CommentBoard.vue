<template>
  <b-container class="comment_body">
    <b-row>
      <b-col class="icon_area" cols="2">
          <b-avatar id="user_icon" rounded :src="user_icon"></b-avatar>
      </b-col>
      <b-col>
        <b-form-textarea
          id="comment_area"
          v-bind="comment"
          placeholder="댓글란"
          rows="1"
          size="sm"
          max-rows="6"
        >
        </b-form-textarea>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      comment: '',
      user_icon: 'https://placekitten.com/300/300'
    }
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
</style>
