import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore, projectStorage } from '../firebase/fbConfig'
import { useAuthContext } from './useAuthContext'

export const useGeekUpdate = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()



  const update = async (email, password, displayName, lastName, picture, jobTitle, description, skills, linkedInUrl, gitHubUrl) => {
    setError(null)
    setIsPending(true)

    // const getImageUrl = async (uid, picture) => {
    //   if (!picture) {
    //     return Promise.resolve('/default.png')
    //   }

    //   const uploadPath = `pictures/${uid}/${picture}`
    //   const img = await projectStorage.ref(uploadPath).put(picture)
    //   return await img.ref.getDownloadURL()
    // };

    try {
      // signin
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      // update online status

      /**For testing
             console.log(res.user);
            */
      if (!res) {
        throw new Error('Could not complete signup')
      }

      //upload user profile picture
      // const userPic = picture ? picture.name : null
      // const imgUrl = await getImageUrl(res.user.uid, userPic)
      const uploadPath = `pictures/${res.user.uid}/${picture.displayName}`
      const img = await projectStorage.ref(uploadPath).put(picture)
      const imgUrl = await img.ref.getDownloadURL()
      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

       // create a user document
       await projectFirestore.collection('users').doc(res.user.uid).put({
        online: true,
        isAGeek: true,
        displayName,
        email,
        lastName,
        photoURL: imgUrl,
        jobTitle,
        description,
        skills,
        linkedInUrl,
        gitHubUrl
      })

      // dispatch signin action
      dispatch({ type: 'UPDATED_DOCUMENT', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      /**For testing
       console.log(err.message);
      */
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { update, error, isPending }
}
