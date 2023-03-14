//imports
import axios, * as others from 'axios'


//methods
export async function getAllPosts () {
  const SERVER_URL = 'http://localhost:3000/posts'
  return axios
    .get(SERVER_URL)
    .then(Response => {
      return Response.data
    })
    .catch(Error => {
      console.log(Error)
      return Error.response
    })
}
