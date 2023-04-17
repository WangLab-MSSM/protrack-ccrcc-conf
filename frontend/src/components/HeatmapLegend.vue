<template>
  <div class="heatmap-legend">
    <div style="text-align: center; font-weight: bold;">Legend</div>
    <!-- <div style="text-align: center; font-weight: bold;">Interactive Legend</div>
    <div style="text-align: center;">Click buttons to hide/show samples.</div> -->
    <v-container>
      <v-row no-gutters>
        <v-col md="6">
          <heatmap-legend-element 
              v-for="(trackData, track) in col1"
              :key="track"
              :trackData="trackData"
              :track="track"
              :width="90"
          />
        </v-col>
        <v-col md="6">
            <heatmap-legend-element 
              v-for="(trackData, track) in col2"
              :key="track"
              :trackData="trackData"
              :track="track"
              :width="90"
          />
        </v-col>
      </v-row> 
    </v-container>
  </div>
</template>

<script>
import trackDetails from '../refs/trackDetails'
import HeatmapLegendElement from './HeatmapLegendElement.vue'

export default {
    components: { HeatmapLegendElement },
    name: "heatmap-legend",

    computed: {
        categoryTracks() { return this.$store.state.Heatmap_categoryTracksFiltered },
        trackDetails() { return this.$store.state.trackDetails },
        trackDetailsFiltered() {
          let res = {}
          Object.entries(this.categoryTracks).forEach(([category, categoryTracks]) => {
            if (category !== 'Ungrouped') { return }
            categoryTracks.forEach((categoryTrack) => {
              res[categoryTrack] = trackDetails[categoryTrack]
            })
          })
          return res
        }
    },

    data: () => ({
      col1: {},
      col2: {},
    }),

    mounted() {
      let trackDetailsFilteredKeys = Object.keys(this.trackDetailsFiltered)

      let col1KeysLength = trackDetailsFilteredKeys.length / 2
      let col1Keys = [...trackDetailsFilteredKeys].slice(0, col1KeysLength)
      let col2Keys = [...trackDetailsFilteredKeys].slice(col1KeysLength, trackDetailsFilteredKeys.length)

      let col1 = col1Keys.map(col => [col, this.trackDetailsFiltered[col]])
      let col2 = col2Keys.map(col => [col, this.trackDetailsFiltered[col]])

      this.col1 = Object.fromEntries(col1)
      this.col2 = Object.fromEntries(col2)
    }
}
</script>

<style>
.heatmap-legend {
    width: 100%;
    margin-top: 50px;
    min-width: 400px;
    pointer-events:none;
}
</style>