import  {firebase, projectFirestore, projectAuth} from '../firebase/fbConfig';
import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

// const auth = firebase.auth();
// const firestore = firebase.firestore();

export const useSendMessage = async (message) => {
        try {
            const messagesRef = projectFirestore.collection('messages');
            const { uid } = projectAuth.currentUser;
            console.log('THE USER ID: ', uid)
            
            await messagesRef.add({
                text: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                //recepientId: recipientUserId,
                senderId: uid
            })
            
        } catch (err) {
            console.log('ERROR INSIDE sendMessage Hook: ', err)
        }
}

//const SEND_MESSAGE = 'SEND_MESSAGE'

// export const useSendMessage = () => {
    
//     const { dispatch } = useAuthContext()
    
//     const sendMessage = async (message, recipientUserId) => {
//         try {
//             const messagesRef = firestore.collection('messages');
//             const { uid } = auth.currentUser;
//             console.log('THE USER ID: ', uid)
            
//             await messagesRef.add({
//                 text: message,
//                 createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//                 recepientId: recipientUserId,
//                 senderId: uid
//             })
            
//         } catch (err) {
//             console.log('ERROR INSIDE sendMessage Hook: ', err)
//         }
        
//     }
// }