import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Avatar from '../UI/Avatar'
import DetailsModal from './DetailsModal'

export default function AllProjects({ projects }) {
  // console.log('projects', projects)
  const [modal, setModal] = useState(false)
  return (
    <div className="flex justify-center flex-wrap p-1">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => (
        <div className="flex flex-col m-2" key={project.id}>
          <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
            <div className="py-3 px-6 border-b border-gray-300">
              <h1 className="font-semibold text-xl">{project.name}</h1>
            </div>
            <Link to={`/projects/${project.id}`} key={project.id}>
              <div className="p-6" key={project.id}>
                {/* <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {project.name}</h5> */}
                <p className="text-gray-700 text-base mb-4">
                  {project.details}
                </p>
              </div>
            </Link>
            <div className="assigned-to">
              <p><strong>Assigned to:</strong></p>
              <ul>
                {project.assignedUsersList.map(user => (<>
                  {/* <li key={user.photoURL}>
                    <Avatar src={user.photoURL} />
                  </li> */}
                  <p className="text-md font-mono font-semibold text-cyan-900">{user.displayName}</p>
                  </>
                ))}
              </ul>
            </div>
            <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
              <p>Due by {project.dueDate.toDate().toDateString()}</p>
            </div>
          </div>
          {/* <button className="text-gray-900 bg-orange-300 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-b-lg text-sm px-5 py-2.5 justify-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700" type="button"
            onClick={() => setModal(true)}
          >Quick View</button> */}
        </div>
      ))}
    </div>
  )
}
