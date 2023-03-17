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
const { getStorage } = require('firebase-admin/storage');
const busboy = require('busboy');

// config-express

const app = express()
const port = 3000

// config - firebase

const serviceAccount = require('./serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://social-media-on-quasar.appspot.com'
})

const db = getFirestore();
const bucket = getStorage().bucket();

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
 
  const bb = busboy({ headers: request.headers });
  let fields = {}
  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    file.on('data', (data) => {
      console.log(`File [${name}] got ${data.length} bytes`);
    }).on('close', () => {
      console.log(`File [${name}] done`);
    });
  });
  bb.on('field', (name, val, info) => {
    fields[name] = val
  });
  bb.on('close', () => {
    db.collection('posts').doc(fields.id).set({
      id: fields.id,
      caption: fields.caption,
      location: fields.location,
      date: parseInt(fields.date),
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/social-media-on-quasar.appspot.com/o/Drottningholm.jpeg?alt=media&token=477b97a4-bd3b-47aa-9ced-9bc1cba25261'
    });
    // response.writeHead(303, { Connection: 'close', Location: '/' });
    response.send('Done!')
  });
  request.pipe(bb);
})


// listen

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
