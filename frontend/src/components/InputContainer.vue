<template>
    <div class="input-container">
        <view-selector />
        <input-sample-dashboard :style="showSampleDashboard" />
        <input-heatmap :style="showHeatmap" />
        <input-boxplot :style="showBoxplot" />
        <input-scatterplot :style="showScatterplot" />
        <input-quality-control :style="showQualityControl" />
        <input-histology-viewer :style="showHistologyViewer" />
    </div>
</template>

<script>
import InputBoxplot from './InputBoxplot.vue'
import InputHeatmap from './InputHeatmap.vue'
import InputHistologyViewer from './InputHistologyViewer.vue'
import InputQualityControl from './InputQualityControl.vue'
import InputSampleDashboard from './InputSampleDashboard.vue'
import InputScatterplot from './InputScatterplot.vue'
import ViewSelector from './ViewSelector.vue'

export default {
    components: {
        InputBoxplot,
        InputHeatmap,
        InputHistologyViewer,
        InputQualityControl,
        InputSampleDashboard,
        InputScatterplot,
        ViewSelector,
    },
    name: "input-container",
    computed: {
        showBoxplot() { return this.view === 'Boxplot' ? "" : "display: none;" },
        showDemo() { return this.view === 'Demo' ? "" : "display: none;" },
        showHeatmap() { return this.view === 'Heatmap' ? "" : "display: none;" },
        showIprofun() { return this.view === 'Iprofun' ? "" : "display: none;" },
        showSampleDashboard() { return this.view === 'Sample dashboard' ? "" : "display: none;" },
        showScatterplot() { return this.view === 'Scatterplot' ? "" : "display: none;" },
        showQualityControl() { return this.view === 'Quality control' ? "" : "display: none;" },
        showHistologyViewer() { return this.view === 'Histology viewer' ? "" : "display: none;" },
        view() { return this.$store.state.view },
    }
}
</script>

<style scoped>
    .input-container {
        max-width: 400px;
        min-width: 400px;
        border-top: none;
        padding-top: 8px;
        overflow-y: scroll;
        border-right: solid 1px lightgray;
}

    .input-container > div {
        margin-bottom: 1em;
    }

    .mssm-logo {
        margin: 2em;
    }

    .logo {
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: fixed;
        bottom: 0;
        /* left: 100px; */
    }
</style>