import { firebase, projectFirestore, timestamp } from '../../firebase/fbConfig';
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useAllConversations } from '../../hooks/useAllConversations'
import { useNewConversation } from '../../hooks/useNewConversation'
import { Link } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar"
import SingleConversation from './SingleConversation';

export default function AllConversations() {
  const { user } = useAuthContext()
  const [newMessage, setNewMessage] = useState('')
  const [newUser, setNewUser] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const conversationsRef = projectFirestore.collection('conversations');
  const { document, error } = useAllConversations(user.uid)

  if (error) {
    return <div className="error">{error}</div>
  }
  else if (!document) {
    return <div className="loading">Loading...</div>
  }
  else {

    // Using the hook
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   await useNewConversation(newUser, newTitle, newMessage)
    //   console.log(e)
    //   console.log('FormValues: ', newUser, newTitle, newMessage)
    // }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const conversationToCreate = {
        users: [newUser, user.uid],
        messages: [newMessage],
        createdAt: timestamp.fromDate(new Date()),
        updatedAt: timestamp.fromDate(new Date()),
        title: newTitle,
      }
      await conversationsRef.add(conversationToCreate)
    }

    return (
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-auto bg-white-200 items-center justify-center">
          <div className="bg-blue-100 h-4/5 w-3/4 shadow-xl rounded-xl flex-col m-6 overflow overflow-auto resize">
            <div className="flex flex-col ml-8 p-6 justify-between">
              <h3 className="text-3xl font-bold "> Start a new conversation </h3>
              <form className="flex flex-col space-y-3"
                onSubmit={handleSubmit}>
                <input
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle}
                  placeholder="Title"
                  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 font-mono font-light text-gray-600 dark:text-gray-400 mb-6"
                />
                <input
                  onChange={(e) => setNewUser(e.target.value)}
                  value={newUser}
                  placeholder="Who do you want to reach"
                  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 font-mono font-light text-gray-600 dark:text-gray-400 mb-6"
                />
                <textarea
                  required
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 font-mono font-light text-gray-600 dark:text-gray-400"
                  placeholder="First Message" />
                <button type="submit" className="flex flex-grow-0 bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 w-24 mr-6 mb-12">
                  Send
                  <svg xmlns="http://www.w3.org/2000/svg" class="inline ml-2 w-6 stroke-current text-white stroke-2" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              </form>
              <h1 className="text-2xl font-medium mt-4 mb-4"> All Conversations </h1>
              {document.map(conv => (
                <Link to={`/conversations/${conv.id}`} key={conv.id}>
                  <div class="p-2" key={conv.id}>
                    <div class="inline-flex items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-teal text-sm w-5/6">
                      <span class="inline-flex bg-blue-600 text-white rounded-full h-6 px-3 justify-center items-center">{conv.title}</span>
                      <span class="inline-flex px-2">{conv.messages[0].message}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          {/* <SingleConversation /> */}
          </div>
        </div>
      </div>
    )
  }
}
