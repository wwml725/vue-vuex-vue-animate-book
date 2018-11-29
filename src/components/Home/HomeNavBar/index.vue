<template>
  <div class="home-bar">
    <swiper class="navSwiper" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide class="navSlider" v-for="(item,index) in navSlider" :key="index">{{item}}</swiper-slide>
    </swiper>

    <div class="family item2" @click="">+</div>
  </div>
</template>
<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          slidesPerView: 6,
          freeMode: true,
        },
        navSlider: ["推荐", "视频", "热点", "社会", "娱乐", "军事", "科技", "汽车", "体育", "财经",]
      }
    },
    computed: {},
    mounted() {
    }
  }
</script>
<style scoped lang="less">
  .navSwiper {
    width: 100%;
    height: 30px;
    background-color: #f4f4f4;
    line-height: 30px;
    border-bottom: 1px solid #c0aabd;
    .navSlider {
      text-align: center;
    }
  }

  .item2 {
    width: 10%;
    height: 30px;
    border: 1px solid red;
    box-sizing: border-box;

    color: red;
    font-size: 30px;
    line-height: 25px;
    background-color: #cdcdcd;

  }

</style>
