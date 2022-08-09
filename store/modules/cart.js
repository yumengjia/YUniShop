export default {
  namespaced:true,
  state:{
    cart:JSON.parse(uni.getStorageSync('cart') || '[]')
  },
  mutations:{
    ADDTOCART(state,goods){
      const fintResult = state.cart.find((x) => x.goods_id === goods.goods_id)
      if(!fintResult){
        state.cart.push(goods)
      }else{
        fintResult.goods_count++
      }
      // console.log(state.cart);
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    UPDATEGOODSSTATE(state,goods){
       const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
        // 有对应的商品信息对象
        if (findResult) {
          // 更新对应商品的勾选状态
          findResult.goods_state = goods.goods_state
          // console.log(findResult.goods_state,goods.goods_state);
          // 持久化存储到本地
          uni.setStorageSync('cart',JSON.stringify(state.cart))
        }
    },
    UPDATEGOODSCOUNT(state,goods){
     const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 有对应的商品信息对象
      if (findResult) {
        // 更新对应商品的勾选状态
        findResult.goods_count = goods.goods_count
        console.log(findResult.goods_count ,goods.goods_count);
        console.log(state.cart);
        // 持久化存储到本地
        uni.setStorageSync('cart',JSON.stringify(state.cart))
      }
    },
    REMOVEGOODSBYID(state,goods_id){
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    UPDATEALLGOODSSTATE(state,goods_state){
      state.cart.forEach(x => x.goods_state = goods_state)
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    }
  },
  actions:{},
  getters:{
    total(state){
 /*     let c = 0
      state.cart.forEach(goods => c += goods.goods_count )
      return c */
      return state.cart.reduce((total,item) => total += item.goods_count, 0)
    },
    checkedCount(state){
      return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count,0 )
    },
    checkedGoodsPrice(state){
      return state.cart.filter(x => x.goods_state)
                       .reduce((total,item) => total += item.goods_count*item.goods_price, 0)
                       .toFixed(2)
    }
  }
}