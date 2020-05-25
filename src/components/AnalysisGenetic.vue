<template>
  <div id="analysisGenetic">
    <div id="svgContainer" class="geneticComparison"></div>
  </div>
</template>

<script>

import VerovioBaseComponent from './VerovioBaseComponent.vue'

export default {
  name: 'AnalysisGenetic',
  extends: VerovioBaseComponent,
  components: {

  },
  methods: {
    i18n: function(code) {
      return this.$i18n(code)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

$colorVariant1: #f51d1d;
$colorVariant2: #f51d1d; //#1bb723;
$neutralColor: #000000;
$fadedColor: #000000; //#999999;

#viewSettings {
  text-align: left;
  font-size: .7rem;
  display: inline-block;

  .fa-tint {
    &.id {
      color: $neutralColor;
    }
    &.deleted {
      color: $colorVariant1;
    }
    &.added {
      color: $colorVariant2;
    }
  }

  .viewSettingItem {
    display: inline-block;
    margin: 0 1rem 0 0;
  }
}

#analysisGenetic {
  flex: 1 1 auto;
  align-self: stretch;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  height: 100%;
  overflow: hidden;

  #svgContainer {
    overflow: auto;
  }
}

#analysisGenetic svg {

  svg .layer, svg .clef, svg .keySig, svg .meterSig, svg .dynam, svg .dir, svg .barLineAttr, svg .staff > path, svg .slur > path {
    fill: $fadedColor;
    stroke: $fadedColor;
  }

  .file1 {
    .ts, .od, .sd, .os, .noMatch {
      fill: $colorVariant1;
      stroke: $colorVariant1;

      .accid {
        fill: $colorVariant1;
        stroke: $colorVariant1;
      }

      &.id {
        fill: $neutralColor;
        stroke: $neutralColor;

        .accid {
          fill: $neutralColor;
          stroke: $neutralColor;
        }
      }
    }
  }

  .file2 {
    .ts, .od, .sd, .os, .noMatch {
      fill: $colorVariant2;
      stroke: $colorVariant2;

      .accid {
        fill: $colorVariant2;
        stroke: $colorVariant2;
      }

      &.id {
          fill: $neutralColor;
          stroke: $neutralColor;

          .accid {
            fill: $neutralColor;
            stroke: $neutralColor;
          }
      }
    }
  }
}
</style>
