//imports
import axios, * as others from 'axios'
import { successfulPostAdded, postError } from 'src/state/post'

//methods
export async function sendPost (data) {
  const SERVER_URL_POST = `${process.env.API}/createPost`
  return axios
    .post(SERVER_URL_POST, data)
    .then(response => {
      successfulPostAdded()
      return response.data
    })
    .catch(err => {
      postError()
    })
}
