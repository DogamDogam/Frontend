<template>
    <div id="WritePost" class="d-grid gap-2">
      <br>
        <b-container fluid class="d-grid gap-2">
            <b-row>
                <b-col id="upload_area">
                  <div class="file-drop-area">
                    <span class="file-msg">파일 업로드</span>
                    <input class="file-input" type="file" accept="image/*">
                  </div>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid class="d-grid gap-3">
            <b-row>
                <b-col id="title_area">
                  <b-form-input
                  :id="title"
                  placeholder="제목"
                  v-model="title"
                  >
                  </b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col id="price_area">
                    <b-form-input
                    :id="price"
                    placeholder="가격"
                    v-model="price"
                    >
                    </b-form-input>
                </b-col>
                <b-col id="place_area">
                    <b-form-input
                    :id="place"
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
                      id="description"
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
        <br>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      post: {
        image: '',
        title: '',
        place: '',
        price: '',
        description: ''
      },
      image: '',
      title: '',
      place: '',
      price: '',
      description: ''
    }
  },
  methods: {
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

      this.post = {
        image: this.image,
        title: this.title,
        place: this.place,
        price: this.price,
        description: this.description
      }

      axios
        .post(
          'http://localhost:9090/api/posts',
          JSON.stringify(this.post),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          alert(error)
        })
    },
    onCancelClicked () {

    }
  }
}
</script>

<style scoped>

  .file-drop-area {
    position: relative;
    display: flex;
    align-items: center;
    width: 450px;
    max-width: 100%;
    padding: 25px;
    border: 1px dashed rgba(255, 255, 255, 0.4);
    border-radius: 3px;
    transition: 0.2s;
  }

  .file-input {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0;
  }

  .file-msg {
    font-size: small;
    font-weight: 300;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>
