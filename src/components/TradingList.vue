<template>
    <div>
        TradingList
        <div>
            <button>Saling Btn</button>
            <button>Saled Btn</button>
            <select>
                  <option selected="selected">전체</option>
                  <option>무료</option>
                  <option>판매</option>
            </select>
        </div>
        <div>
            <trading-post :userId="userId"></trading-post>
        </div>
    </div>
</template>
<script>
export default {
  name: 'TradingList',
  props: {
    userId: {
      type: Number
    }
  }
}
</script>
