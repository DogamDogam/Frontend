<template>
  <b-container class="comment_body">
    <b-row>
      <b-col cols="2">
        <b-icon-person-fill font-scale="3"></b-icon-person-fill>
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
      comment: ''
    }
  }
}
</script>

<style scoped>
  .comment_area {
    height: 30px;
  }

  .comment_area {
    border-color: black;
  }
</style>
