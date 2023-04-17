<template>
  <div class="input-heatmap-customize">
    <v-expansion-panels focusable v-model="panel" multiple>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Reorder samples
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <heatmap-sorter />
        </v-expansion-panel-content>
      </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Hide/show data types
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <heatmap-data-type-selector />
      </v-expansion-panel-content>      
    </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Reorder track groups
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <heatmap-track-group-selector />
        </v-expansion-panel-content>
      </v-expansion-panel>
 
     <v-expansion-panel>
        <v-expansion-panel-header>
           Hide/show/reorder clinical tracks
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <heatmap-clinical-track-selector-container />
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script>
import HeatmapSorter from './HeatmapSorter.vue'
import HeatmapClinicalTrackSelectorContainer from './HeatmapClinicalTrackSelectorContainer.vue'
import HeatmapDataTypeSelector from './HeatmapDataTypeSelector.vue'
import HeatmapTrackGroupSelector from './HeatmapTrackGroupSelector.vue'

export default {
    components: { 
      HeatmapSorter,
      HeatmapClinicalTrackSelectorContainer,
      HeatmapDataTypeSelector,
      HeatmapTrackGroupSelector,
    },
    
    name: "input-heatmap-customize",

    computed: {
    },
    
    data: () => ({
      panel: [0], 
    }),

    methods: {
    },
}
</script>

<style>
.input-heatmap-customize {
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