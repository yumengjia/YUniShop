<template>
  <view  v-if="state.goods_info.goods_name" class="goods-detail">
    <!-- 轮播图区域-->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in state.goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    
    <!-- 商品信息区域-->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{state.goods_info.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{state.goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    
    <!-- 商品详细信息-->
    <rich-text :nodes="state.goods_info.goods_introduce"></rich-text>
    
    <!-- 底部导航区域-->
    <view class="goods-carts">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import { reactive, onMounted } from 'vue'
  export default {
    props:['goods_id'],
    setup(props) {
      const state = reactive({
        goods_info:{},
        options: [{
            icon: 'shop',
            text: '店铺',
          }, {
            icon: 'cart',
            text: '购物车',
            info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
            color: '#fff'
          }
        ],
      })
      
      const getGoodsDetail = async(goods_id) => {
        const result = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
        console.log(result);
        if(result.data.meta.status !==200){
          return uni.$showMsg()
        }
          // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
          //解决 .webp 格式图片在 ios 设备上无法正常显示的问题：将 webp 的后缀名替换为 jpg 的后缀名
          result.data.message.goods_introduce = result.data.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
        state.goods_info= result.data.message
      }
      
      //轮播图预览
      const preview = (i) => { 
        uni.previewImage({ 
          current:i,
          urls:state.goods_info.pics.map(x => x.pics_big)
        })
      }
      
      const onClick = (e) => {
        console.log(e);
        if(e.content.text === '购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      }
      
        
      const buttonClick = (e) => {
      }
      
      
      onMounted(() => {
        getGoodsDetail(props.goods_id)
      })
      
      return { state, preview, onClick, buttonClick, buttonClick }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
// 商品信息区域的样式
.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
.goods-detail{
  padding-bottom: 50px;
  .goods-carts{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}


</style>
