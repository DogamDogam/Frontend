<template>
  <div>
      <b-container class="body">
      <b-row>
        <b-row>
          <b-col>
            <state></state>
            <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Responsive image"></b-img>
          </b-col>
        </b-row>
        <b-row class="text">
          <b-col>Title</b-col>
          <b-col>Category</b-col>
        </b-row>
        <b-row class="text">
          <b-col>Price</b-col>
        </b-row>
        <b-col class="text">Description</b-col>
        </b-row>
        <div class="mb-3 text">
          <b-button v-b-toggle.my-collapse>댓글보기</b-button>
        </div>

        <b-collapse id="my-collapse">
          <b-card title="Collapsible card">
            Hello world!
          </b-card>
        </b-collapse>

      </b-container>
  </div>
</template>
<style scoped>
.body{
  margin: 10px;
}
.text {
  text-align: center;
}
</style>

<script>
export default {

}
</script>
