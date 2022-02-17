import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { timestamp } from '../../firebase/fbConfig'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import Sidebar from './Sidebar'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

const statuses = [
  { value: 'Closed', label: 'Closed' },
  { value: 'In progress', label: 'In progress' },
  { value: 'Show Stopper', label: 'Show Stopper' },
  { value: 'Urgent', label: 'Urgent' },
]

export default function CreateProject() {
  /**history hooks from react-router-dom */
  const history = useHistory()
  /**Add project collection to firestore */
  const { addDocument, response } = useFirestore('projects')
  /*Assign function*/
  const { documents } = useCollection('users')
  // console.log('All users', documents);
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)


  /*map through the array of all users*/
  useEffect(() => {
    if (documents) {
      const userOptions = documents.map(user => {
        return { value: { ...user, id: user.id }, label: user.displayName }
      })
      setUsers(userOptions)
    }
  }, [documents])
  // console.log('users', users)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    /**Catching form error */
    if (!category) {
      setFormError('Please select a project category')
      return
    }
    // if(assignedUsers.length < 1) {
    //   setFormError('Please assign the project to at least 1 user')
    //   return
    // }
    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
    const project = {
      name,
      details,
      assignedUsersList,
      createdBy,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: []
    }
    // console.log(name, details, dueDate, category.value, assignedUsers)
    // console.log('project object', project);
    /**Add document to firestore */
    await addDocument(project)
    if (!response.error) {
      history.push('/dashboard')
    }
  }


  return (
    <div className="flex flex-row h-screen">
    <Sidebar/>
    <div className="flex-auto flex-col bg-slate-100 rounded-md h-screen">
      <div className="create-form flex flex-col items-center mt-12 mx-6 px-6 border rounded-xl shadow-lg h-4/5 bg-slate-50 overflow overflow-auto resize">
        <h2 className="page-title text-center text-6xl text-slate-600 font-mono font-extrabold uppercase mt-12">Create a new Project</h2>
        <form className="w-3/4 mb-24" onSubmit={handleSubmit}>
          <div className="mt-8 p-6 flex flex-col w-full">
            <h1 className="font-mono font-semibold">Project Name:</h1>
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 font-mono font-light text-gray-600 dark:text-gray-400 mb-6"
              placeholder="What do you call this project?"
            />
            <h1 className="font-mono font-semibold">Project Description:</h1>
            <textarea
              required
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              rows="5"
              placeholder="Tell the world more about what you're building"
              className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 font-mono font-light text-gray-600 dark:text-gray-400 mb-6"
            />
            <label>
              <h1 className="font-mono font-semibold">Set due date:</h1>
              <input
                required
                type="date"
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
                className="w-full mb-6 rounded-sm"
              />
            </label>
            <label>
              <h1 className="font-mono font-semibold">Project Category:</h1>
              <Select
                onChange={(option) => setCategory(option)}
                options={categories}
                placeholder="Project Category"
                className="w-1/2 mb-6 font-mono font-light"
              />
            </label>
            {/* <label>
              <h1 className="font-mono font-semibold">Status</h1>
              <Select
                onChange={(option) => setStatus(option)}
                options={statuses}
                placeholder="Status"
                className="w-1/2 mb-6 font-mono font-light"
              />
            </label> */}
            <label>
              <h1 className="font-mono font-semibold">Assign To:</h1>
              <Select
                onChange={(userOption) => setAssignedUsers(userOption)}
                options={users}
                isMulti
                placeholder="Who will be in your team?"
                className="w-1/2 mb-6 font-mono font-light"
              />
            </label>
            <button className="w-64 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
              <span className="mx-auto font-mono font-semibold">Add Project</span>
            </button>
          </div>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
      </div>
    </div>
  )
}
