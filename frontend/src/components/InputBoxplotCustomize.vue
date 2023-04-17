<template>
  <div class="input-boxplot-customize">

    <div>
      <v-select
        :items="dataTypes"
        item-value="dataType"
        item-text="text"
        label="Data type:"
        v-model="boxplotDataType"
      >
      </v-select>
    </div>

    <div class="stratify-by">
      <v-switch
        v-model="stratify"
        :label="`Stratify by clinical variable`"
      ></v-switch>
      <div class="stratify-by-selector" v-if="stratify">
          <v-autocomplete
            :items="stratifyByOptions"
            label="Clinical feature to stratify by:"
            v-model="stratifyBy"
          ></v-autocomplete>
      </div>
    </div>

    <div>
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
    name: "input-boxplot-customize",

    computed: {
      boxplotDataType: {
        get() { return this.$store.state.Boxplot_dataType },
        set(Boxplot_dataType) { this.$store.dispatch(
          'setBoxplotDataType', 
          { Boxplot_dataType }
        )}
      },
      categoryTracks() { return this.$store.state.Heatmap_categoryTracks },
      stratifyBy: {
        get() { return this.$store.state.Boxplot_stratifyBy },
        set(Boxplot_stratifyBy) { this.$store.dispatch('setBoxplotStratifyBy', { Boxplot_stratifyBy }) }
      },
      stratifyByOptions() {        
        return Object.values(this.categoryTracks).flat().filter(track => !this.categoryTracks.Numerical.includes(track))
      },
      useZScore: {
        get() { return this.$store.state.Boxplot_useZScore },
        set(v) { 
          this.$store.dispatch(
            'setUseZScore',
            { 
              view: 'Boxplot',
              useZScore: v 
            }
          )}
      },
    },
    
    data: () => ({
      dataTypes: ['All', 'proteo', 'rna', 'phospho', 'glyco_glyco', 'phospho_glyco'],
      stratify: false,
    }),

    methods: {
    },
}
</script>

<style>
.input-boxplot-customize {
    margin: 10px;
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
</style>