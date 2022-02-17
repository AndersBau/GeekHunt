import { useCollection } from '../../hooks/useCollection'
import Notification from './Notification'

// components
import AllProjects from './AllProjects'
import Sidebar from './Sidebar'
import DashboardNav from './DashboardNav'
import OnlineUsers from '../Users/OnlineUsers'

export default function Dashboard() {
  const { documents, error } = useCollection('projects')
  const { doc, err } = useCollection('notifications')

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex-auto flex-col bg-slate-100 rounded-md h-full">
        <DashboardNav />
        <div className="flex flex-row p-4 space-x-6 h-4/5 justify-center items-center ">

            {error && <p className="error">{error}</p>}
            {documents && <div className="bg-blue-100 border-slate-200 p-8 flex-wrap overflow overflow-auto rounded-3xl shadow-md resize"><AllProjects projects={documents} /></div>}
            {!documents && <p>No projects to show</p>}
          {/* <div className="bg-green-200 border-slate-200 w-1/2 p-8 flex-wrap overflow overflow-auto rounded-3xl shadow-md">
            Report
          </div> */}

        </div>
      </div>

      <div className="submenu w-64 h-full bg-slate-100 flex flex-col space-y-12 resize">
        {/* <div className="bg-yellow-200 h-72 w-64 rounded-md shadow-md mt-2 p-2">Todo List</div> */}
        <Notification notification={doc} />
        <OnlineUsers/>
      </div>
    </div>
  )
}
