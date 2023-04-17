<template>
  <div class="input-quality-control">
    <v-btn
      class="mx-auto"
      color="primary"
      @click="downloadQualityControlFile"
    >
        <v-icon class="mr-2">mdi-file-export-outline</v-icon>
        High-resolution PDF
    </v-btn>
  </div>
</template>

<script>
export default {
    name: 'input-quality-control',

    methods: {
        downloadQualityControlFile() {
            const url = 'http://ccrcc-conf.cptac-data-view.org/qcfile/'
            const link = document.createElement('a');
            link.href = url;
            link.target="_blank"
            link.setAttribute('download', 'QC_file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
        }
    },
}
</script>

<style>
.input-quality-control {
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>