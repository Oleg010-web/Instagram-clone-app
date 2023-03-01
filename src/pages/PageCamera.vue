<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video 
        v-show="!imageCaptured.captured"
        ref="video"
        class="full-width"
        autoplay
        playsinline
      />
      <canvas 
        v-show="imageCaptured.captured"
        ref="canvas"
        class="full-width"
        height="200"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn @click="captureImage" round color="grey-10" size="lg" icon="eva-camera" />
      <div class="row justify-center q-ma-md">
        <q-input
          class="col col-sm-6"
          v-model="post.caption"
          label="Caption"
          dense
        />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          class="col col-sm-6"
          v-model="post.location"
          label="Location"
          dense
        >
          <template v-slot:append>
            <q-btn round dense flat icon="eva-navigation-2-outline" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn unelevated rounded color="primary" label="Post Image" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { uid } from 'quasar'
import { reactive, onMounted, ref } from 'vue'
import * as locales  from 'md-gum-polyfill'

const post = reactive({
  id: uid(),
  caption: '',
  location: '',
  photo: null,
  date: Date.now()
})

const imageCaptured = reactive ({
  captured: false
})

let video = ref()
let canvas = ref()

const captureImage = () => {
  canvas.value.width = video.value.getBoundingClientRect().width
  canvas.value.height = video.value.getBoundingClientRect().height
  let context = canvas.value.getContext('2d')
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height)
  imageCaptured.captured = true

}
const initCamera = () => {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(Stream => {
    
    video.value.srcObject = Stream
  })
}

onMounted( () => {
 initCamera()
}
  
)
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
