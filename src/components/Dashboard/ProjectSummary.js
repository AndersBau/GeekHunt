import { useState } from "react"
import { useHistory } from "react-router-dom"
import Avatar from "../../components/UI/Avatar"
import { projectFirestore } from "../../firebase/fbConfig"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import { useCollection } from '../../hooks/useCollection'
import ProjectComments from "./ProjectComments"
import UpdateProject from "./UpdateProject"

export default function ProjectSummary({ project }) {
  // console.log('project', project);
  /* RETURN RESULTS 👇
  assignedUsersList: [{…}]
  category: "marketing"
  comments: (3) [{…}, {…}, {…}]
  createdAt: t {seconds: 1643839351, nanoseconds: 842000000}
  createdBy: {displayName: 'ab', photoURL: null, id: 'kHS7oki1SFQwmwfUmKBH0fQk5B42'}
  details: "werwer"
  dueDate: t {seconds: 1644969600, nanoseconds: 0}
  id: "x2jaKE4gxFrShLIMhXpo"
  name: "ewerwer"*/
  const { deleteDocument, updateDocument } = useFirestore('projects')
  const { documents } = useCollection('users')
  const [assignedUsers, setAssignedUsers] = useState([])
  const { user } = useAuthContext()
  const history = useHistory()

  //double-click to edit - a very extra functionality
  /*const [toggle, setToggle] = useState(true);
  const [text, setText] = useState('');

  function toggleInput() {
    setToggle(false);
  }

  function handleChange(event) {
    setText(event.target.value);
  }
*/
  const handleClick = () => {
    deleteDocument(project.id)
    history.push('/dashboard')
  }

  /*
 We don't know what is going to be edited so we set an
 empty set for the <UpdateProject /> form
 */
  const initialItemState = {
    id: null,
    name: "",
    details: "",
    category: "",
    assignedUsersList: []
  }
  /*
    Make a state for whether or not edit mode is turned on.
    It will begin as false.
   */
  const [editing, setEditing] = useState(false);
  /*
   Apply the empty initialItemState from above to a
   currentItem state. currentItem will be used for
   editing individual items.
   */
  const [currentItem, setCurrentItem] = useState(initialItemState);

  const editItem = item => {
    setEditing(true);
    setCurrentItem({
      id: null,
      name: "",
      details: "",
      category: "",
      assignedUsersList: []
    });
  };

  const updateItem = ({ currentItem }, updatedItem) => {
    // console.log(
    //   "It send the item to the updated item function:",
    //   updatedItem,
    //   currentItem.id
    // );
    setEditing(false);
    /* WITHOUT useFirestore({updateDocument})
      projectFirestore
       .collection("projects")
       .doc(project.id)
       .update(updatedItem);*/
    /**WITH useFirestore({updateDocument}*/
    updateDocument(project.id, updatedItem)
  };

  return (
    <div className="w-full">
      <h2 className="page-title text-left text-6xl text-slate-600 font-extrabold uppercase mt-12"
      >{project.name}</h2>
      <p className="text-left text-xl text-slate-600 font-bold uppercase">Created By {project.createdBy.displayName}</p>
      <p className="due-date text-left text-lg text-slate-600 font-normal">
        Project due by {project.dueDate.toDate().toDateString()}
      </p>
      <p className="details text-left text-lg text-slate-600 font-normal">
        {project.details}
      </p>
      <h4 className="text-left text-lg text-slate-600 font-normal">Project assigned to:</h4>
      <div className="assigned-users">
        {project.assignedUsersList.map(user => (
          <div key={user.id}>
            {/* <Avatar src={user.photoURL} /> */}
            <p className="text-left text-lg text-slate-600 font-normal uppercase">- {user.displayName}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 mb-12 flex flex-col w-1/2 space-y-3">
        {/* a button to open edit mode */}

        {user.uid === project.createdBy.id && <button className="p-2 pl-5 pr-5 bg-transparent border-2 border-blue-500 text-blue-500 text-lg rounded-lg hover:bg-blue-500 hover:text-gray-100 focus:border-4 focus:border-blue-300" onClick={() => editItem(project)}>Edit</button>}
        {/*
      We add a ternary operator to make the UpdateProject Form appear
      Only the person who created the project is able to edit the project.
      Same for Delete Button
       */}
        {user.uid === project.createdBy.id && editing && <>
          <UpdateProject setEditing={setEditing} currentItem={currentItem}
            updateItem={updateItem} /> </>}

        {user.uid === project.createdBy.id && (
          <button className="p-2 pl-5 pr-5 bg-red-500 text-gray-100 text-lg rounded-lg focus:border-4 border-red-300" onClick={handleClick}>Delete Project</button>
        )}
      </div>
    </div>
  )
}
