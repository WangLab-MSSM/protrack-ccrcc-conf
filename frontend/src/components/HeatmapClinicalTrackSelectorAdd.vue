<template>
  <div class="heatmap-clinical-track-selector-add">
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="blue-grey lighten-3"
                    class="white--text mt-0"
                    elevation="1"
                    :disabled="unshownTracks.length === 0"
                    x-small
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon dark small left>
                    mdi-plus
                    </v-icon>
                    <span>Add</span>
                </v-btn>
            </template>
    
            <v-card>
                <v-card-title class="text-h6 grey lighten-2">
                {{ `Select ${category} tracks to add` }}
                <v-btn
                    color="blue-grey lighten-2"
                    class="white--text ml-10"
                    elevation="1"
                    x-small
                    @click="addAll"
                >
                    <v-icon dark small left>
                    mdi-plus
                    </v-icon>
                    <span>Add all</span>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <div v-for="track in unshownTracks" :key="track">
                    <v-checkbox
                        dense
                        hide-details
                        v-model="tracksToAdd"
                        :value="track"
                        :label="track"
                    ></v-checkbox>
                </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="addTracks"
                >
                    Add tracks
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
    components: {
    },

    props: ['category', 'unshownTracks'],

    name: "heatmap-clinical-track-selector-add",

    computed: {
    },

    data: () => ({
        dialog: false,
        selected: [],
        tracksToAdd: [],
    }),

    watch: {
    },

    methods: {
        addAll() { this.tracksToAdd = [...this.unshownTracks] },
        addTracks() { 
            this.$emit(
                'addTracks', 
                { tracksToAdd: this.tracksToAdd }
            )
            this.dialog = false
            this.tracksToAdd = []
        },
        clearAll() { this.addedTracks = [] },
    },

    mounted() {},
}
</script>

<style>
/* .heatmap-clinical-track-selector-add {
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
} */
</style>