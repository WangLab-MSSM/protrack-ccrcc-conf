<template>
  <div class="quality-control-container">
    <v-expansion-panels 
        v-model="panels"
        multiple
    >
        <v-expansion-panel
            v-for="(imagePanel, i) in imagePanels"
            :key="`imagePanel-${i}`"
            min-width="910px"
        >
            <v-expansion-panel-header color="grey lighten-3">
                <div style="display: flex; flex-direction: row;">
                    <b style="padding-top: 4px;">{{ imagePanel.title }}</b>
                    <v-tooltip 
                        bottom color="primary" 
                        max-width="400"
                        content-class="custom-tooltip"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                class="px-2"
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                            >
                            mdi-help-circle
                            </v-icon>
                        </template>
                        <span>{{imagePanel.description }}</span>
                    </v-tooltip>
                </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <!-- <div  style="width: 100%;  margin: 0 auto; background: pink;"> -->
                    <quality-control-panel 
                        :images="imagePanel.images"
                        :columns="imagePanel.columns"
                        :height="imagePanel.height"
                    />
                <!-- </div> -->
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import QualityControlPanel from './QualityControlPanel.vue'
// {
//     id: 'a',
//     title: '',
//     description: '',
//     images: [
//         {path: '', description: ''},
//     ],
// },
export default {
    components: { 
        QualityControlPanel 
    },

    name: 'quality-control-container',

    data() {
        return {
            panels: [ 0, 1, 2 ],
            imagePanels: [
                {
                    title: 'Detection per plex',
                    columns: 3,
                    height: '250',
                    description: 'Barplots (upper) display the number of identified proteins, phosphorylated proteins, phosphorylation sites, phospho-enriched glycosylated proteins and glyco-enriched glycosylated proteins in each TMT plex. Density plots (lower) show the distribution of quantified molecules under each category  in each TMT channel in all plexes. Dark blue represents TMT plexes in non-ccRCC cohort and gray represents TMT plexes in the discovery cohort.',
                    images: [
                        {path: 'a_proteome', description: 'Barplots (upper) display the number of identified proteins', dataType: ''},
                        {path: 'a_phosphoproteome', description: '', dataType: ''},
                        {path: 'a_phosphosites', description: '', dataType: ''},
                        {path: 'a_phosphoglycoproteins', description: '', dataType: ''},
                        {path: 'a_glycoglycoproteins', description: '', dataType: ''},
                        {path: 'a_overlap', description: '', dataType: ''},
                    ],
                },
                {
                    title: 'QC correlation',
                    columns: 4,
                    height: '250',
                    description: 'Heatmaps show Pearson correlation between and within ratio quantifications of QC samples and NCI samples in global proteome, phosphoproteome, phosphosites and phospho-enriched glycoproteome, from left to right.',
                    images: [
                        {path: 'b_proteome', description: '', dataType: ''},
                        {path: 'b_phosphoproteome', description: '', dataType: ''},
                        {path: 'b_phosphosites', description: '', dataType: ''},
                        {path: 'b_phosphoglycoproteins', description: '', dataType: ''},
                    ],
                },
                {
                    title: 'Batch effect PCA',
                    columns: 3,
                    height: '320',
                    description: 'PCA plots show distribution of samples with regard to PC1 (x axis) and PC2 (y axis) in global proteome, phosphoproteome, phosphosites, phospho-enriched glycoproteome and glyco-enriched glycoproteome, stratified by tumor/normal condition and ccRCC/non-ccRCC cohorts, colored by TMT plexes.',
                    images: [
                        {path: 'c_proteome', description: '', dataType: ''},
                        {path: 'c_phosphoproteome', description: '', dataType: ''},
                        {path: 'c_phosphosites', description: '', dataType: ''},
                        {path: 'c_phosphoglycoproteins', description: '', dataType: ''},
                        {path: 'c_glycoglycoproteins', description: '', dataType: ''},
                        {path: 'c_legend', description: '', dataType: ''},
                    ],
                },
            ],
        }
    },

}
</script>

<style>
.quality-control-container {
    width: 75%;
    margin: 30px;
}

.custom-tooltip {
    opacity: 1!important;
}
</style>