<template>
  <view class="login-container">
      <!-- 提示登录的图标 -->
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <!-- 登录按钮 -->
      <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
      <!-- 登录提示 -->
      <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import { useStore } from 'vuex'
  export default {
    name:"my-login",
    setup() {
      const store = useStore()
      const getUserProfile = () => {
        wx.getUserProfile({
          desc:'用于完善会员资料',
          success(res) {
            // console.log('1',res);
            store.commit('user/UPDATEUSERINFO',res.userInfo)
            getToken(res)
          },
          fail(err) {
            uni.$showMsg('您取消了登录授权！')
          }
        })
      }
      
      const getToken = async(info) => {
        const result = await uni.login()
        // console.log(result);
        if(result.errMsg !== "login:ok") return uni.$showError('登录失败！')
        const query = {
          code: result.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // console.log(query);
        
        const res2 = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        /* if(res2.data.meta.status !==200) return uni.$showMsg('登录失败！')
         uni.$showMsg('登录成功') */
         uni.$showMsg('登录成功')
         let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o'
         store.commit('user/UPDATETOKEN',token)
         
        navigateBack()
      }
      const navigateBack = () => {
        const redirectInfo = store.state.user.redirectInfo
        if(redirectInfo && redirectInfo.openType === 'switchTab'){
          uni.switchTab({
            url:redirectInfo.from,
            complete: () => {
              store.commit('user/UPDATEREDIRECTINFO',null)
            }
          })
        }
      }
      
      return { getUserProfile }
    }
  }
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}

</style>