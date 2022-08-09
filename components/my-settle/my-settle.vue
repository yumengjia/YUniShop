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
        <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
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
        seconds:3,//倒计时
        timer:null
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
      
  /*    const addstr = computed(() => {
        return store.state.user.address
      }) */
       
      const token = computed(() => {
         return store.state.user.token
      })
      const changeAllState = () => {
        store.commit('cart/UPDATEALLGOODSSTATE', !isAllChecked.value)
      }
      
      const settlement = () => {
        const address = store.state.user.address
        if(checkedCount.value===0) return uni.$showMsg('请选择要结算的商品！')
        if(!address.userName) return uni.$showMsg('请选择收货地址！')
        if(!token.value) {
          return delayNavigate()
        }
        payOrder()
      }
      const delayNavigate = () => {
        state.seconds = 3
        showTips(state.seconds)
        state.timer = setInterval(() => {
          state.seconds--
          if(state.seconds <= 0){
            clearInterval(state.timer)
            uni.switchTab({
              url:'/pages/my/my',
              success: () => {
                store.commit('user/UPDATEREDIRECTINFO',{
                  openType:'switchTab',
                  from:'/pages/cart/cart'
                })
              }
            })
            return 
          }
          showTips(state.seconds)
        },1000)
      }
      
      const showTips = (n) => {
        uni.showToast({
          icon:'none',
          title:'请登录后再结算，'+ n +'秒后自动跳转到登录页面',
          mask:true,
          duration:1500
        })
      }
      
      const payOrder = () => {
        uni.showToast({
          icon:'none',
          title:'该功能正在开发中...'
        })
        // 1. 创建订单
        // 1.1 组织订单的信息对象
        /* const orderInfo = {
          // order_price: totalPrice,
          order_price: 0.01,
          consignee_addr: store.state.user.address.detailInfoNew,
          goods: store.state.cart.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
        }
        // 1.2 发起请求创建订单
        const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        console.log(res);
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        // 1.3 得到服务器响应的“订单编号”
        const orderNumber = res.message.order_number
      
        // 2. 订单预支付
         // 2.1 发起请求获取订单的支付信息
         const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
         // 2.2 预付订单生成失败
         if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
         // 2.3 得到订单支付相关的必要参数
         const payInfo = res2.message.pay
         
          // 3. 发起微信支付
            // 3.1 调用 uni.requestPayment() 发起微信支付
            const [err, succ] = await uni.requestPayment(payInfo)
            // 3.2 未完成支付
            if (err) return uni.$showMsg('订单未支付！')
            // 3.3 完成了支付，进一步查询支付的结果
            const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
            // 3.4 检测到订单未支付
            if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
            // 3.5 检测到订单支付完成
            uni.showToast({
              title: '支付完成！',
              icon: 'success'
            }) */
          
      }
      
      return { state, checkedCount, isAllChecked, changeAllState, totalPrice, settlement}
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