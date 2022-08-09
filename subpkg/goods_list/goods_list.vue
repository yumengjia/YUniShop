<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods,i) in state.goodsList" :key="i" @click="goDetail(goods)">
       <my-goods :goods='goods' :showRadio="false"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';
import { reactive, onMounted } from 'vue'
  export default {
    props:['query','cid'],
    setup(props) {
      const state = reactive({
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodsList:[],
        total:0,
        isLoading:false, //节流阀
      })
      
      const getGoodsList = async(cb) => {
        state.isLoading = true
        const result = await uni.$http.get('/api/public/v1/goods/search',state.queryObj)
        state.isLoading = false
        cb && cb()  //关闭下拉刷新
        if(result.data.meta.status !==200){
          return uni.$showMsg()
        }
        state.goodsList = [...state.goodsList,...result.data.message.goods]
        state.total = result.data.message.total
      }
      //上拉触底
      onReachBottom(()=>{
        if(state.queryObj.pagenum * state.queryObj.pagesize >= state.total){
          return uni.$showMsg('数据加载完毕')
        }
        if(state.isLoading) return
        state.queryObj.pagenum = state.queryObj.pagenum + 1
        getGoodsList()
      })
      
      //下拉刷新
      onPullDownRefresh(() => {
        state.queryObj.pagenum = 1
        state.total = 0
        state.isLoading = false
        state.goodsList = []
        getGoodsList(() => uni.stopPullDownRefresh())
        
      })
      
      const goDetail = (goods) => {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
      
      onMounted(() => {
        state.queryObj.query = props.query || ''
        state.queryObj.cid = props.cid || ''
        getGoodsList()
      })
      
      return { state, goDetail }
    }

   
  }
</script>

<style lang="scss">
.goods-list{
 
}
</style>
