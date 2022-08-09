<template>
  <view>
    <view class="goods-item">
      <!-- 左侧-->
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
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
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { reactive } from 'vue'
  export default {
    props:{
      goods:Object,
      showRadio:{
        type:Boolean,
        default:false
      },
      radioChange:{
        type:Function
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    // props:['goods','showRadio','radioChange','showNum'],
    name:"my-goods",
    setup(props,context) {
      const state = reactive({
        defaultImg:'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
      })
      
      const radioClickHandler = () => {
        // console.log(props.goods);
        context.emit('radioChange',{
          goods_id: props.goods.goods_id,
          goods_state:!props.goods.goods_state
        })
      }
      
      const numChangeHandler = (val) => {
        // console.log(val);
        context.emit('numChange',{
          goods_id:props.goods.goods_id,
          goods_count:val
        })
      }
      
      return {state, radioClickHandler, numChangeHandler}
    }
  }
</script>

<style lang="scss">
 .goods-item{
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    .goods-item-left{
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-pic{
        width: 100px;
        height: 100px;
        display: block;
        // margin-right: 5px;
      }
    }
    .goods-item-right{
      display: flex;
      flex: 1; //占满剩余区域
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .goods-price{
          color: #c00000;
          font-size: 16px;
        }
      }
    }
  }
</style>