import { comment } from "postcss"
import { useState } from "react"
import { timestamp } from "../../firebase/fbConfig"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../UI/Avatar"

export default function ProjectComments({ project }) {
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore('projects')
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    })
    if (!response.error) {
      setNewComment('')
    }
  }

  return (
    <div className="project-comments text-left flex flex-col p-6 w-full">
      <h4 className="page-title text-left text-lg text-slate-600 font-extrabold uppercase mb-6">Project Comments</h4>

      <ul>
      {project.comments.length === 0 && <p className="text-left text-lg text-slate-600 font-normal">No comments to show</p>}
        {project.comments.length > 0 && project.comments.map(comment => (
          <li className="flex flex-col p-2 shadow-md rounded-lg mb-3 w-1/2 " key={comment.id}>
            <div className=" text-lg font-bold">
              {/* <Avatar src={comment.photoURL} /> */}
              <p>{comment.displayName}</p>
            </div>
            <div className="text-lg break-all">
              {comment.content}
            </div>
          </li>
        ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            className="bg-grey-50 border border-blue-500 placeholder-blue-700 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-blue-100 dark:border-blue-400 mb-6 shadow-md"
            placeholder="Add new comment"
          />
        <button className="p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300 shadow-lg">Add Comment</button>
      </form>
    </div>
  )
}
