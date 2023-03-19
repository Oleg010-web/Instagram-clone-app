//imports
import { ref } from 'vue'
import { Dialog } from 'quasar'

//data
export const locationLoading = ref(false)
export const postLocation = ref()

//methods

export const locationSuccess = result => {
  postLocation.value = result.data.city
  console.log(postLocation.value)
  if (result.data.country) {
    postLocation.value += `, ${result.data.country}`
  }
  locationLoading.value = false
  return postLocation.value
}

export const locationError = () => {
  Dialog.create({
    title: 'Error',
    message: 'Sorry, could not find your location'
  })

  locationLoading.value = false
}



