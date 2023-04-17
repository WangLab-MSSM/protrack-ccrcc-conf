<template>
  <div class="heatmap-container">
    <div>
      <draggable tag="v-layout" v-model="draggableCards"
       class="heatmap-container-heatmaps"
      >
        <template v-for="trackGroup in trackGroups" >
          <v-card
            :key="trackGroup"
            elevation="0"
            class="mx-auto"
          >
            <div :id="generateDivId(trackGroup)">
            </div>
          </v-card>
        </template>
      </draggable>
    </div>
    <heatmap-legend />
  </div>
</template>

<script>
import heatmap from '../plotly/heatmap'
import HeatmapLegend from './HeatmapLegend.vue'
import draggable from 'vuedraggable'

export default {
    components: { 
      draggable, 
      HeatmapLegend 
    },
    name: "heatmap-container",

    props: ['view'],

    data() {
      return {
      }
    },

    computed: {
      categoryTracks() { return this.$store.state.Heatmap_categoryTracksFiltered },
      trackGroups() { return this.$store.state.Heatmap_trackGroups },
      draggableCards: {
        get() {
          return this.trackGroups
        },
        set(Heatmap_trackGroups) {
          this.$store.dispatch(
                'setHeatmapTrackGroups', 
                { Heatmap_trackGroups }
              )
        }
      },
      genes() { return this.$store.state.Heatmap_genes }, 
      shownDataTypes() { return this.$store.state.Heatmap_shownDataTypes },
      trackData() { return this.$store.state.Heatmap_data }, 
      sampleOrder() { return this.$store.state.Heatmap_sampleOrder }, 
    },

    watch: {
      categoryTracks() { this.renderHeatmap() },
      trackData() { this.renderHeatmap() },
      sampleOrder() { this.renderHeatmap() },
      shownDataTypes() { this.renderHeatmap() },
    },

    methods: {
      generateDivId(trackGroup) { return `plotly-heatmap-${trackGroup}` },
      renderHeatmap() {
        this.trackGroups.forEach((trackGroup) => {
          let plot = heatmap({
            categoryTracks: this.categoryTracks,
            trackGroup,
            genes: this.genes,
            trackData: this.trackData,
            sampleOrder: this.sampleOrder,
            shownDataTypes: this.shownDataTypes,
          })
  
          let that = this
          
          if (plot) {
            plot.on('plotly_hover', function(data) {
  
              const sample = data.points[0].x
              const track = data.points[0].y
  
              if (track in that.trackData) {
                const value = that.trackData[track].data[sample]
                data.points[0].fullData.hovertemplate = 
                  `${sample}<br>${track}: ${value}<br><extra></extra>`
              } else {
                data.points[0].fullData.hovertemplate = 
                  `<extra></extra>`
              }
            })
          }
        })
      }
    },
}
</script>

<style>
.heatmap-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow: scroll;
    margin-top: 30px;
}

.heatmap-container-heatmaps {
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>