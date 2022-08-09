<template>
   <!-- 最外层的容器 -->
    <view class="my-settle-container">
       <!-- 全选区域 -->
        <label class="radio" @click="changeAllState">
          <radio color="#C00000" :checked="isAllChecked"/><text>全选</text>
        </label>
      
        <!-- 合计区域 -->
        <view class="amount-box">
          合计:<text class="amount">￥{{totalPrice}}</text>
        </view>
      
        <!-- 结算按钮 -->
        <view class="btn-settle">结算({{checkedCount}})</view>
    </view>
</template>

<script>
  import { useStore } from 'vuex'
  import { reactive, computed, watch } from 'vue'
  export default {
    name:"my-settle",
    setup() {
      const store = useStore()
      const { getters } = useStore()
      const state = reactive({
        // checkedCount:getters['cart/checkedCount']
      })
     
      const checkedCount = computed(() => {
        return getters['cart/checkedCount']
      })
       
      const total = computed(() => {
         return getters['cart/total']
      })
      const isAllChecked = computed(() => {
        if(checkedCount.value===total.value && total.value !==0){
          return true
        }else{
          return false
        }
      })
      const totalPrice = computed(() => {
        return getters['cart/checkedGoodsPrice']
      })
     
   /*   watch(count,function(newValue){
        state.checkedCount = newValue
      }) */
      const changeAllState = () => {
        store.commit('cart/UPDATEALLGOODSSTATE', !isAllChecked.value)
      }
      return { state, checkedCount, isAllChecked, changeAllState, totalPrice }
    }
  }
</script>

<style lang="scss">

.my-settle-container {
  /* 底部固定定位 */
  position: fixed;
  bottom: 0;
  left: 0;
  /* 设置宽高和背景色 */
  width: 100%;
  height: 50px;
  background-color: white;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
   .radio {
      display: flex;
      align-items: center;
    }
  
    .amount {
      color: #c00000;
      font-weight: bold;
    }
  
    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px; //文本的padding
    }
  
}

</style>