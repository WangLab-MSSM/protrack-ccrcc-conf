<template>
  <div class="heatmap-track-group-selector">
    <draggable v-model="draggableTrackGroups" @start="drag=true" @end="drag=false">
         <div class="lock-element" v-for="track of draggableTrackGroups" :key="track">
            <div class="lock-element-content">
                <span>
                    <v-icon>
                        mdi-arrow-up-down
                    </v-icon> 
                    {{ getTrackLabel(track) }}
                </span> 
            </div>
        </div> 
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable,
    },

    props: ['category', 'tracks'],

    name: "heatmap-track-group-selector",

    computed: {
        categoryTracks() { return this.$store.state.Heatmap_categoryTracks },
        draggableTrackGroups: {
            get() { return this.$store.state.Heatmap_trackGroups },
            set(Heatmap_trackGroups) { this.$store.dispatch('setHeatmapTrackGroups', { Heatmap_trackGroups }) },
        }
    },

    data: () => ({
        labels: {
            'Ungrouped': 'Categorical clinical',
            'Numerical': 'Continuous clinical',
        },
    }),

    watch: {
    },

    methods: {
        getTrackLabel(track) {
            if (track in this.labels) { return this.labels[track] }
            if (track in this.categoryTracks) { return track }

            return `${track} tracks`
        },
        resetToDefault() {},
    },

    mounted() { 
        this.draggableTrackGroups = [...this.$store.state.Heatmap_trackGroups]
    },
}
</script>

<style>
.heatmap-track-group-selector {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
}

.selector-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2px;
}

.selector-header-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    margin-top: 5px;
}

.lock-element-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>