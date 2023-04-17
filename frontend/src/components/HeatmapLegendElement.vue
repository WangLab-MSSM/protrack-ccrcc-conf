<template>
  <div class="heatmap-legend-element">
      <div>{{ track }}</div>
      <v-btn-toggle multiple v-model="shownFeatures">
        <div 
            class="heatmap-legend-element-buttons" 
            :style="`width: ${width}%`"
        >
        <!-- :class="getTextColor(el)" -->
            <v-btn
                v-for="el in trackData"
                :key="el.value"
                :value="el.value"
                small
                :class="getTextColor(el)"
                elevation="0"
                min-height="32"
                :plain="!el.value"
                :color="getBackgroundColor(el)"
            >
                <span style="white-space: pre;">
                    {{ getButtonLabel(el) }}
                </span>
            </v-btn>
        </div> 
      </v-btn-toggle>
  </div>
</template>

<script>
export default {
    name: "heatmap-legend-element",

    props: ['track', 'trackData', 'width'],

    data: () => ({
        shownFeatures: [],
        isLoaded: false,
    }),

    methods: {
        getButtonLabel(el) {
            if (el.label.length === 0) { return 'Missing' }
            if (el.label.length > 12 && el.label.split(' ').length > 1) { 
                let labelArr = el.label.split(' ')
                let labelStart, labelEnd
                if (el.label.split(' ').length > 2) {
                    labelStart = labelArr.slice(0, 2).join(' ')
                    labelEnd = labelArr.slice(2,).join(' ')
                } else {
                    labelStart = labelArr.slice(0, 1).join(' ')
                    labelEnd = labelArr.slice(1,).join(' ')
                }
                
                return `\n${labelStart}\n${labelEnd}\n`
            }
            
            return el.label

        },
        getBackgroundColor(el) {
            return this.shownFeatures.includes(el.value) ? el.color : '#ffffff'
        },
        getTextColor(el) {
            const darkBackgrounds = [
                'confirmatory',
                'PUC',
                '>=69.0 (>75%)',
                '>=104.5 (>75%)',
                'past smoker more than 15 years',
                'Vietnam',
                'Stage III',
                'Stage IV',
                '1.0',
                'Deceased',
                'im1',
                'True',
                'ND',
                'Poland',

            ]
            if (!el.value) { return `black--text` }

            if (!this.shownFeatures.includes(el.value)) {
                return `black--text`
            }

            if (darkBackgrounds.includes(el.label)) {
                return `white--text`
            }

            return `black--text`
            // return `brown--text text--darken-3`
        },
        
    },

    watch: {
        shownFeatures() {
            if (this.isLoaded) {
                this.$store.dispatch('updateShownFeatures', 
                { track: this.track, shownFeatures: this.shownFeatures }) 
            }
            this.isLoaded = true
        },
    },

    mounted() { 
        this.shownFeatures = this.trackData.map(el => el.value) 
    }

}
</script>

<style>
.heatmap-legend-element {
    width: 100%;
    margin-top: 10px;
    min-width: 120px;
    display: flex; 
    flex-direction: column;
}

.heatmap-legend-element-buttons {
    display: flex; 
    flex-direction: column;
}

.heatmap-legend-element .v-btn {
    border: solid 1px #000000;
}

</style>