<template>
  <div class="scatterplot-container">
    <scatterplot />
  </div>
</template>

<script>
import Scatterplot from './Scatterplot.vue'

export default {
    components: { Scatterplot },

    name: "scatterplot-container",

    props: ['view'],

    data: () => ({
    }),
    
    computed: {
      // normalTracks() {
      //   return Object.fromEntries(Object.entries(this.trackData).filter(([track, data]) => {
      //     return data.tissue === 'normal'
      //   }))
      // },
      // tumorTracks() {
      //   return Object.fromEntries(Object.entries(this.trackData).filter(([track, data]) => {
      //     return data.tissue === 'tumor'
      //   }))
      // },
      // combinedTracks() {},
    },

    mounted() {
    },
  }
</script>

<style>
.scatterplot-container {
    width: 100%;
}
</style>