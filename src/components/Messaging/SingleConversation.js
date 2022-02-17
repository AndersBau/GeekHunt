import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import Sidebar from "../Dashboard/Sidebar"
import AllConversations from "./AllConversations"
import AllMessages from "./AllMessages"
import { useAllConversations } from '../../hooks/useAllConversations'
import { firebase, projectFirestore, timestamp } from '../../firebase/fbConfig';
import { useAuthContext } from "../../hooks/useAuthContext"

export default function SingleConversation() {
  const { user } = useAuthContext()
  const { id } = useParams()
  const { document, error } = useDocument('conversations', id)
  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }


  return (
    <div className="h-screen flex flex-row">
      <div className="flex flex-auto justify-center items-center border-lg">
        {/* <AllConversations document={doc}/> */}
        <AllMessages conversation={document} />
      </div>
    </div>
  )
}
