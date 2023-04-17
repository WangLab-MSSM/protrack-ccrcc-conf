<template>
    <div class="input-sample-dashboard">
        <div class="reorder-graph-box">
            <b>Reorder graphs</b>
            <draggable v-model="sampleDashboardTracks" @start="drag=true" @end="drag=false">
                <div 
                    class="selection-element"
                    v-for="element in sampleDashboardTracks" 
                    :key="element"
                >
                    <v-icon>
                        mdi-drag-vertical-variant
                    </v-icon>
                    {{ categoryTracks.Mutation.includes(element) ?
                        `${element} Mutation` :
                        element
                        }}
                </div>
            </draggable>
        </div>
        <div class="percent-view-box">
            <b>Show as percentages</b>
            <v-switch
                v-model="percentView"
                :label="percentView ? `Showing percentages` : `Showing raw counts`"
            ></v-switch>
        </div>
    </div>
</template>

<script>
import categoryTracks from '../refs/categoryTracks'

import draggable from 'vuedraggable'

export default {
    name: "input-sample-dashboard",
    components: {
            draggable,
        },
    data() {
        return {
            categoryTracks,
        }
    },
    computed: {
        percentView: {
            get() { return this.$store.state.SampleDashboard_percentView },
            set(SampleDashboard_percentView) {
                this.$store.dispatch('setSampleDashboardPercentView', {
                    SampleDashboard_percentView
                })
            },
        },
        sampleDashboardTracks: {
            get() { return this.$store.state.sampleDashboard_graphs },
            set(sampleDashboard_graphs) {
                this.$store.dispatch(
                    'setSampleDashboardGraphs',
                    { sampleDashboard_graphs }
                )
            },
        },

    },
}
</script>

<style scoped>
    .cohort-menu {
        margin: 2px;
    }
    
    .cohort-list a {
        text-decoration-style: dotted;
    }

    .input-list {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }


    .list-element {
        cursor: grab;
        margin: 0 auto;
        width: 100%;
        margin-bottom: 2px;
        display: flex;
        flex-direction: row;
        justify-content: left;
    }

    .selection-element {
        border: solid 1px #bebebe;
        /* border-radius: 10%; */
        margin-right: 5px;
        width: 100%;
        /* width: 260px; */
        padding: 5px;
        overflow-wrap: break-word;
        /* text-overflow: wrap; */
        /* font-size */
    }

    .input-sample-dashboard {
        max-width: 300px;
        min-width: 300px;
        margin-top: 500px;
        overflow-y: scroll;
        margin: 0 auto;
        font-size: 0.9em;
        display: flex;
        flex-direction: column;
    }

    .cohort-list {
        border: solid 1px #bebebe;
        width: 80%;
        margin: 0 auto;
        padding: 10px;
        margin-bottom: 20px;
        font-size: 1.2em;
    }

    .reorder-graph-box {
        border: solid 1px #ebebeb;
        padding: 20px;
    }

    .percent-view-box {
        border: solid 1px #ebebeb;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>