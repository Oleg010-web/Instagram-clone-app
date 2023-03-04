<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video 
        v-show="!imageCaptured"
        ref="video"
        class="full-width"
        autoplay
        playsinline
      />
      <canvas 
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="200"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn v-if="hasCameraSupport" @click="captureImage" round color="grey-10" size="lg" icon="eva-camera" />
      <q-file v-else  @update:model-value="captureImageFallBack" type="file" v-model="imageUpload" label="Choose an image" accept="image/*" outlined>
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
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
            <q-btn @click="getLocation" round dense flat icon="eva-navigation-2-outline" />
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

//imports
import { uid } from 'quasar'
import { reactive, onMounted, ref, onBeforeUnmount } from 'vue'
import * as locales  from 'md-gum-polyfill'
import axios, * as others from 'axios'
import { useQuasar } from 'quasar'


//data objects
const post = reactive({
  id: uid(),
  caption: '',
  location: '',
  photo: null,
  date: Date.now()
})
const $q = useQuasar()

//refs
const imageCaptured = ref(false)
const hasCameraSupport = ref(true)
const imageUpload = ref([])

let video = ref()
let canvas = ref()


//methods
const dataUrItoBlob = (dataUri)=>{
            let binary = atob(dataUri.split(',')[1]);
            let mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
            let array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], { type: mimeString });
};

const captureImage = () => {
  canvas.value.width = video.value.getBoundingClientRect().width
  canvas.value.height = video.value.getBoundingClientRect().height
  let context = canvas.value.getContext('2d')
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height)
  imageCaptured.value = true
  post.photo = dataUrItoBlob(canvas.value.toDataURL()) 
  disableCamera()
}

const captureImageFallBack = (file) => {
  post.photo = file
  
  let context = canvas.value.getContext('2d')
  let reader = new FileReader();
    reader.onload = event => {
        let img = new Image()
        img.onload = () => {
            canvas.value.width = img.width
            canvas.value.height = img.height
            context.drawImage(img,0,0)
            imageCaptured.value = true
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(file)
}

const disableCamera = () => {
  video.value.srcObject.getVideoTracks().forEach(track => {
    track.stop()
  });
}

const initCamera = () => {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(Stream => {
    
    video.value.srcObject = Stream
  }).catch(Error => {
    hasCameraSupport.value = false
  })
}

const getLocation = () => {
  console.log('getLocation');
  navigator.geolocation.getCurrentPosition(position => {
    getSityandCountry(position)
  }, err => {
    locationError()
  }, {timeout: 7000 })
}

const getSityandCountry = async (position) => {
  let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
  await axios.get(apiUrl).then(Result => {
    locationSuccess(Result)
  }).catch(Error => {
    locationError()
  })
}

const locationSuccess = (result) => {
  post.location = result.data.city
  if(result.data.country){
    post.location += `, ${result.data.country}`
  }
}

const locationError = () => {

      $q.dialog({
        title: 'Error',
        message: 'Soory, could not find your location'
      })

  
}


//lifecycle hooks
onMounted( () => {
 initCamera()
}
  
)

onBeforeUnmount(() => {
  if(hasCameraSupport.value){
    disableCamera()
  }
})
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
