//NOT USING IT NOW

// import  {firebase, projectFirestore, timestamp} from '../firebase/fbConfig';
// import { useState, useEffect } from 'react'
// import {useAuthContext } from './useAuthContext'

// export const useNewConversation = (userId, title, message) => {
//     const { user } = useAuthContext()
//     const conversationsRef = projectFirestore.collection('conversations');
//     useEffect(() => { 
//         const conversationToCreate = {
//             users: [userId, user.uid],
//             messages: [message],
//             createdAt: timestamp.fromDate(new Date()),
//             updatedAt: timestamp.fromDate(new Date()),
//             title: title,
//         }
//         conversationsRef.add(conversationToCreate)
        
//     }, [userId, title, message])
    
// }