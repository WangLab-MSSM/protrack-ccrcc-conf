<template>
    <div class="sample-dashboard">
      <v-container>
        <v-row no-gutters>
          <v-col md="4">
            <barplotly 
              v-for="colTrack in col1"
              :key="colTrack"
              :divId="`barplot-${colTrack}`"
              :track="colTrack"
              :trackDetails="tracks"
            />
          </v-col>
          <v-col md="4">
              <barplotly 
                :key="colTrack"
                v-for="colTrack in col2"
                :divId="`barplot-${colTrack}`"
                :track="colTrack"
                :trackDetails="tracks"
            />
          </v-col>
            <v-col md="4">
              <barplotly 
                :key="colTrack"
                v-for="colTrack in col3"
                :divId="`barplot-${colTrack}`"
                :track="colTrack"
                :trackDetails="tracks"
            />
          </v-col>
        </v-row> 
      </v-container>
    </div>
</template>

<script>
  import trackDetails from '../refs/trackDetails'
  import Barplotly from './Barplotly.vue'

  export default {
    components: { Barplotly },
    name: "sample-dashboard",

    data: () => ({
      tracks: trackDetails,
      col1: [],
      col2: [],
      col3: [],
    }),
    
    computed: {
      trackList() { return this.$store.state.sampleDashboard_graphs },
      // barplotCategory() { return this.$store.state.barplotCategory },
      // trackDetails() { return this.$store.state.trackDetails }, 
      // graphs() { return this.$store.state.sampleDashboardGraphs },
    },

    watch: {
      trackList() {
        let allCols = [[], [], []]
        let i = 0
        this.trackList.forEach((track, j) => {
          if (i === 3) { i = 0 }
          allCols[i].push(track)
          i += 1
        })
        this.col1 = allCols[0]
        this.col2 = allCols[1]
        this.col3 = allCols[2]
      },
    },

    mounted() {
      let allCols = [[], [], []]
      let i = 0
      this.trackList.forEach((track, j) => {
        if (i === 3) { i = 0 }
        allCols[i].push(track)
        i += 1
      })
      this.col1 = allCols[0]
      this.col2 = allCols[1]
      this.col3 = allCols[2]
    }
  }

</script>

<style scoped>
    .sample-dashboard {
        width: 75%;
        min-width: 600px;
        display: flex;
        flex-direction: column;
        margin: 10px;
        padding-left: 10px;
        overflow: scroll;
    }

    .sample-dashboard-header {
      margin: 0 auto;
      font-size: 1.2em;
      font-weight: bold;
    }
</style>