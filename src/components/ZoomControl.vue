<template>
    <span id="zoomControl" class="input-group navigationTopItem">
      <button class="btn btn-primary btn-sm btn-action input-group-btn" v-on:click="decreaseZoom()"><i class="fas fa-minus"></i></button>
      <input class="zoomnum form-input input-sm" type="text" pattern="\d+%" v-model="zoomModel">
      <button class="btn btn-primary btn-sm btn-action input-group-btn" v-on:click="increaseZoom()"><i class="fas fa-plus"></i></button>
    </span>
</template>

<script>

export default {
  name: 'ZoomControl',
  components: {

  },
  computed: {
    currentZoom: function () {
      return this.$store.getters.currentZoom
    },
    zoomModel: {
      get () {
        return this.$store.getters.currentZoom + '%'
      },
      set (n) {
        let num = parseInt(n,10)
        this.$store.dispatch('setZoom', num)
      }
    }
  },
  methods: {
    decreaseZoom () {
      this.$store.dispatch('decreaseZoom')
    },
    increaseZoom () {
      this.$store.dispatch('increaseZoom')
    },
    setZoom (n) {
      this.$store.dispatch('setZoom', n)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#zoomControl {
  .zoomnum {
    text-align: center;
    width: 3rem;
  }
}
</style>
