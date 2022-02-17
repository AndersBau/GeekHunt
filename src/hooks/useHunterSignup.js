import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore} from '../firebase/fbConfig'
import { useAuthContext } from './useAuthContext'

export const useHunterSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, lastName, PersonalOrCompany) => {
    setError(null)
    setIsPending(true)
    console.log('hunterhook.....',(email, password, displayName, lastName, PersonalOrCompany))

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

    
      if (!res) {
        throw new Error('Could not complete signup')
      }

       // create a user document
       await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        isAGeek: false,
        displayName,
        email,
        lastName,
        PersonalOrCompany
      })
      console.log('hunter State:', res.user);
      // dispatch signin action
      dispatch({ type: 'SIGNIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
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