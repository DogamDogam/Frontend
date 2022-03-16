<template>
    <div id="WritePost" class="d-grid gap-2">
        <b-container fluid>
            <b-row>
                <b-col id="upload_area">
                    <div v-if="image">
                      <img :src="image" alt="image">
                    </div>
                    <div v-else @click="Upload_areaClicked()">
                      <form id="uploadform">
                        <input ref="image" id="uploadinput" type="file" name="image" accept="image/*"
                        class="hidden" @change="ImageUpload()">
                      </form>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid class="d-grid gap-3">
            <b-row>
                <b-col id="title_area">
                  <b-form-input
                  :id="text"
                  placeholder="제목"
                  v-model="title"
                  >
                  </b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col id="price_area">
                    <b-form-input
                    :id="number"
                    placeholder="가격"
                    v-model="price"
                    >
                    </b-form-input>
                </b-col>
                <b-col id="place_area">
                    <b-form-input
                    :id="text"
                    placeholder="장소"
                    v-model="place"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col id="description_area">
                    <b-form-textarea
                      label
                      class="p-2 bg-light border"
                      id="textarea"
                      v-model="description"
                      placeholder="상품 정보와 거래 내용을 입력해주세요!"
                      rows="3"
                      max-rows="6"
                      >
                    </b-form-textarea>
                </b-col>
            </b-row>
            <b-row>
              <b-col id="button_area">
                <b-button id="postbutton" @click="onPostClicked()">게시하기</b-button>
                <b-button id="cancelbutton" @click="onCancelClicked()">취소하기</b-button>
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
    Upload_areaClicked () {
      this.$ref['image'].click()
    },
    onPostClicked () {
      let form = new FormData()

      form.append('image', this.image)
      form.append('place', this.place)
      form.append('price', this.price)
      form.append('description', this.description)
    },
    onCancelClicked () {

    }
  }
}
</script>

<style scoped>
</style>
