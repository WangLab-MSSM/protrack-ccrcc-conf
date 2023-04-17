<template>
    <div class="heatmap-sorter-level">
        <div v-if="!editing">{{ updatedTrack }}</div>
        <div v-else>
            <v-autocomplete
                dense
                v-model="updatedTrack"
                :items="allTracks"
            >
            </v-autocomplete>
        </div>

        <div v-if="!editing">
            <v-btn
                icon
                color="grey"
                x-small
                @click="editing = true"
                style="margin-left: 10px;"
                hint="test"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </div>
        <div v-else>
            <v-btn
                icon
                color="green"
                small
                @click="updateLockTrack"
                style="margin-left: 10px;"
            >
                <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
                v-if="lockTracksLength > 1"
                icon
                color="red"
                small
                @click="removeLockTrack"
                style="margin-left: 10px;"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    name: "heatmap-sorter-level",
    
    props: ['track', 'i', 'lockTracksLength'],

    computed: {
        allTracks() {
            return Object.keys(this.$store.state.Heatmap_data)
        },
    },

    data: () => ({
        editing: false,
        updatedTrack: '',
    }),

    watch: {
    },

    methods: {
        removeLockTrack() {
            this.editing = false
            this.$emit(
                'removeLockTrack', 
                { 
                    i: this.i,
                }
            )
        },
        updateLockTrack() {
            this.editing = false
            if (this.updatedTrack === 'Search tracks') {
                this.$emit(
                    'removeLockTrack', 
                    { 
                        i: this.i,
                    }
                )
            } else {
                this.$emit(
                    'updateLockTrack', 
                    { 
                        updatedTrack: this.updatedTrack,
                        i: this.i,
                    }
                )

            }
        },
    },

    mounted() { 
        this.updatedTrack = this.track
        if (this.track === 'Search tracks') {
            this.editing = true
        }
    },
}
</script>

<style>
.heatmap-sorter-level {
    width: 100%;
    display: flex;
    flex-direction: row;
    border: solid 1px #ebebeb;
    padding: 2px 10px;
    justify-content: space-between;
}

.heatmap-sorter-level span {
    margin-left: 5px;
}

</style>