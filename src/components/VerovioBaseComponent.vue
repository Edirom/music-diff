<template>
  <div id='svgContainer'></div>
</template>

<script>

let unwatch
let width
let height
let zoom = 35

export default {
  name: 'VerovioBaseComponent',
  components: {

  },
  created () {
    // this.setOptions() -> can't do this yet, because it depends on screen size, which isn't determined yet
    // this.$store.dispatch('fetchMEI')
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.setOptions()

    // initial Verovio rendering (when data available)
    if (this.$store.getters.currentMEI !== null) {
      this.loadMEI()
      this.renderPage(this.$store.getters.currentPage)
    }

    unwatch = this.$store.watch(
      (state, getters) => ({ page: getters.currentPage, zoom: getters.currentZoom, dataAvailable: (getters.currentMEI !== null)}),
      (newState, oldState) => {

        // render MEI as soon as it arrives from the API. This responds only for the first time a request has been made
        if (newState.dataAvailable && !oldState.dataAvailable) {
          this.loadMEI()
          this.renderPage(newState.page)
        }

        if (newState.page !== oldState.page) {
          // make verovio render the requested page
          this.renderPage(newState.page)
        }

        if (newState.zoom !== oldState.zoom && newState.dataAvailable) {
          // make verovio change the zoom level
          try {
            this.handleResize()
          } catch(err) {
            console.log('error: Unable to zoom: ' + err)
          }
          //console.log('done')

        }

      }
    )
  },
  updated () {
    // this.$store.dispatch('fetchMEI')
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    try {
      unwatch()
    } catch (err) {
      console.log('[ERROR] Unable to remove watcher: ' + err)
    }
  },
  methods: {
    setOptions: function () {

      let zooooom = this.$store.getters.currentZoom

      width = document.getElementById('analysis').clientWidth
      height = document.getElementById('analysis').clientHeight
      let internalWidth = (width - 20) * 100 / zooooom
      let internalHeight = (height - 20) * 100 / zooooom

      // console.log('\nsetting width to: ' + width + ', internal: ' + internalWidth)
      // console.log('setting height to: ' + height + ', internal: ' + internalHeight)

      let options = {
        scale: zooooom,
        footer: 'none', // takes out the 'rendered by Verovio' footer
        header: 'none', // takes out the work label at the top
        // breaks: 'none', -> continuous staff
        pageWidth: internalWidth,
        pageHeight: internalHeight,
        adjustPageHeight: true,
        spacingNonLinear: 1,
        spacingLinear: 0.05
        // svgViewBox: 1
      }
      try {
        this.$verovio.setOptions(options)
      } catch (err) {
        console.log('ERR: ' + err)
      }
    },
    loadMEI: function () {
      this.$verovio.loadData(this.currentMEI + '\n')
      let maxPage = this.$verovio.getPageCount()
      if(maxPage > 0) {
        this.$store.dispatch('setMaxPage',maxPage)
      }
    },
    renderPage: function (n) {
      // set listeners

      let svg = this.$verovio.renderToSVG(this.$store.getters.currentPage, {})
      let svgContainer = document.querySelector('#svgContainer')
      svgContainer.innerHTML = svg

      let outerSVG = document.querySelector('#svgContainer > svg')
      outerSVG.addEventListener('mousedown',this.startSelectionRect)
      // outerSVG.addEventListener('mousemove',this.updateSelectionRect)
      // outerSVG.addEventListener('mouseup',this.finishSelectionRect)
      // outerSVG.addEventListener('click',this.handleSelectionRect)
    },
    handleResize: function() {
      try {
        // make sure we have loaded a file
        if(this.$verovio.getPageCount() === 0) {
            return false
        }

        let oldPage = this.$store.getters.currentPage

        // get ID of first measure on current page
        let firstMeasureId = document.querySelector('#svgContainer .measure').id
        // update Verovio options
        this.setOptions()
        this.$verovio.redoLayout()

        //get new page with that measure
        let page = this.$verovio.getPageWithElement(firstMeasureId)

        //set new max page
        let newMaxPage = this.$verovio.getPageCount()
        if(newMaxPage > 0) {
          this.$store.dispatch('setMaxPage',newMaxPage)
        }
        if(oldPage === page) {
          // console.log('page stays the same')
          this.renderPage(page)
        } else {
          this.$store.dispatch('setPage',page)
        }
      } catch(err) {
          console.log('ERROR: Unable to redo Verovio layout: ' + err);
      }
    },

  },
  computed: {
    currentPage: function () {
      return this.$store.getters.currentPage
    },
    currentMEI: function () {
      return this.$store.getters.currentMEI
    },
    currentZoom: function() {
      return this.$store.getters.currentZoom
    }
  }
}
</script>

<style lang="scss">

  $selection1: #ff0000; /* red */
  $selection2: #0000ff; /* blue */
  $selection3: #228b22; /* forestgreen */
  $selection4: #c71585; /* mediumvioletred */
  $selection5: #ff8c00; /* darkorange */
  $selection6: #006400; /* darkgreen */
  $selection7: #b22222; /* firebrick */
  $selection8: #4682b4; /* steelblue */

  svg g.staff.hasSelections {
    .selected, .selected * {
      fill: $selection1;
      stroke: $selection1;
    }

    & ~ g.staff.hasSelections {
      .selected, .selected * {
        fill: $selection2;
        stroke: $selection2;
      }

      & ~ g.staff.hasSelections {
        .selected, .selected * {
          fill: $selection3;
          stroke: $selection3;
        }

        & ~ g.staff.hasSelections {
          .selected, .selected * {
            fill: $selection4;
            stroke: $selection4;
          }

          & ~ g.staff.hasSelections {
            .selected, .selected * {
              fill: $selection5;
              stroke: $selection5;
            }

            & ~ g.staff.hasSelections {
              .selected, .selected * {
                fill: $selection6;
                stroke: $selection6;
              }

              & ~ g.staff.hasSelections {
                .selected, .selected * {
                  fill: $selection7;
                  stroke: $selection7;
                }

                & ~ g.staff.hasSelections {
                  .selected, .selected * {
                    fill: $selection8;
                    stroke: $selection8;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
