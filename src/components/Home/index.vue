<template>
  <div class="home-wrapper">
      <HomeNavBar/>
    <div class="home-slider-page">

    </div>
  </div>
</template>
<script>
  import HomeNavBar from "./HomeNavBar/index.vue"

  export default {
    data() {
      return {msg: 'hello'}
    },
    created() {
    },
    methods: {},
    computed: {},
    components: {
      HomeNavBar,


    }
  }


</script>

<style scoped lang="less">
  .home-wrapper {
    /*height:100%;*/
    /*width:100%;*/
    background-color: #3ff428;
    .home-bar {
      display: flex;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #ffffff;
    }

    .home-slider-page {
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      bottom: 0;

      background-color: #f4f4f4;

    }
    .active {
      color: #cc0031;
    }
  }

  /*.swiper-mask {*/
  /*background-color: #f4f4f4;*/
  /*}*/
</style>
