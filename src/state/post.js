// imports
import { Dialog, Notify  } from 'quasar'



//methods
export const postError = () => {
    Dialog.create({
      title: 'Error',
      message: 'Sorry, could not create post'
    })
  }

export const successfulPostAdded = () => {
    Notify.create({
        message: 'Your post added.',
        color: 'primary',
        actions: [
          { label: 'Dismiss', color: 'white' }
        ]
      })
}