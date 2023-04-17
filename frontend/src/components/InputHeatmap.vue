<template>
  <div class="input-heatmap">
    <v-app>
      <v-card flat>
      <v-tabs
        v-model="tab"
      >
          <v-tab href="#tab-1">
            Input
          </v-tab>

          <v-tab href="#tab-2">
            Customize
          </v-tab>

          <!-- <v-tab href="#tab-3">
            Download
          </v-tab> -->
        </v-tabs>

        <v-tabs-items v-model="tab">

          <v-card style="margin-top: 20px;">

            <v-tab-item value="tab-1">
              <input-heatmap-selector />
            </v-tab-item>

            <v-tab-item value="tab-2">
              <input-heatmap-customize />
            </v-tab-item>

            <!-- <v-tab-item value="tab-3">
              3
            </v-tab-item> -->

          </v-card>

        </v-tabs-items>

      </v-card>
    </v-app> 
  </div>
</template>

<script>
import InputHeatmapCustomize from './InputHeatmapCustomize.vue'
import InputHeatmapSelector from './InputHeatmapSelector.vue'

export default {
    components: {
      InputHeatmapCustomize,
      InputHeatmapSelector,
    },

    name: "input-heatmap",

    computed: {
        // available() { return this.$store.state.available },
        tab: {
          get() { return this.$store.state.Heatmap_tab },
          set(tab) { this.$store.dispatch('setHeatmapTab', { Heatmap_tab: tab }) },
        }
        // heatmapGenes() { 
        //   return this.heatmapGeneInput
        //     .split('\n')
        //     .map(gene => gene.toUpperCase())
        //     .filter(gene => gene.length > 0 && this.genes.includes(gene) )
        // },
        // notFound() {
        //   return this.heatmapGeneInput
        //     .split('\n')
        //     .map(gene => gene.toUpperCase())
        //     .filter(gene => gene.length > 0 && !this.genes.includes(gene) )
        // },
        // genes() { 
        //   const available = Object.keys(this.available)
        //   available.sort()
        //   return available
        // },
        // loaderHeatmap() { return this.$store.state.loaderHeatmap },
        // valid() { return this.heatmapGenes.length <= this.maxGenes && this.heatmapGenes.length > 0 },
    },
    
    data: () => ({
      // tab: 'tab-1',
    }),


    methods: {
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