<template>
  <div class="app-wrapper">
    <headerBar class="header" :title="title"></headerBar>
    <transition name="fadeIn">
      <!-- main -->
      <router-view class="main-container"></router-view>
    </transition>
    <footerBar class="footer"></footerBar>

  </div>
</template>
<script>
  import headerBar from "./header.vue"
  import footerBar from "./footer.vue"

  export default {
    name: "layout",
    data() {
      return {msg: 'hello'}
    },
    created() {
      console.log(this.$route.name);
    },
    methods: {},
    computed: {
      title: function () {
        // `this` 指向 vm 实例
        return this.$route.name
      }

    },
    components: {
      headerBar,
      footerBar
    }
  }
</script>
<style lang="less" scoped>
  .app-wrapper {
    width: 100%;
    height: 100%;
    border: 2px solid #131313;
    box-sizing: border-box;
    position: absolute;

    .header {
      position: absolute;
      left: 0;
      top: 0;

      height: 40px;
      width: 100%;
      background-color: #cc0031;
      text-align: center;
      line-height: 40px;
      font-size: 18px;

    }

    .main-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 50px;
      /*overflow: hidden;*/

      border: 2px solid greenyellow;
      background-color: #ffffff;

      /*overflow: hidden;*/
    }

    .footer {
      position: absolute;
      left: 0;
      bottom: 0;

      width: 100%;
      height: 50px;
      background-color: #f4f4f4;
      border-top: 1px solid #ccc;
      display: flex;
    }

    /*动画效果*/
    .fadeIn-enter, .fadeIn-leave-to {
      opacity: 0;
    }

    .fadeIn-enter-active {
      transition: all .5s linear;
    }

    .fadeIn-leave-active {
      transition: all .3s linear;
      opacity: 0;
    }
  }
</style>
