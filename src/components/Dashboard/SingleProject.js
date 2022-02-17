import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import ProjectComments from "./ProjectComments"

import ProjectSummary from "./ProjectSummary"
import Sidebar from "./Sidebar"

export default function SingleProject() {
  const { id } = useParams()
  const { document, error } = useDocument('projects', id)

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }


  return (<div className="flex flex-row h-screen">
    <Sidebar />
    <div className="flex-auto flex-col bg-slate-100 rounded-md h-full">
    <div className="project-details flex flex-col items-center mt-24 mx-24 px-12 border rounded-xl shadow-xl bg-blue-50 overflow overflow-auto h-5/6 resize">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
</div>
  </div>
  )
}
