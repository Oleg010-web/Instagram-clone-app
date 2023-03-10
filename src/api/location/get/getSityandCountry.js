//imports

import axios, * as others from 'axios'
import { locationSuccess, locationError } from 'src/state/location'

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
