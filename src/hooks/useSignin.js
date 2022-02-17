import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/fbConfig'
import { useAuthContext } from './useAuthContext'

export const useSignin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signin = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // signin
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      // update online status
      const documentRef = projectFirestore.collection('users').doc(res.user.uid)
      await documentRef.update({ online: true })

      // dispatch signin action
      dispatch({ type: 'SIGNIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signin, isPending, error }
}
