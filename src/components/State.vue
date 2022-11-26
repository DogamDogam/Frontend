<template>
  <div class="body">
      <b-button>{{this.state}}</b-button>
  </div>
</template>

<script>
import {EventBus} from '../main'
export default {
  data () {
    return {
      trading: false,
      state: '대기중'
    }
  },
  created () {
    EventBus.$on('checkComment', boolean => {
      this.trading = boolean
    })
  },
  watch: {
    trading: function () {
      this.trading === true ? this.state = '거래중' : this.state = '대기중'
    }
  }
}
</script>

<style scoped>
.body {
    position: absolute;
}
</style>
