<template>
    <div id="WritePost" class="d-grid gap-2" style="postion: relative">
      <br>
        <b-container fluid class="d-grid gap-2">
            <b-row>
                <b-col id="upload_area">
                  <div class="file-drop-area">
                    <img :src="image" v-if="image.length>0">
                    <label for="ImageUpload" v-else>사진 업로드</label>
                    <input class="file-input" @change="ImageUpload" type="file" accept="image/*">
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
              <b-col>
                <b-row>
                  <b-col>참여인원</b-col>
                </b-row>
                <b-row><b-col><b-form-input id="numOfpeople" v-model="numOfpeople" disabled>{{numOfpeople}}</b-form-input></b-col><b-col cols="4"><b-button-group><b-button @click="increase()">+</b-button><b-button @click="decrease()">-</b-button></b-button-group></b-col></b-row>
              </b-col>
              <b-col cols="5">
                <b-row><b-col>Category</b-col></b-row>
                <b-row><b-col><select v-model="selectedItem"><option v-for="each in items" :key ="each" v-text ="each" :value ="each"></option></select></b-col></b-row>
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
                      no-resize
                      >
                    </b-form-textarea>
                </b-col>
            </b-row>
            <b-row>
              <b-col id="button_area" style="text-align: right">
                <b-button id="postbutton" @click="onPostClicked()" >
                  글 쓰기 <b-icon icon="pencil"></b-icon></b-button>
                <b-button id="cancelbutton" @click="onCancelClicked()" >취소하기</b-button>
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
      items: ['식재료', '배달비', '물품'],
      selectedItem: '식재료',
      post: {
        image: '',
        title: '',
        place: '',
        price: '',
        category: '',
        numOfpeople: 0,
        description: ''
      },
      image: '',
      title: '',
      place: '',
      price: '',
      category: '',
      numOfpeople: '0',
      description: ''
    }
  },
  methods: {
    ImageUpload (event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.image = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    increase () {
      this.numOfpeople++
    },
    decrease () {
      if (this.numOfpeople > 0) { this.numOfpeople-- }
    },
    changeCategory () {
      console.log(this.selectedItem)
    },
    onPostClicked () {
      this.post = {
        image: '임시image',
        title: this.title,
        place: this.place,
        price: this.price,
        category: this.selectedItem,
        numOfpeople: this.numOfpeople,
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
          alert('글쓰기 성공!')
        })
        .catch(error => {
          console.log(error)
          alert('글쓰기 실패!')
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
  #postbutton,#cancelbutton {
    background-color: rgb(255, 154, 22);
    color: rgb(34, 34, 34);

  }
  img {
    overflow: auto;
    height: 200px;
    border-radius: 10px;
  }

</style>
