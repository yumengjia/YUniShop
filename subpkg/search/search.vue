<template>
	<view>
		<view class="search-box">
      <uni-search-bar @input="input"  :radius="100" cancelButton="none"></uni-search-bar>
		</view>
    <!-- 搜索建议列表-->
    <view class="sugg-list"  v-if="state.searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in state.searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box"  v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clearHistoryList"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in state.historyList" :key="i"  @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  import { reactive, onMounted } from 'vue'
	export default {
    setup() {
      const state = reactive({
        timer:null,
        keyValue:'',
        searchResults:[],
        historyList:[]
      })
      const getSearchList = async() => {
        if(state.keyValue.length===0){
          state.searchResults = []
          return null
        }
        const result = await uni.$http.get('/api/public/v1/goods/qsearch',{query:state.keyValue})
        if(result.data.meta.status !==200){
          return uni.$showMsg()
        }
        state.searchResults = result.data.message
        // console.log(state.seachResults);
        
        //保存搜索历史
        saveSearchHistory()
      }
      
      const input = (e) => {
        //防抖处理
        clearTimeout(state.timer)
        state.timer = setTimeout(()=>{
          state.keyValue = e
          getSearchList()
        },500)
        // console.log(state.historyList);
      }
      const gotoDetail = (goods_id) => {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      }
      
      const saveSearchHistory = () => {
        const index = state.historyList.indexOf(state.keyValue)
        if(index !== -1){
          state.historyList.splice(index,1)
        }
        state.historyList.unshift(state.keyValue)
        //持久化存储搜索历史
        uni.setStorageSync('searchList',JSON.stringify(state.historyList))
      }
      
    const clearHistoryList = () => {
        state.historyList = []
        uni.removeStorageSync('searchList')
      }
      
    const gotoGoodsList = (item) => {
       uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + item
        })
      }
      
      onMounted(()=>{
        state.historyList = JSON.parse(uni.getStorageSync('searchList') || '[]')
      })

    
      return {state, input, gotoDetail, clearHistoryList, gotoGoodsList }
    }
	}
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}


	
</style>
