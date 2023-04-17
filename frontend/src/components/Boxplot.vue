<template>
  <div class="boxplot">
      <div :id="divId">
      </div>
  </div>
</template>

<script>
import boxplot from '../plotly/boxplotly'

export default {
    name: "boxplot",

    props: [ 'track', 'dataKeys', 'trackData', 'useZScore' ],
    
    data: () => ({
        view: 'Boxplot',
    }),

    computed: {
        stratifyBy() { return this.$store.state.Boxplot_stratifyBy },
        divId() { return `${this.track.split(' ').join('-')}-${this.view}` },
        sampleMeta() { return this.$store.state.sampleMeta },
    },

    watch: {
        stratifyBy() { this.generateBoxplot() },
        track() { this.generateBoxplot() },
        trackData() { this.generateBoxplot() },
        dataKeys() { this.generateBoxplot() },
    },

    methods: {
        generateBoxplot() { 
            if (!this.dataKeys) { return }
            boxplot({
                divId: this.divId,
                trackData: this.trackData,
                dataKeys: this.dataKeys,
                track: this.track,
                stratifyBy: this.stratifyBy,
                useZScore: this.useZScore,
            })
        }
    },

    mounted() { this.generateBoxplot() }
}
</script>

<style>
.boxplot {
    width: 100%;
    min-width: 400px;

}
</style>