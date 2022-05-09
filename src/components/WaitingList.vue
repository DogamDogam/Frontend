<template>
    <div>
        WaitingList
        <waiting-post :userId="userId"></waiting-post>
    </div>
</template>
<script>
export default {
  name: 'WaitingList',
  props: {
    userId: {
      type: Number
    }
  }
}
</script>
