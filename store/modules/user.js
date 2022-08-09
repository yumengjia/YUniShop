export default {
  namespaced:true,
  state:{
    address:JSON.parse(uni.getStorageSync('address') || '{}'),
    token:uni.getStorageSync('token') || '',
    userInfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    redirectInfo:null
  },
  mutations:{
    UPDATEADDRESS(state,address){
      state.address = address
      uni.setStorageSync('address',JSON.stringify(address))
    },
    UPDATEUSERINFO(state,userInfo){
      state.userInfo = userInfo
      uni.setStorageSync('userinfo',JSON.stringify(state.userInfo))
      
    },
    UPDATETOKEN(state,token){
      state.token = token
      uni.setStorageSync('token',state.token)
    },
    UPDATEREDIRECTINFO(state,info){
      state.redirectInfo = info
    }
  },
  actions:{},
  getters:{}
}