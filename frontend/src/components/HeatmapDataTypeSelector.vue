<template>
  <div class="heatmap-data-type-selector">
    <v-checkbox
      v-for="dt in dataTypes"
      :key="dt"
      dense
      hide-details
      v-model="selected"
      :value="dt"
      :label="dt"
    > 
    </v-checkbox>
    <br>
    <v-btn elevation=1 class="yellow lighten-4" @click="setShownDataTypes">Redraw</v-btn>
  </div>
</template>

<script>
export default {
    components: {
    },
    name: "heatmap-data-type-selector",

    computed: {
    },

    data: () => ({
        dataTypes: [],
        selected: [],
    }),

    watch: {
    },

    methods: {
        setShownDataTypes() {
            this.$store.dispatch('setHeatmapShownDataTypes', { Heatmap_shownDataTypes: this.selected })
        },
    },

    mounted() { 
        this.dataTypes = [...this.$store.state.Heatmap_dataTypes]
        this.selected = [...this.$store.state.Heatmap_shownDataTypes]
    },
}
</script>

<style>
.heatmap-data-type-selector {
    width: 100%;
    margin-top: 10px;
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