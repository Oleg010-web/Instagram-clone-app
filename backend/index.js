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
const { getStorage } = require('firebase-admin/storage')
const busboy = require('busboy')
const path = require('path')
const os = require('os')
const fs = require('fs')
const UUID = require('uuid-v4')

// config-express

const app = express()
const port = 3000

// config - firebase

const serviceAccount = require('./serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://social-media-on-quasar.appspot.com'
})

const db = getFirestore()
const bucket = getStorage().bucket()

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
  let uuid = UUID()

  const bb = busboy({ headers: request.headers })
  let fields = {}
  let fileData = {}
  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    )
    const filePath = path.join(os.tmpdir(), filename)
    file.pipe(fs.createWriteStream(filePath))
    fileData = { filePath, mimeType }
  })
  bb.on('field', (name, val, info) => {
    fields[name] = val
  })
  bb.on('close', () => {
    bucket.upload(
      fileData.filePath,
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, uplodadFile) => {
        if (!err) {
          createDocument(uplodadFile)
        }
      }
    )
    function createDocument (uplodadFile) {
      db.collection('posts')
        .doc(fields.id)
        .set({
          id: fields.id,
          caption: fields.caption,
          location: fields.location,
          date: parseInt(fields.date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uplodadFile.name}?alt=media&token=${uuid}`
        })
        .then(() => {
          response.send('post added: ' + fields.id)
        })
    }

    // response.writeHead(303, { Connection: 'close', Location: '/' });
  })
  request.pipe(bb)
})

// listen

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
