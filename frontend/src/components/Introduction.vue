<template>
    <div class="introduction">

        <div class="protrack">
            ProTrack: <br>Kidney cancer
            <div class="logo">
                <img src="../assets/logo_combined.png" height="50px" style="border-radius: 15px"/>
            </div>
        </div>

        <div class="cptac-description">
            <p>This interactive data portal supports query, visualization, and downloads of multi-omics data from a comprehensive proteogenomic study of clear cell renal cell carcinoma, a collaborative project by <a href="https://proteomics.cancer.gov/programs/cptac">Clinical Proteomic Tumor Analysis Consortium (CPTAC).</a></p>
            <p>NCI-supported CPTAC is a comprehensive and coordinated effort to accelerate the understanding of the molecular basis of cancer through the application of large-scale proteome (proteins) and genome (DNA and RNA) analysis technologies to different cancer types. Through collaboration with leaders in the field, CPTAC’s mission is to accelerate precision oncology through state-of-the-art proteogenomics and create open-source community resources.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "introduction"
    }
</script>

<style scoped>
    .introduction {
        background: #91818a;
        padding: 0.5em;
        color: white;
        display: flex;
    }

    .protrack {
        font-weight: bold;
        font-size: 1.5em;
        margin-right: 1em;
        min-width: 20%;
        max-width: 20%;
        text-align: right;
    }

    /* .logo {
        border-radius: 50%;
        border:1px solid black;
    } */
    
    .cptac-description {
        font-size: 0.85em;
        min-width: 70%;
        max-width: 70%;
    }

    .cptac-description a {
        color: white;
        font-weight: bold;
        text-decoration: underline;
    }
</style>