import { useState } from "react"
import { timestamp } from "../../firebase/fbConfig"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../UI/Avatar"
import Sidebar from "../Dashboard/Sidebar"
import { Link } from "react-router-dom"
export default function AllMessages({ conversation }) {
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('conversations') //not sure what this does
    const [newMessage, setNewMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const messageToAdd = {
            senderId: user.uid,
            senderName: user.displayName,
            message: newMessage,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        await updateDocument(conversation.id, {
            messages: [...conversation.messages, messageToAdd]
        })
        if (!response.error) {
            setNewMessage('')
        }
    }

    return (
        <div className="flex flex-row h-screen w-screen">
            <Sidebar />
            <div className="flex flex-auto items-center justify-center">
                <div className="bg-blue-100 h-5/6 w-3/4 shadow-xl rounded-xl flex-col overflow overflow-auto">
                <div className="flex flex-row justify-between p-6">
                    <h4 className="text-3xl font-bold ml-12 mt-4 "> Conversation Messages </h4>
                    <Link to="/allconversations">
                        <button type="submit" className=" border border-blue-600 rounded-full font-bold text-blue-600 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 m-3">
                            All Conversations
                            <svg xmlns="http://www.w3.org/2000/svg" class="inline ml-2 w-6 stroke-current text-white stroke-2" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                    </Link></div>
                    <div className="flex flex-col px-12 justify-between">
                        <div className="flex flex-col m-6 overflow overflow-auto">
                            {conversation.messages.length > 0 && conversation.messages.map(msg => (
                                <div key={msg.id} className='flex flex-row m-1 space-x-6 border rounded-full bg-transparent bg-yellow-50 shadow-md'>

                                    <div className='ml-6'>
                                        <p className="text-lg font-extrabold font-mono">{msg.senderName} </p>
                                    </div>
                                    <div className='message-content'>
                                        <p> {msg.message} </p>
                                    </div>

                                </div>
                            ))}

                            <form className="flex flex-col pt-6" onSubmit={handleSubmit}>
                                <textarea
                                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 font-mono font-light text-gray-600 dark:text-gray-400 mb-6"
                                    onChange={(e) => setNewMessage(e.target.value)} value={newMessage} placeholder="say something nice" ></textarea>
                                <button type="submit" className=" bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6 ml-6">
                                    Send
                                    <svg xmlns="http://www.w3.org/2000/svg" class="inline ml-2 w-6 stroke-current text-white stroke-2" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
