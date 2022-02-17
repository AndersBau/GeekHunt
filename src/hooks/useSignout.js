import { useEffect, useState } from 'react'
import { projectAuth, projectFirestore, } from '../firebase/fbConfig'
import { useAuthContext } from './useAuthContext'

export const useSignout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signout = async () => {
    setError(null)
    setIsPending(true)

    try {
      const user = projectAuth.currentUser.uid

      // sign the user out
      await projectFirestore.collection('users').doc(user).update({
        online: false,
      })
      await projectAuth.signOut()
      // dispatch signout action
      dispatch({ type: 'SIGNOUT' })

      // update state
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

  return { signout, error, isPending }
}
