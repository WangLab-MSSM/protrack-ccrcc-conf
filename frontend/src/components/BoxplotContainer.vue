<template>
  <div class="boxplot-container">
    <!-- here is the boxplot container
    trackData: {{ k_track_v_boxplotDataKeys }} -->
    <div v-if="trackData">
      <boxplot 
        v-for="(dataKeys, track) in k_track_v_boxplotDataKeys"
        :key="track"
        :track="track" 
        :trackData="trackData"
        :dataKeys="dataKeys"
        :useZScore="useZScore"
      />
    </div>
    <!-- <div v-if="genes && genes.length > 0">
      <boxplot v-for="gene in genes" :key="gene" :tracks="tracks" />
    </div> -->
  </div>
</template>

<script>
import Boxplot from './Boxplot.vue'

export default {
    components: { Boxplot },
    name: "boxplot-container",

    props: ['view'],

    data: () => ({
    }),
    
    computed: {
        useZScore() { return this.$store.state.Boxplot_useZScore },
        boxplotDataType() { return this.$store.state.Boxplot_dataType },
        k_track_v_boxplotDataKeys() { 
          let res = {}

          this.genes.forEach(gene => {
            let geneTracks

            if (this.boxplotDataType == 'All') {
              geneTracks = Object.entries(this.trackData)
                .filter(([, data]) => !data.clinical && data.gene === gene )
            } else {
              geneTracks = Object.entries(this.trackData)
                .filter(([, data]) => 
                  !data.clinical && 
                  data.gene === gene && 
                  data.dataType === this.boxplotDataType 
                )
            }
            geneTracks.forEach(([track, data]) => {
              if (!(data.parent in res)) { res[data.parent] = [] }
              res[data.parent].push(track)
            })
          })

          return res
        },
    //     boxplotDataType() { return this.$store.state.boxplotDataType },
    //     boxplotView() { return this.$store.state.boxplotView },
        genes() { return this.$store.state[`${this.view}_genes`] },
        trackDataNormalized() {return this.$store.state.Boxplot_data },
        trackDataRaw() {return this.$store.state.Boxplot_data_raw },
        trackData() { return this.useZScore ?
          this.trackDataNormalized :
          this.trackDataRaw
        },
    //     k_dataType_v_tracks() { 
    //       if (!this.k_gene_v_tracks) { return null }
    //       let dataTypes = {
    //         'proteo': [],
    //         'rna': [],
    //         'phospho': [],
    //         'glyco_glyco': [],
    //         'phospho_glyco': []
    //       }
    //       Object.keys(dataTypes).forEach((dataType) => {
    //         Object.entries(this.k_gene_v_tracks).forEach(([, tracks]) => {
    //           tracks.forEach((track) => {
    //             if (track.split(' ')[1] === dataType) {
    //               dataTypes[dataType].push(track)
    //             }
    //           })
    //         })
    //       })

    //       return dataTypes
    //     },
    //     tracks() { 
    //       if (!this.k_gene_v_tracks) { return [] }

    //       if (this.boxplotView === 'byGene') {
    //           return this.k_gene_v_tracks[this.boxplotGene]
    //       }

    //       if (this.boxplotView === 'byDataType') {
    //         return this.k_dataType_v_tracks[this.boxplotDataType]
    //       }

    //       return []
    //     },
    },
    mounted() {
    },
  }
</script>

<style>
.boxplot-container {
    width: 100%;
}
</style>