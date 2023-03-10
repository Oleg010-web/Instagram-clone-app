// dependencies

const express = require('express')

// config-express

const app = express()
const port = 3000

// endpoint - posts

app.get('/posts', (request, response) => {
  let posts = [
    {
      caption: 'Golden Gate Bridge',
      location: 'San Francisco'
    },
    {
      caption: 'Drottningholm',
      location: 'Stockholm'
    }
  ]
  response.send(posts)
})

// listen

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
