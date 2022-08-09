export default {
  namespaced:true,
  state:{
    address:JSON.parse(uni.getStorageSync('address') || '{}'),
  },
  mutations:{
    UPDATEADDRESS(state,address){
      state.address = address
      uni.setStorageSync('address',JSON.stringify(address))
    }
  },
  actions:{},
  getters:{}
}