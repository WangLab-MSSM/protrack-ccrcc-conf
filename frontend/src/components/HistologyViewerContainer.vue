<template>
  <div class="histology-viewer-container">
    <div class="reference-panel">
      <v-expansion-panels v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header color="grey lighten-2">
            <b>Reference panel</b>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <histology-viewer-reference />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="wrapper-2">
      <histology-viewer-card 
        v-for="slide in singleSampleSlides"
        :key="slide.Slide_ID"
        :slide="slide"
      />
    </div>
  </div>
</template>

<script>
import HistologyViewerCard from './HistologyViewerCard.vue'
import HistologyViewerReference from './HistologyViewerReference.vue'
export default {
  components: { HistologyViewerCard, HistologyViewerReference },
    name: 'histology-viewer-container',

    data: () => ({
      panel: 0,
    }),

    computed: {
        sample() { return this.$store.state.HistologyViewer_Sample },
        sampleHisto() { return this.$store.state.sampleHisto },
        singleSampleSlides() {
            return this.sampleHisto.filter(el => el.Case_ID === this.sample)
        },
    },
}
</script>

<style>
.histology-viewer-container {
    width: 100%;
}


.wrapper-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.reference-panel {
  width: 950px;
  margin: 20px auto;

}
</style>