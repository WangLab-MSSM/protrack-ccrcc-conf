<template>
  <div class="histology-viewer-reference">
    Spectrum of renal tumor subtypes in our cohort on H&E histopathological assessment. [All images 20X (100um)]
    <div class="wrapper-6">
        <div 
            v-for="image in images"
            :key="image.path"
        >
            <div

                @click="openModal({path: image.path})"
                style="border: solid 1px #ebebeb; padding: 0; background: pink; height: height"
            >
                <v-card
                    class="mx-0 py-0"
                >
                    <!-- <v-card-text> -->
                        
                        <div class="container" :style="`height: ${height}` ">
                            <img :src="imgUrl(image.path)" :height="height" class="image"/>
                            <div class="overlay">
                                <div class="text">
                                    <v-icon>mdi-magnify-plus-outline</v-icon>
                                </div>
                            </div>
                            <p>{{ image.description }}</p>
                        </div>
                    <!-- </v-card-text> -->
                </v-card>
            </div>
            <modal :name="image.path" height="600" width="950">
                <div style="display: flex; flex-direction: row; justify-content: center; margin: 20px;">
                    <img :src="imgUrl(image.path)" height="575" />
                    <p style="margin-left: 10px;">Description: {{ image.description }}</p>
                </div>
            </modal>
        </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'histology-viewer-reference',

    data: () => ({
        height: '250px',
        images: [
            {path: 'histo_ref_a', description: 'ccRCC: Clear cell renal cell carcinoma', dataType: ''},
            {path: 'histo_ref_b', description: 'chRCC: Chromophobe renal cell carcinoma', dataType: ''},
            {path: 'histo_ref_c', description: 'Oncocytoma – Type 1 (with CCND1 mutation)', dataType: ''},
            {path: 'histo_ref_d', description: 'Oncocytoma-Type 2', dataType: ''},
            {path: 'histo_ref_e', description: 'pRCC type1: Papillary renal cell carcinoma-Type 1', dataType: ''},
            {path: 'histo_ref_f', description: 'pRCC type1: Papillary renal cell carcinoma-Type 1', dataType: ''},
            {path: 'histo_ref_g', description: 'pRCC type2: Papillary renal cell carcinoma--Type 2', dataType: ''},
            {path: 'histo_ref_h', description: 'tRCC: Tubulocystic renal cell carcinoma; ', dataType: ''},
            {path: 'histo_ref_i', description: 'Unclassified: Renal cell carcinoma-Unclassified', dataType: ''},
            {path: 'histo_ref_j', description: 'MEST:  Mixed epithelial and stromal tumor', dataType: ''},
            {path: 'histo_ref_k', description: 'Unclassified: Renal cell carcinoma-Unclassified', dataType: ''},
            {path: 'histo_ref_l', description: 'AML: Angiomyolipoma', dataType: ''},
        ],
    }),
    computed: {},

    methods: {
        imgUrl(path) {
            const images = require.context('../assets/img/histo_ref')
            return images('./' + path + ".jpg")
        },
        openModal({ path }) {
            this.$modal.show(path)
        }
    },
}
</script>

<style>
.histology-viewer-reference {
    max-width: 910px;
    min-width: 910px;
    margin-top: 10px;
    font-size: small;
}

.wrapper-6 {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: #ffffff;
}

.container:hover .overlay {
  opacity: 0.75;
  cursor: pointer;
}

.text {
  color: black;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>