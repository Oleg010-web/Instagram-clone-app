import axios, * as others from 'axios'
import { ref } from 'vue'

export const loadingData = ref(false)
export const preLoaderStatus = ref(false)

export async function getAllPosts () {
  const SERVER_URL = 'http://localhost:3000/posts'
  preLoaderStatus.value = true
  return axios
    .get(SERVER_URL)
    .then(Response => {
      preLoaderStatus.value = false
      return Response.data
    })
    .catch(Error => {
      console.log(Error)
      preLoaderStatus.value = false
      loadingData.value = true
      return Error.response.data.Error
    })
}
