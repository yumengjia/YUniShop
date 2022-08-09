import { createStore } from 'vuex'
import cart from '/store/modules/cart.js'
import user from '@/store/modules/user.js'
export default createStore({
  modules:{
    cart,
    user
  }
})