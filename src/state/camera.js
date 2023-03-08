//This is a store which works with camera
// on @see/src/pages/PageCamera.vue
import { ref } from 'vue'

export let video = ref()
export const hasCameraSupport = ref(true)

export const disableCamera = () => {
  video.value.srcObject.getVideoTracks().forEach(track => {
    track.stop()
  })
}

export const initCamera = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: true
    })
    .then(Stream => {
      video.value.srcObject = Stream
    })
    .catch(Error => {
      hasCameraSupport.value = false
    })
}
