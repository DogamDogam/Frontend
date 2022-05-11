<template>
    <div>
        <post-box @postOnClicked="postOnClicked" :userInfo="userInfo" style="padding: 5px"></post-box>
    </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    postOnClicked (result) {
      this.$emit('postOnclicked', result)
    }
  }
}
</script>
