<template>
  <div id="body" class="d-grid gap-2">
    <br>
      <b-container fluid class="d-grid gap-3">
        <b-row class="Image_area">
          <b-col>
            <div class="Image_state">
              <state></state>
              <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Responsive image"></b-img>
            </div>
          </b-col>
        </b-row>

        <b-row class="text">
          <b-col>Title</b-col>
          <b-col>Category</b-col>
        </b-row>

        <b-row class="text">
          <b-col>Price</b-col>
        </b-row>

        <b-row>
          <b-col class="text">Description</b-col>
        </b-row>

        <b-row>
          <b-col>
            <div class="mb-3 text">
              <b-button v-b-toggle.my-collapse class="toggle_button">
            <b-icon icon="caret-down"></b-icon>
          </b-button>
        </div>

        <b-collapse id="my-collapse">
          <comment-board class="comment_board"></comment-board>
        </b-collapse>
          </b-col>
        </b-row>

      </b-container>
  </div>
</template>
<style scoped>
#body{
  margin: 10px;
}
.text {
  text-align: center;
}

  #my-collapse {
    border: 1px solid black;
    border-radius: 10px;
  }
  .comment_board {
    margin: 10px;
  }
  .Image_area {
    text-align: center;
  }
  .Image_state {
    display: inline-block;
  }
  .toggle_button {
    width: 90%;
  }
</style>

<script>
import DealingList from './DealingList.vue'
export default {
  components: { DealingList }

}
</script>
