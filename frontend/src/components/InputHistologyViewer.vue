<template>
  <div class="input-histology-viewer">
    <v-autocomplete
        class="mx-4"
        auto-select-first
        v-model="sample"
        :items="sampleHisto"
        item-text="Case_ID"
        item-value="Case_ID"
        outlined
        clearable
        label="Case ID"
    ></v-autocomplete>
    <div style="width: 90%; margin: 0 auto;">
        <v-expansion-panels multiple v-model="panel" class="mx-auto">
            <v-expansion-panel>
                <v-expansion-panel-header color="grey lighten-3">
                    <span style="font-weight: bold;">Sample information</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-for="(column, i) in columns" :key="`${column[0]}-${i}`">
                        <div v-if="column[0] !== 'break'">
                            <b>{{ column[1] }}:</b> {{ singleSampleMeta[column[0]] }}
                        </div>
                        <div v-else><p></p></div>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
  </div>
</template>

<script>
export default {
    name: 'input-histology-viewer',

    data: () => ({
        panel: [0],
        columns: [
            ['tumorClass', 'Tumor class'],
            ['Stage', 'Stage'],
            ['grade', 'Grade'],
            ['break', 'break'],
            ['purity', 'Purity'],
            ['wgii', 'wgii'],
            ['ploidy', 'Ploidy'],
            ['break', 'break'],
            ['Sex', 'Sex'],
            ['consent_race', 'Race'],
            ['Vital status', 'Vital status'],
            ['hypertension', 'Hypertension'],
            ['Country', 'Country'],
            ['break', 'break'],
            ['methyl_type2', 'Methylation type'],
            ['im_type', 'Immune subtype'],
            ['im_type_discovery', 'Discovery study immune type'],
            ['break', 'break'],
            ['gain_chr7', 'Chr17 gain'],
            ['loss_chr1', 'Chr1 loss'],
            ['loss_chr3p', 'Chr3p loss'],
            ['loss_chr14q', 'Chr14q loss'],
            ['break', 'break'],
            ['BAP1','BAP1 mutation'],
            ['FLCN','FLCN mutation'],
            ['MET','MET mutation'],
            ['MTOR','MTOR mutation'],
            ['PBRM1','PBRM1 mutation'],
            ['SETD2','SETD2 mutation'],
            ['TP53','TP53 mutation'],
            ['TSC1','TSC1 mutation'],
            ['TSC2','TSC2 mutation'],
            ['VHL','VHL mutation'],
            ['CCND1','CCND1 mutation'],
        ],
        mutations: ['BAP1',
            'FLCN',
            'MET',
            'MTOR',
            'PBRM1',
            'SETD2',
            'TP53',
            'TSC1',
            'TSC2',
            'VHL',
            'CCND1',
        ],
    }),
    
    computed: {
        sampleHisto() { return this.$store.state.sampleHisto },
        sample: {
            get() { return this.$store.state.HistologyViewer_Sample },
            set(sample) { 
                this.$store.dispatch('setHistologyViewerSample', 
                { sample }) 
            },
        },
        sampleMeta() { return this.$store.state.sampleMeta },
        singleSampleMeta() { return this.sampleMeta[this.sample] },
    },
}
</script>

<style>
.input-histology-viewer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>