<template>
  <div class="heatmap-clinical-track-selector-container">
    <v-btn 
        elevation=1 
        class="yellow lighten-4 mt-1" 
        :disabled="!changed"
        @click="setClinicalTracks">
        Redraw
    </v-btn>
    <div>
        <div v-for="tracks, category in categoryTracks" :key="category">
            <heatmap-clinical-track-selector 
                :category="category" 
                :tracks="tracks"
                @childevent="updateparent"
            />
        </div>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

import HeatmapClinicalTrackSelector from './HeatmapClinicalTrackSelector.vue'

export default {
    components: {
        HeatmapClinicalTrackSelector
    },
    name: "heatmap-clinical-track-selector-container",

    computed: {
        categoryTracks() { return this.$store.state.Heatmap_categoryTracks },
    },

    data: () => ({
        changed: null,
        loaded: false,
        categoryTracksFiltered: {},
        lockTracks: [],
        selected: [],
    }),

    methods: {
        setClinicalTracks() {
            this.changed = false
            this.$store.dispatch(
                'setHeatmapCategoryTracksFiltered', 
                { Heatmap_categoryTracksFiltered: this.categoryTracksFiltered }
            )
        },
        updateparent({ category, shownTracks }) {
            this.categoryTracksFiltered[category] = shownTracks
            this.changed = true
        }
    },

    mounted() { 
        this.categoryTracksFiltered = cloneDeep(this.categoryTracks)
    },

}
</script>

<style>
.heatmap-clinical-track-selector-container {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
}

.sort-buttons-container {
    text-align: center;
    background-color: #ebebeb;
    padding: 10px;
    margin: 4px;
}

.sort-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.lock-element {
    border: solid 1px #ebebeb;
}

.lock-element-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>