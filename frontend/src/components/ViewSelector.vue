<template>
    <div class="view-selector">
        <v-select
          :items="views"
          filled
          v-model="view"
          label="View"
          dense
        ></v-select>
    </div>
</template>

<script>

export default {
    name: "view-selector",

    computed: {
        view: {
            get() { return this.$store.state.view },
            set(view) { this.$store.dispatch('setView', { view }) },
        },
        views() {
            return this.$store.state.views
        },
    },

}
</script>

<style scoped>
    .view-selector {
        max-width: 400px;
        min-width: 400px;
        border-top: none;
        border-right: solid 1px lightgray;
        padding: 10px 10px 2px 10px;
    }

    /* .view-selector > div {
        margin-bottom: 1em;
    } */

    .mssm-logo {
        margin: 2em;
    }
</style>