<template>
  <div class="input-scatterplot-customize">
    <div v-if="genes.length > 0">
      <div style="margin-bottom: 20px; padding: 10px; background: #ebebeb">
        Choose data types for each gene
      </div>
      <v-autocomplete
        v-model="geneATrack"
        :items="geneATrackList"
        dense
        :label="`${geneA} data type (x axis)`"
      ></v-autocomplete>
      <v-autocomplete
        v-model="geneBTrack"
        :items="geneBTrackList"
        dense
        :label="`${geneB} data type (y axis)`"
      ></v-autocomplete>
      <v-btn
        elevation="2"
        color="indigo"
        dark
        :disabled="!valid"
        @click="setScatterplotTracks"
      > 
        Render scatterplot
      </v-btn>
    </div>
  <div
    v-if="submitted"
  >
    <v-switch
      v-model="useZScore"
      label="Use z-scores"
      color="red darken-3"
      hide-details
    ></v-switch>
    </div>
  </div>
</template>

<script>

export default {
    components: {  },
    
    name: "input-scatterplot-customize",

    computed: {
      genes() { return this.$store.state.Scatterplot_genes },
      geneA() { return this.genes[0] },
      geneB() { return this.genes[1] },
      geneATracks() {
        return Object.fromEntries(Object.entries(this.trackData).filter(([track, data]) => {
          return track.split(' ')[0] === this.geneA
        }))
      },
      geneATrackList() { return Object.keys(this.geneATracks) },
      geneBTracks() {
        return Object.fromEntries(Object.entries(this.trackData).filter(([track, data]) => {
          return data.gene === this.geneB
        }))
      },
      geneBTrackList() { return Object.keys(this.geneBTracks) },
      trackData() { 
        return this.$store.state.Scatterplot_data 
      },
      useZScore: {
        get() { return this.$store.state.Scatterplot_useZScore },
        set(v) { 
          this.$store.dispatch(
            'setUseZScore',
            { 
              view: 'Scatterplot',
              useZScore: v 
            }
          )}
      },
      valid() { return this.geneATrack.length > 0 && this.geneBTrack.length > 0 },
    },
    
    data: () => ({
      geneATrack: '',
      geneBTrack: '',
      submitted: false,
    }),

    methods: {
      setScatterplotTracks() {
        this.$store.dispatch('setScatterplotTracks', {
          Scatterplot_tracks: [ this.geneATrack, this.geneBTrack ] 
        })
        this.submitted = true
      },
    },

    watch: {
      trackData() {
        // const proteinTrackA = this.geneATrackList.find(el => el.includes('proteo'))
        // const proteinTrackB = this.geneBTrackList.find(el => el.includes('proteo'))

        // this.geneATrack = proteinTrackA ? proteinTrackA : this.geneATrackList[0]
        // this.geneBTrack = proteinTrackB ? proteinTrackB : this.geneBTrackList[0]

        // this.setScatterplotTracks()
      }
    },

    mounted() { 

    }
}
</script>

<style>
.input-scatterplot-customize {
    margin-top: 40px;
    padding: 10px;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.ttest-descriptor {
  width: 100%;
  margin: 10px;
  font-size: 0.8em;
}
</style>