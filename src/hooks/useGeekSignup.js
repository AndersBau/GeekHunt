import { useState, useEffect, useDebugValue } from 'react'
import { projectAuth, projectFirestore, projectStorage } from '../firebase/fbConfig'
import { useAuthContext } from './useAuthContext'

export const useGeekSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()



  const signup = async (email, password, firstName, lastName, picture, jobTitle, description, skills, linkedInUrl, gitHubUrl) => {
    setError(null)
    setIsPending(true)

    const getImageUrl = async (uid, picture) => {
      if (!picture) {
        return Promise.resolve('/default.png')
      }

      const uploadPath = decodeURIComponent(`pictures/${uid}/${picture.name.replaceAll(' ', '')}`)

      const img = await projectStorage.ref(uploadPath).put(picture)
      const downloadURL =  await img.ref.getDownloadURL()

      return Promise.resolve(downloadURL)
    };

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      /**For testing
             console.log(res.user);
            */
      if (!res) {
        throw new Error('Could not complete signup')
      }

      //upload user profile picture
      const userPic = picture ? picture : null
      const imgUrl = await getImageUrl(res.user.uid, userPic)


      await res.user.updateProfile({ firstName, photoURL: imgUrl })

       // create a user document
       await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        isAGeek: true,
        firstName,
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
      dispatch({ type: 'SIGNIN', payload: res.user })

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

  return { signup, error, isPending }
}
