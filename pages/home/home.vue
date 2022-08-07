<template>
  <view>
    <view class="search-box">
      <my-search :bgcolor="'#c00000'" :radius="18" @myclick='goSearch'></my-search>
    </view>
    <!-- 轮播图区域-->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,i) in state.swiperList" :key="i">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    
    <!-- 分类导航区域-->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in state.categoryList" :key="i" @click="navClickHandler(item)">
        <image class="nav-img" :src="item.image_src" mode=""></image>
      </view>
    </view>
  </view>
  
  <!-- 楼层区域-->
  <view class="floor-list">
    <view class="floor-item" v-for="(item,i) in state.floorList" :key="i">
      <image class="floor-title" :src="item.floor_title.image_src" ></image>
      <view class="floor-img-box">
        <!-- 左侧大图片的盒子 -->
        <navigator class="left-img-box" :url="item.product_list[0].url">
          <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
        </navigator>
        <!-- 右侧 4 个小图片的盒子 -->
        <view class="right-img-box">
          <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-show="i2 !== 0" :url="item2.url">
            <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
          </navigator>
        </view>
      </view>
    </view>
    
  </view>
  
</template>

<script>
  import { reactive, onMounted} from 'vue'
  export default {
    setup() {
      const state = reactive({
        swiperList:[],
        categoryList:[],
        floorList:[]
      });
    
      const getSwiperList = async() => {
        const result = await uni.$http.get('/api/public/v1/home/swiperdata')
        // console.log(result.data.message);
        if(result.data.meta.status !==200){
          return uni.$showMsg()
        }
        state.swiperList = result.data.message
      }
      const getCategoryList = async() => {
        const result = await uni.$http.get('/api/public/v1/home/catitems')
        if(result.data.meta.status !==200){
          return uni.$showMsg()
        }
        state.categoryList = result.data.message
      }
      const getFloorList = async() => {
        const result = await uni.$http.get('/api/public/v1/home/floordata')
        if(result.data.meta.status !==200){
          return uni.$showMsg()
        }
        //数据处理
        result.data.message.forEach(floor => {
          floor.product_list.forEach(item => {
            item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
          })
        })
        state.floorList = result.data.message
       
      }
      
      const navClickHandler = (item) => {
        if(item.name === '分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      }
      
      const goSearch = () => {
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
      
      onMounted(()=>{
        getSwiperList()
        getCategoryList()
        getFloorList()
      })
      
      return { state, navClickHandler, goSearch }
    }
  }
</script>

<style lang="scss">
.search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
swiper{
  height: 330rpx;
  .swiper-item, image{
    width: 100%;
    height: 100%;
  }
}
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
  .nav-img{
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title{
  height: 60rpx;
  width: 100%;
  display: flex;
}
.floor-img-box{
  display: flex;
  padding-left: 10rpx;
}
.right-img-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
