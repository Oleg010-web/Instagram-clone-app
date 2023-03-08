//imports
import { ref } from 'vue'
import { Dialog } from 'quasar'
import axios, * as others from 'axios'

//data refs
export const locationLoading = ref(false)
export const postLocation = ref()

//methods
export const getSityandCountry = async position => {
  let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
  await axios
    .get(apiUrl)
    .then(Result => {
      locationSuccess(Result)
    })
    .catch(Error => {
      locationError()
    })
}

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
