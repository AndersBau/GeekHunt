import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/fbConfig"

export const useAllConversations = (id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  
  console.log(id)
  // realtime document data
  useEffect(() => {
    const conversationsRef = projectFirestore.collection('conversations')
    let userConversations = conversationsRef.where('users', 'array-contains', id)
    
    const unsubscribe = userConversations.onSnapshot(snapshot => {
      // need to make sure the doc exists & has data
      let results = [];
      if(snapshot.docs) {
        snapshot.docs.forEach(doc => {
          results.push({...doc.data(), id: doc.id})
        })
        setDocument(results)
        setError(null)
      }
      else {
        setError('No such document exists')
      }
    }, err => {
      console.log(err.message)
      setError('failed to get document')
    })
    
    return () => unsubscribe()
    
  }, [id])

  return { document, error }
}
