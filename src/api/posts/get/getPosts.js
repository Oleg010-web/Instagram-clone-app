import axios, * as others from 'axios'

export async function getAllPosts () {
  const SERVER_URL = 'http://localhost:3000/posts'

  const data = axios.get(SERVER_URL).then(Response => {
    if (Response.data) {
      return Response.data
    }
  })
  return data
}
