<template>
  <div class="input-scatterplot">
      <div style="margin-bottom: 10px; padding: 10px; background: #ebebeb">
        Render scatterplots with pearson correlations calculated for two genes and their different data types. 
      </div>
      <v-autocomplete
        v-model="scatterplotGeneA"
        :items="genes"
        outlined
        :menu-props="{closeOnContentClick: true}"
        dense
        :label="`Select gene`"
        clearable
    >
    </v-autocomplete>
      <v-autocomplete
        v-model="scatterplotGeneB"
        :items="genes"
        outlined
        :menu-props="{closeOnContentClick: true}"
        dense
        :label="`Select gene`"
        clearable
    >
    </v-autocomplete>

    <v-btn
      elevation="2"
      x-small
      color="blue lighten-2"
      dark
      :disabled="!valid"
      @click="submitScatterplotGenes"
    > 
      Submit genes
    </v-btn>

    <input-scatterplot-customize />
  </div>
</template>

<script>
import InputScatterplotCustomize from './InputScatterplotCustomize.vue'

export default {
    components: { InputScatterplotCustomize  },
    
    name: "input-scatterplot",

    computed: {
        available() { return this.$store.state.available },
        // loaderBoxplot() { return this.$store.state.loaderBoxplot },
        genes() { 
            const available = Object.keys(this.available)
            available.sort()
            return available
        },
        valid() { return this.scatterplotGeneA.length > 0 && this.scatterplotGeneB.length > 0 },
    },
    
    data: () => ({
        loading: false,
        scatterplotGeneA: '',
        scatterplotGeneB: '',
    }),


    methods: {
        submitScatterplotGenes() {
            this.$store.dispatch('getTracks', 
            { 
              view: 'Scatterplot', 
              genes: [this.scatterplotGeneA, this.scatterplotGeneB ],
            }
          )
        },
    },

}
</script>

<style>
.input-scatterplot {
    margin: 10px;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.ttest-descriptor {
  width: 100%;
  margin: 10px;
  font-size: 0.8em;
}
</style>