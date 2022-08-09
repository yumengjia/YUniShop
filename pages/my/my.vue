<template>
  <view class="my-container">
    <!-- 用户未登录时，显示登录组件 -->
      <my-login v-if="!token"></my-login>
  
      <!-- 用户登录后，显示用户信息组件 -->
      <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import { useStore } from 'vuex'
  import { reactive, computed, onMounted, watch } from 'vue'
  export default {
    setup() {
      const store = useStore()
      const {getters} = useStore()
      const state = reactive({
        
      })
      
      const token = computed(() => {
        return store.state.user.token
      })
      
      const setBadge = () => {
        console.log('11111');
        console.log(getters['cart/total'] + '');
        console.log('111111');
        uni.setTabBarBadge({
          index:2,
          //text的值只能是字符串，不能是数字
          text:getters['cart/total'] + ''  //加空字符串的目的是将text的值转化为字符串
        })
      } 
      const totalGoods = computed(() => {
        return getters['cart/total']
      })
      watch(totalGoods, function(newValue){
        setBadge()
      },{deep:true})
      
      onMounted(() => {
        setBadge()
      }) 
      
      return {state, token }
      
    }
    
  }
</script>

<style lang="scss">
/* page,
.my-container {
  height: 100%;
} */

</style>
