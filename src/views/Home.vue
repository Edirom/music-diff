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
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}


</style>
