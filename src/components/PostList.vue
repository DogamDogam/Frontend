<template>
    <div>
        <post-box @postOnClicked="postOnClicked"></post-box>
    </div>
</template>

<script>
export default {
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
