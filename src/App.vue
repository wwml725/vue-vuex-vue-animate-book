<template>
  <div id="app">
    <transition :name="animate1">
      <router-view id="view"/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        animate1: ''
      }
    },
    watch: {
      $route (to, from) {
        /*
        0: 不做动画
        1: 左切换
        2: 右切换
        3: 上切换
        4: 下切换
         */
        let animate1 = this.$router.animate1 || to.meta.slide;
        if (!animate1) {
          this.animate1 = ''
        }else{
          this.animate1 = animate1 === 1 ?  'slide-left' :
            animate1 === 2 ?  'slide-right' :
              animate1 === 3 ?  'slide-top' :
                animate1 === 4 ?  'slide-bottom' : ''
        }
        this.$router.animate1 = 0
      }
    },

  }
</script>

<style lang="less" scoped>
  #app {
    width: 100%;
    height: 100%;
  }

  #view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);

  }

  /////////////////////
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-100%, 0);

  }

  .slide-top-enter,
  .slide-bottom-leave-active {
    opacity: 0;
    transform: translate(0, 100%);

  }

  .slide-top-leave-active,
  .slide-bottom-enter {
    opacity: 0;
    transform: translate(0, -100%);

  }



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

</style>
