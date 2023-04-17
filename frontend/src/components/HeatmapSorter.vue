<template>
  <div class="heatmap-sorter">
        <p>Samples are ordered by:</p>
        <heatmap-sorter-level v-for="(track, i) in lockTracks" 
            :key="track" 
            :track="track" 
            :i="i"
            :lockTracksLength="lockTracks.length"
            @updateLockTrack="updateLockTrack"
            @removeLockTrack="removeLockTrack"
        />
        <div class="add-button">
            <v-btn
                color="indigo lighten-4"
                hint="test"
                small
                class="mt-2"
                prepend-icon="mdi-plus"
                @click="addLockTrack"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <span class="add-button-label">Add another level of ordering</span>
        </div>
        <div style=" text-align: center;">
            <v-btn
                class="mt-4 mx-2"
                color="primary"
                :disabled="lockTracks.length === 0 || !changed"
                @click="sortSamples"
            >
                <span v-if="lockTracks.length > 0">Apply changes</span>
                <span v-else>Select at least 1<br> axis to order by</span>
            </v-btn>
        </div>
  </div>
</template>

<script>
import HeatmapSorterLevel from './HeatmapSorterLevel.vue'

export default {
    components: {
        HeatmapSorterLevel
    },
    name: "heatmap-sorter",

    data: () => ({
        lockTracks: [],
        changed: false,
    }),

    methods: {
        addLockTrack() {
            let lockTracks = [...this.lockTracks]
            lockTracks.push('Search tracks')
            this.lockTracks = lockTracks
        },
        removeLockTrack({ i }) {
            let lockTracks = [...this.lockTracks]
            lockTracks.splice(i, 1)
            this.lockTracks = lockTracks
            this.changed = true
        },
        updateLockTrack({ i, updatedTrack }) {
            let lockTracks = [...this.lockTracks]
            lockTracks[i] = updatedTrack
            this.lockTracks = lockTracks
            this.changed = true
        },
        sortSamples() {
            this.$store.dispatch('setHeatmapSortTracks', {
                Heatmap_sortTracks: this.lockTracks
            })
            this.changed = false
        },
    },

    mounted() { 
        const rev = [...this.$store.state.Heatmap_sortTracks]
        // rev.reverse()
        this.lockTracks = rev
    },
}
</script>

<style>
.heatmap-sorter {
    width: 100%;
    margin-top: 10px;
}

.add-button {
    display: flex;
    flex-direction: row;
}

.add-button-label {
    margin-top: 10px;
    margin-left: 4px;
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

.lock-tracks-switch {
    display: flex;
    flex-direction: row;
}
</style>