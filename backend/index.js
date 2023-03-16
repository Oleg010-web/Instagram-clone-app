// dependencies

const express = require('express')
const {
  initializeApp,
  applicationDefault,
  cert
} = require('firebase-admin/app')
const {
  getFirestore,
  Timestamp,
  FieldValue
} = require('firebase-admin/firestore')

// config-express

const app = express()
const port = 3000

// config - firebase

const serviceAccount = require('./serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

// endpoint - posts

app.get('/posts', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  let posts = []
  db.collection('posts')
    .orderBy('date', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        posts.push(doc.data())
      })
      response.send(posts)
    })
})

// endpoint - createPost

app.post('/createPost', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
 
  response.send(request.headers)
})


// listen

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
