<template>
  <view class="cart-container" v-if="state.cart.length !== 0">
    <!-- 收货地址组件-->
        <my-address></my-address>
        
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    
    <!-- 商品列表区域 -->

      <uni-swipe-action>
         <block v-for="(goods, i) in state.cart" :key="i">
            <uni-swipe-action-item :right-options="state.options" @click="swipeActionClickHandler(goods)">
              <my-goods :goods="goods" :showRadio="true" @radioChange="radioChangeHandler" @numChange="numChnageHandler" :showNum="true"></my-goods>
            </uni-swipe-action-item>
          </block>
      </uni-swipe-action> 
      
      <!-- 结算部分-->
      <my-settle></my-settle>
  </view>
  <!-- 购物车为空时的页面-->
   <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, onMounted, computed, watch } from 'vue' 
  export default {
    setup() {
      const store = useStore()
      const { getters } = useStore() 
      const state = reactive({
        cart:store.state.cart.cart || [],
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
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
      const radioChangeHandler = (e) => {
        // console.log(e);
        store.commit('cart/UPDATEGOODSSTATE',e)
        state.cart = store.state.cart.cart
      }
      const numChnageHandler = (e) => {
        // console.log(e);
        store.commit('cart/UPDATEGOODSCOUNT',e)
        state.cart = store.state.cart.cart
      }
      
      const swipeActionClickHandler = (goods) => {
        // console.log(goods.goods_id);
        store.commit('cart/REMOVEGOODSBYID',goods.goods_id)
        state.cart = store.state.cart.cart
      }
      
      const totalGoods = computed(() => {
        return getters['cart/total']
      })
      
      watch(totalGoods, function(newValue){
        setBadge()
      },{deep:true})
      
   onMounted(() => {
        setBadge()
        // console.log(state.cart);
      }) 
      
      return { state, radioChangeHandler, numChnageHandler, swipeActionClickHandler }
    }
    
  }
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}

</style>
