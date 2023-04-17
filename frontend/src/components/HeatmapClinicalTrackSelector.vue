<template>
  <div class="heatmap-clinical-track-selector">
      <div class="selector-header">
        <span>
            {{ category in labels ? labels[category] : category }}
        </span>
        <div class="selector-header-options">
            <heatmap-clinical-track-selector-add 
                :category="category"
                :unshownTracks="unshownTracks"
                @addTracks="addTracks"
            />
            <v-tooltip right>
                <template  v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="grey darken-1"
                        elevation="1"
                        :disabled="shownTracks.length === 0"
                        class="ml-2"
                        outlined
                        icon
                        x-small
                        v-bind="attrs"
                        v-on="on"
                        @click="clearAll"
                    >
                        <v-icon dark  x-small>
                        mdi-close
                        </v-icon>
                    </v-btn>
                </template>
                <span>Remove all</span>
            </v-tooltip>
        </div>
      </div>
        <draggable v-model="shownTracks" @start="drag=true" @end="drag=false">
            <div class="lock-element" v-for="track of shownTracks" :key="track">
                <div class="lock-element-content">
                    <span>
                        <v-icon v-if="shownTracks.length > 1">
                            mdi-arrow-up-down
                        </v-icon>
                        {{track}}
                    </span> 
                    <v-btn 
                        v-if="!(heatmapTracksToLock.includes(track))"
                        icon 
                        x-small 
                        @click="removeTrack(track)"
                    >
                        <v-icon dark>
                            mdi-close
                        </v-icon>
                    </v-btn>

                    <v-tooltip right v-if="heatmapTracksToLock.includes(track)">
                        <template  v-slot:activator="{ on, attrs }">
                            <v-btn 
                                icon 
                                x-small 
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon dark>
                                    mdi-help-circle-outline
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Remove from sample ordering<br>list to hide</span>
                    </v-tooltip>
                </div>
            </div>
        </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import HeatmapClinicalTrackSelectorAdd from './HeatmapClinicalTrackSelectorAdd.vue'

export default {
    components: {
        draggable,
        HeatmapClinicalTrackSelectorAdd,
    },

    props: ['category', 'tracks'],

    name: "heatmap-clinical-track-selector",

    computed: {
        categoryTracks() { return this.$store.state.categoryTracks },
        heatmapTracksToLock() { return this.$store.state.Heatmap_sortTracks },
        trackDetails() { return this.$store.state.trackDetails },
        unShownTracks() {
            let unShown = [...this.tracks]
                .filter(track => !this.shownTracks.includes(track))
            unShown.sort()
            return unShown
        },
    },

    data: () => ({
        dialog: false,
        selected: [],
        shownTracks: [],
        unshownTracks: [],
        labels: {
            'Ungrouped': 'Categorical clinical',
            'Numerical': 'Continuous clinical',
        },
    }),

    watch: {
        shownTracks(shownTracks) {
            this.$emit('childevent', {
                shownTracks,
                category: this.category
            })
            let unshownTracks = [...this.tracks]
                .filter(track => !this.shownTracks.includes(track))
            unshownTracks.sort()
            this.unshownTracks = unshownTracks
        }
    },

    methods: {
        addTracks({ tracksToAdd }) { 
            const shownTracks = [...this.shownTracks, ...tracksToAdd]
            this.shownTracks = shownTracks
            // this.unshownTracks = [...this.tracks]
            //     .filter(track => !shownTracks.includes(track))
        },
        addAll() { this.shownTracks = [...this.tracks] },
        clearAll() { 
            this.shownTracks = [...this.heatmapTracksToLock] 
        },
        removeTrack(track) { 
            const res = this.shownTracks.filter(el => el !== track) 
            this.shownTracks = res
        }
    },

    mounted() { 
        this.shownTracks = [...this.tracks]
    },
}
</script>

<style>
.heatmap-clinical-track-selector {
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
}

.lock-element-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>