<template>
  <div class="quality-control-panel">
      <div :class="`wrapper-${columns}`">
        <div 
            v-for="image in images"
            :key="image.path"
        >
            <div
                @click="openModal({path: image.path})"
            >
                <v-card
                    class="mx-0 py-0"
                >
                    <!-- <v-card-text> -->
                        <div class="container" >
                            <img :src="imgUrl(image.path)" :height="height" class="image"/>
                            <div class="overlay">
                                <div class="text">
                                    <v-icon>mdi-magnify-plus-outline</v-icon>
                                </div>
                            </div>
                        </div>
                    <!-- </v-card-text> -->
                </v-card>
            </div>
            <modal :name="image.path" height="600" width="950">
                <div style="display: flex; flex-direction: row; justify-content: center;">
                    <img :src="imgUrl(image.path)" height="575" />
                </div>
            </modal>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'quality-control-panel',

    props: [ 'images', 'columns', 'height' ],

    computed: {},

    methods: {
        imgUrl(path) {
            const images = require.context('../assets/img/')
            return images('./' + path + ".jpg")
        },
        openModal({ path }) {
            this.$modal.show(path)
        }
    },
}
</script>

<style>
.quality-control-panel {
    max-width: 960px;
    min-width: 960px;
    margin: 10px auto;
}

.wrapper-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.wrapper-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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