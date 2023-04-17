<template>
    <div class="barplotly"> 
      <div :id="divId">
      </div>
    </div>
</template>

<script>
  import sampleMeta from '../refs/sampleMeta'
  import generateBarplot from '../plotly/barplotly'

  export default {
    name: "barplotly",

    props: [ 'track', 'trackDetails' ],

    data() {
      return {
      }
    },

    computed: {
      divId() { return `${this.track}-barplot` },
      SampleDashboard_data() { 
        let res = {}
        return res
      },
      percentView() { return this.$store.state.SampleDashboard_percentView },
    },

    watch: {
      percentView() { this.barplot() },
    },

    methods: {
      barplot() {
        generateBarplot({
          divId: this.divId,
          percentView: this.percentView,
          sampleMeta,
          trackDetails: this.trackDetails,
          track: this.track,
        })
      }
    },

    mounted() {
      this.barplot()
    },
  }

</script>

<style scoped>
    .barplotly {
      border-top: solid 1px #ededed;
      width: 100%;
      min-width: 340px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
</style>