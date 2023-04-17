<template>
  <div class="scatterplot">
    <div v-if="tracks.length === 0" style="width: 70%; margin: 10px; background: #ebebeb; padding: 20px;">
      Select genes and data types on the left to generate a scatterplot.
    </div>
    <div :id="divId">
    </div>
  </div>
</template>

<script>
import scatterplot from '../plotly/scatterplotly'

export default {
    name: "scatterplot",

    data: () => ({
    }),
    
    computed: {
      divId() { return 'test' },
      trackA() { return this.trackData[this.tracks[0]] },
      trackB() { return this.trackData[this.tracks[1]] },
      tracks() { return this.$store.state.Scatterplot_tracks },
      useZScore() { return this.$store.state.Scatterplot_useZScore },
      trackDataNormalized() { return this.$store.state.Scatterplot_data },
      trackDataRaw() { return this.$store.state.Scatterplot_data_raw },
      trackData() { return this.useZScore ? 
        this.trackDataNormalized 
        : this.trackDataRaw 
      },
    },

    watch: {
      tracks() { this.renderScatterplot() },
      trackData() { this.renderScatterplot() },
    },

    methods: {
      renderScatterplot() {
        scatterplot({
          divId: this.divId,
          trackA: this.trackA,
          trackB: this.trackB,
          useZScore: this.useZScore,
        })
      },
    },

    mounted() {

    },
  }
</script>

<style>
.scatterplot {
    width: 100%;
}
</style>