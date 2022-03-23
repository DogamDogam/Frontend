<template>
    <div>
        <b-container class="body">
            <b-row id="dealingMain">
                <b-col style="text-align: left">
                    <a href="/MainBoard">
                        <b-button>Logo</b-button>
                        <b-button>DogamDogam</b-button>
                    </a>
                </b-col>
                <b-col>
                    <b-button @click="onViewModeChanged('saleList')">selesListBtn</b-button>
                    <b-button @click="onViewModeChanged('purchaseList')">purchaseListBtn</b-button>
                    <b-button @click="onViewModeChanged('likeList')">likeListBtn</b-button>
                </b-col>
                <hr style="margin: 5px">
                <b-col>
                    <like-list v-if="viewMode == 'likeList'"></like-list>
                    <purchase-list v-if="viewMode == 'purchaseList'"></purchase-list>
                    <sale-list v-if="viewMode =='saleList'"></sale-list>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'DealingList',
  data () {
    return {
      viewMode: 'saleList'
    }
  },
  methods: {
    onViewModeChanged: function (mode) {
      console.log(mode)
      this.viewMode = mode
    }
  }
}
</script>

<style scoped>
.body {
    max-width: 100%;
    max-height: 100%;
}

#dealingMain{
    width: 100%;
    height: 100%;
    display: inline-block;
    background-color: aquamarine;
}
</style>
