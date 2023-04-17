<template>
  <div class="input-heatmap-selector">
    <div style="height: 0px; display: none">{{ heatmapGeneInput }} -- {{ heatmapGenes }}</div>
    <v-textarea
      name="input-7-1"
      outlined
      clearable
      @click:clear="clearInput"
      no-resize
      v-model="heatmapGeneInput"
      :label="`Input newline separated genes (max ${maxGenes})`"
      :hint="notFound.length > 0 ? `Not found: ${notFound.join(', ')}` : ''"
    ></v-textarea>
    <v-btn
        v-if="heatmapGeneInput.length > 0 || heatmapGenes.length > 0"
        :loading="loaderHeatmap"
        :disabled="loading || !valid"
        color="blue-grey"
        class="ma-2 white--text"
        @click="submitAndMove"
      >
        {{ valid ? 'Render heatmap' : 'Select fewer genes' }}
    </v-btn>
  </div>
</template>

<script>

export default {
    name: "input-heatmap-selector",

    computed: {
        available() { return this.$store.state.available },
        categorical() { return Object.keys(this.$store.state.Heatmap_categoryTracks) },
        heatmapGenes() { 
          if (!this.heatmapGeneInput && 
            this.heatmapGeneInput.length === 0) { return [] }
          return this.heatmapGeneInput
            .split('\n')
            .map(gene => gene.toUpperCase())
            .filter(gene => gene.length > 0 && this.genes.includes(gene) )
        },
        notFound() {
          return this.heatmapGeneInput
            .split('\n')
            .map(gene => gene.toUpperCase())
            .filter(gene => gene.length > 0 && !this.genes.includes(gene) )
        },
        genes() { 
          const available = Object.keys(this.available)
          available.sort()
          return available
        },
        loaderHeatmap() { return this.$store.state.loaderHeatmap },
        valid() { return this.heatmapGenes.length <= this.maxGenes && this.heatmapGenes.length > 0 },
    },
    
    data: () => ({
      heatmapGeneInput: 'A1BG',
      maxGenes: 10,
      loading: false,
    }),


    methods: {
      clearInput() { this.heatmapGeneInput = '' },
      submitHeatmapGenes() {
        this.$store.dispatch('getTracks', 
          { 
            view: 'Heatmap', 
            genes: this.heatmapGenes 
          }
        )
        this.$store.dispatch(
          'setHeatmapTrackGroups', 
          { Heatmap_trackGroups: [...this.categorical, ...this.heatmapGenes]}
        )
      },
      submitAndMove() {
        this.submitHeatmapGenes()
        this.$store.dispatch('setHeatmapTab', { Heatmap_tab: 'tab-2' })
      },
    },

    mounted() { 
      this.heatmapGeneInput = ['CA9', 'ANGPTL4', 'VEGFA', 'EGLN3', 'PLVAP', 'ENPP3', 'SLC6A3'].join('\n')
      // this.submitHeatmapGenes() 
      const categorical = Object.keys(this.$store.state.Heatmap_categoryTracks)
      this.$store.dispatch(
        'setHeatmapTrackGroups', 
        { Heatmap_trackGroups: [...categorical, ...this.heatmapGenes]}
      )
    },
}
</script>

<style>
.input-heatmap {
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