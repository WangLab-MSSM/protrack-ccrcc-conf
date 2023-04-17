<template>
  <div class="histology-viewer-card">
      <template>
        <v-card
            outlined
            class="mx-auto px-auto"
            max-width="550"
        >   
            <v-card-title>
                {{ slide.Specimen_Type.split('_').join(' ') }} <span v-if="slide.Tumor_Site.length > 0">: {{ slide.Tumor_Site }}</span>
            </v-card-title>
            <v-card-subtitle>
                Double-click or use touchpad to zoom
            </v-card-subtitle>
            <v-card-text>
                <div style="width: 500px; height: 300px; border-top: solid 1px black; overflow: hidden;">
                    <iframe
                        
                        :src="`https://pathology.cancerimagingarchive.net/pathdata/cptac_camicroscope/osdCamicroscope.php?tissueId=${slide.Slide_ID}`" 
                        style="width: 500px; 
                        height: 400px; 
                        position: relative; 
                        left: -2px; 
                        top: -100px;"
                    >
                    </iframe>
                </div>
                <div v-for="feature in features" :key="feature">
                    <b>{{ feature }}</b>: {{ String(slide[feature]).length > 0 ? slide[feature] : 'Not reported' }}
                </div>
                <div>
                    <a 
                        target="_blank"
                        :href="`https://pathology.cancerimagingarchive.net/pathdata/cptac_camicroscope/osdCamicroscope.php?tissueId=${slide.Slide_ID}`"
                    >
                    <b>View on TCIA</b>
                    </a>
                </div>
            </v-card-text>
        </v-card>
        </template>
  </div>
</template>

<script>
export default {
    name: 'histology-viewer-card',

    props: [ 'slide' ],

    data: () => ({
        features: [
            'Weight',
            'Percent_Tumor_Nuclei',
            'Percent_Total_Cellularity',
            'Percent_Necrosis',
        ]
    }),
    
    computed: {
        url() { return `'https://pathology.cancerimagingarchive.net/pathdata/cptac_camicroscope/osdCamicroscope.php?tissueId=${this.slide.Slide_ID}''` }
    },

}
</script>

<style>
.histology-viewer-card {
    width: 100%;
}

</style>