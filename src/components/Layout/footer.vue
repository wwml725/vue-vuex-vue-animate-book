<template>
  <div class="footer">
    <router-link to="/home">
      <i class="iconfont icon-shouye2"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/list">
      <i class="iconfont icon-liebiao"></i>
      <span>列表</span>
    </router-link>
    <router-link to="/collect">
      <i class="iconfont icon-shoucangjia1"></i>
      <span>收藏夹</span>
    </router-link>
    <router-link to="/add">
      <i class="iconfont icon-tianjiaadd143"></i>
      <span>添加</span>
    </router-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    created() {
    },
    methods: {},
    computed: {},
    components: {}
  }
</script>
<style scoped lang="less">
  .footer {
    a {
      border-right: 2px solid greenyellow;
      text-decoration: none;
      display: flex;
      color: black;
      flex-direction: column;
      flex: 1;
      align-items: center;
      justify-content: center;
      i {
        font-size: 20px;
      }
      span {
        font-size: 12px;
      }
      &:nth-child(4) {
        border-right: none;
      }
    }
    a.router-link-active {
      color: #ffaa21;
      background: rgba(244, 40, 47, 0.2);
    }
  }
</style>
