<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="handleClick">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <icon type="search" size="17"></icon>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  import {onMounted} from 'vue'
  export default {
    name:"my-search",
    props:['bgcolor','radius'],
    setup(props,context) {
      
      const handleClick = () => {
        context.emit('myclick')
      }
      
      return { handleClick }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
   // background-color: #c00000;
   display: flex;
   align-items: center;
   padding: 0 10px;
  .my-search-box{
   height: 36px;
   width: 100%;
   background-color: #ffffff;
   // border-radius: 18px;
   display: flex;
   justify-content: center;
   align-items: center;
   .placeholder{
     font-size: 15px;
     margin-left: 5px;
   }
  }
}
</style>