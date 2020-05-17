<template>
  <div id="analysis">
    <SunburstPane v-if="sunburstVisible"/>
    <GotoMeasurePane v-if="gotoMeasureVisible"/>

    <AnalysisGenetic/>
  </div>
</template>

<script>

import AnalysisGenetic from '@/components/AnalysisGenetic.vue'
import SunburstPane from '@/components/SunburstPane.vue'
import GotoMeasurePane from '@/components/GotoMeasurePane.vue'

export default {
  name: 'Analysis',
  components: {
    AnalysisGenetic,
    SunburstPane,
    GotoMeasurePane
  },
  computed: {
    sunburstVisible: function() {
      return this.$store.getters.sunburstVisible
    },
    gotoMeasureVisible: function() {
      return this.$store.getters.gotoMeasureVisible
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#analysis {
  flex: 1 1 auto;
  overflow: auto;
  position: relative;
}
</style>
