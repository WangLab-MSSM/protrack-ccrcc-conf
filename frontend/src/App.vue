<template>
  <v-app>
    <introduction />
    <main class="main">
        <input-container class="input-container-main" />
        <sample-dashboard :style="showSampleDashboard" view="SampleDashboard" /> 
        <heatmap-container :style="showHeatmap" view="Heatmap"  />
        <boxplot-container :style="showBoxplot" view="Boxplot" />
        <scatterplot-container :style="showScatterplot" view="Scatterplot" />
        <quality-control-container :style="showQualityControl" view="Quality control" />
        <histology-viewer-container :style="showHistologyViewer" view="Histology viewer" />
    </main>

  </v-app>
</template>

<script>
import BoxplotContainer from './components/BoxplotContainer.vue';
import HeatmapContainer from './components/HeatmapContainer.vue';
import HistologyViewerContainer from './components/HistologyViewerContainer.vue';
import InputContainer from './components/InputContainer.vue';
import Introduction from './components/Introduction.vue';
import ScatterplotContainer from './components/ScatterplotContainer.vue';
import SampleDashboard from './components/SampleDashboard.vue';
import QualityControlContainer from './components/QualityControlContainer.vue';

export default {
  name: 'App',

  components: {
    BoxplotContainer,
    HeatmapContainer,
    HistologyViewerContainer,
    InputContainer,
    Introduction,
    SampleDashboard,
    ScatterplotContainer,
    QualityControlContainer,
  },

  data: () => ({
  }),

  computed: {
    view() { return this.$store.state.view },
    showBoxplot() { return this.view === 'Boxplot' ? "" : "display: none;" },
    showDemo() { return this.view === 'Demo' ? "" : "display: none;" },
    showHeatmap() { return this.view === 'Heatmap' ? "" : "display: none;" },
    showIprofun() { return this.view === 'Iprofun' ? "" : "display: none;" },
    showSampleDashboard() { return this.view === 'Sample dashboard' ? "" : "display: none;" },
    showScatterplot() { return this.view === 'Scatterplot' ? "" : "display: none;" },
    showQualityControl() { return this.view === 'Quality control' ? "" : "display: none;" },
    showHistologyViewer() { return this.view === 'Histology viewer' ? "" : "display: none;" },
  },

  mounted() { 
      this.$store.dispatch('getTracks', 
          { 
            view: 'Heatmap', 
            genes: ['CA9', 'ANGPTL4', 'VEGFA', 'EGLN3', 'PLVAP', 'ENPP3', 'SLC6A3']
          }
        )
  }
};
</script>

<style scoped>
html {
    box-sizing: border-box;
}

*, *:before, *:after {
    box-sizing: inherit;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.main {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
</style>