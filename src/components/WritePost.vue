<template>
    <div id="WritePost">
        <b-container fluid>
            <b-row>
                <b-col id="uploadbox">
                    <div v-if="image">
                      <img :src="image" alt="image">
                    </div>
                    <div v-else @click="Clickbox()">
                      <form id="uploadform">
                        <input ref="image" id="uploadinput" type="file" name="image" accept="image/*"
                        class="hidden" @change="ImageUpload()">
                        <p> Image Upload </p>
                      </form>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col id="titlebox">
                    제목 입력란
                </b-col>
            </b-row>
            <b-row>
                <b-col id="pricebox">
                    가격 입력란
                </b-col>
                <b-col id="placebox">
                    장소 입력란
                </b-col>
            </b-row>
            <b-row>
                <b-col id="description">
                    설명 입력란
                </b-col>
            </b-row>
            <b-row>
              <b-col id="buttonbox">
                <b-button id="postbutton" @click="Posting()"></b-button>
              </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      image: '',
      place: '',
      price: '',
      description: ''
    }
  },
  method: {
    ImageUpload () {
      this.image = this.$refs['image'].files[0]
    },
    Clickbox () {
      this.$ref['image'].click()
    },
    Posting () {
      let form = new FormData()

      form.append('image', this.image)
      form.append('place', this.place)
      form.append('price', this.price)
      form.append('description', this.description)
    }
  }
}
</script>

<style scoped>
  #uploadbox {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -250px;
    width: 500px;
    height: 200px;
    border: 4px dashed rgb(0, 0, 0);
  }
  #uploadbox p {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 170px;
    color: #000000;
    font-family: Arial;
  }
  #uploadinput {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
  }
</style>
