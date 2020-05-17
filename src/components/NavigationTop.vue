<template>
    <div id="navigationTop" class="navbar">
      <section class="navbar-section">
        <SunburstButton/>
        <PageNavigation/>
        <ZoomControl/>
      </section>

      <section class="navbar-section">

      </section>
    </div>
</template>

<script>

import SunburstButton from '@/components/SunburstButton.vue'
//import GotoMeasureButton from '@/components/GotoMeasureButton.vue'
import PageNavigation from '@/components/PageNavigation.vue'
import ZoomControl from '@/components/ZoomControl.vue'

export default {
  name: 'NavigationTop',
  components: {
    SunburstButton,
    PageNavigation,
    ZoomControl
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  div#navigationTop {
    flex: 0 0 auto;
    background-color: #f5f5f5;
    border-bottom: .5px solid #999999;
    padding: 10px 20px;

    #openAboutBtn {
      margin-right: 1em;
      opacity: .6;
      font-size: 1em;
      font-weight: 100;
      text-align: right;
    }

    .navigationTopItem {
      margin-right: .8rem;
    }

}

</style>
