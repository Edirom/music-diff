<template>

  <div class="home">

    <div v-if="hasMEI" id="fullBox">
      <NavigationTop/>
      <Analysis/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Analysis from '@/components/Analysis.vue'
import NavigationTop from '@/components/NavigationTop.vue'
import Intro from '@/components/Intro.vue'

export default {
  name: 'home',
  components: {
    Analysis,
    NavigationTop,
    Intro
  },
  computed: {
    introVisible: function() {
      return this.$store.getters.introVisible;
    },
    lang: function() {
      return this.$store.getters.language
    },
    hasMEI: function() {
      return this.$store.getters.currentMEI !== null
    }
  },
  methods: {
    i18n: function(code) {
      return this.$i18n(code)
    }
  }
}
</script>

<style scoped lang="scss">

#fullBox {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: absolute;
  top: 62.5px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  #navigationBox {
    background-color: #f5f5f5;
    border-right: 0.5px solid #666666;
    padding: 0.5rem 1rem;
    flex: 0 0 360px;
    align-self: stretch;
    overflow: auto;
  }

  #contentBox {
    flex: 1 1 auto;
    align-self: stretch;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    width: calc(100% - 360px);

    .toast {
      width: unset;
      margin: 3rem;
    }
  }

}


</style>
