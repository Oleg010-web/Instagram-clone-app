export const dataUrItoBlob = dataUri => {
  let binary = atob(dataUri.split(',')[1])
  let mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0]
  let array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: mimeString })
}
