<template>
    <view>
      <my-search :bgcolor="'#c00000'" :radius="18" @myclick='goSearch'></my-search>
      <view class="scroll-view-container">
        <!-- 左侧的滚动视图区域 -->
        <scroll-view class="left-scroll-view" scroll-y :style="{height: state.wh + 'px'}">
          <view :class="['left-scroll-view-item',i===state.active?'active':'']" v-for="(item,i) in state.cateList" :key="i" @click="changeActive(i)">{{item.cat_name}}</view>
        </scroll-view>
        <!-- 右侧的滚动视图区域 -->
        <scroll-view class="right-scroll-view" scroll-y :scrollTop='state.scrollTop' :style="{height: state.wh + 'px'}">
           <view class="cate-lv2" v-for="(item2, i2) in state.cateLevel2" :key="i2">
              <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
               <!-- 动态渲染三级分类的列表数据 -->
                <view class="cate-lv3-list">
                  <!-- 三级分类 Item 项 -->
                  <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="goGoodsList(item3)">
                    <!-- 图片 -->
                    <image :src="item3.cat_icon"></image>
                    <!-- 文本 -->
                    <text>{{item3.cat_name}}</text>
                  </view>
                </view>
            </view>
        </scroll-view>
      </view>
    </view>
</template>

<script>
  import { reactive, onMounted } from 'vue'
  export default {
    setup(){
      const state = reactive({
      // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh:0,
        cateList:[],
        cateLevel2:[],
        active:0,
        scrollTop:0
      })
      
      const getCateList = async() => {
        const result = await uni.$http.get('/api/public/v1/categories')
        // console.log(result);
        if(result.data.meta.status !==200){
          return uni.$showMsg()
        }
        state.cateList = result.data.message,
        state.cateLevel2 = state.cateList[0].children
      } 
      const changeActive = (i) => {
        state.active = i
        state.cateLevel2 = state.cateList[i].children
        //让 scrollTop 的值在 0 与 1 之间切换
        //若scrollTop 改变前后的值相同（都为0）则不会滚动
        //这样虽然会有1px的偏差，但是用户感觉不出来
        state.scrollTop = state.scrollTop===0 ? 1 : 0
      }
      
      const goGoodsList = (item) => {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      }
      
      const goSearch = () => {
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
      
      onMounted(() => {
        const sysInfo = uni.getSystemInfoSync()
        state.wh = sysInfo.windowHeight - 50
        getCateList()
      })
      
      return { state, changeActive, goGoodsList, goSearch }
    }
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
  .left-scroll-view{
    width: 120px;
    .left-scroll-view-item{
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      
      &.active{
        background-color: #ffffff;
        position: relative;
        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  
  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }
  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;
  
    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
  
      image {
        width: 60px;
        height: 60px;
      }
  
      text {
        font-size: 12px;
      }
    }
  }
}
</style>
