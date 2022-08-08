<template>
  <view>
    <view class="goods-item">
      <!-- 左侧-->
      <view class="goods-item-left">
        <image :src="goods.goods_small_logo || state.defaultImg" mode="" class="goods-pic"></image>
      </view>
      <!-- 右侧-->
      <view class="goods-item-right">
        <view class="goods-name">
          {{goods.goods_name}}
        </view>
        <view class="goods-info-box">
          <view class="goods-price">
            ￥{{goods.goods_price.toFixed(2)}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { reactive } from 'vue'
  export default {
    props:['goods'],
    name:"my-goods",
    setup() {
      const state = reactive({
        defaultImg:'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF'
      })
      
      return {state}
    }
  }
</script>

<style lang="scss">
 .goods-item{
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    .goods-item-left{
      .goods-pic{
        width: 100px;
        height: 100px;
        display: block;
        margin-right: 5px;
      }
    }
    .goods-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        .goods-price{
          color: #c00000;
          font-size: 16px;
        }
      }
    }
  }
</style>