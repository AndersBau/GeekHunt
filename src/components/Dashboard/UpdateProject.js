import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
/*
So far we have passed the setEditing prop to index.js.
Now we are going to pass the currentItem prop
*/
const UpdateProject = ({ setEditing, currentItem, updateItem }) => {
  /*
  Sets the state of the project to the current project
  */
  const [project, setItem] = useState(currentItem);
  const [assignedUsers, setAssignedUsers] = useState([])
  /*Assign function*/
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  /*map through the array of all users*/
  useEffect(() => {
    if (documents) {
      const userOptions = documents.map(user => {
        return { value: { ...user, id: user.id }, label: user.displayName }
      })
      setUsers(userOptions)
    }
  }, [documents])
  /*
  Side effect is that without UseEffect if you start editing one project,
  then try to switch to another project, nothing will happen.
  The component is already open, and although the state
  on the parent has changed, it's not registered down to the props.
  We want to let the UpdateItem form component know the props have changed.
  With the Effect Hook, we create a callback function that updates the project
  state with the new prop thats being sent through.
  */
  useEffect(() => {
    setItem(currentItem);
    // console.log("useEffect passes the currentItem: ", currentItem);
  }, [currentItem]);

  const onSubmit = e => {
    e.preventDefault();
    // console.log("onSubmit passes the id and items", project);
    updateItem({ currentItem }, project);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setItem({ ...project, [name]: value });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col m-6 item-center p-4">
        <p className="mb-2 mt-2 font-semibold text-xl">New Name</p>
        <input type="text" name="name" value={project.name} onChange={onChange} placeholder="Edit Name"
          className="border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"

        />
        <p className="mb-2 mt-2 font-semibold text-xl">New Category</p>
        <input type="text" name="category" value={project.category} onChange={onChange} placeholder="Edit Category"
          className="border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        />
        <p className="mb-2 mt-2 font-semibold text-xl">New Details</p>
        <textarea
          type="text"
          name="details"
          placeholder="Edit Details"
          value={project.details}
          onChange={onChange}
          className="mb-2 mt-2 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
        />
        <p className="mb-4 font-semibold text-xl">Re-Assign</p>
        <Select
          onChange={(userOption) => setAssignedUsers(userOption)}
          options={users}
          isMulti
          placeholder="Who will be in your team?"
          className="mb-6 font-mono font-light"
        />
        <button className="p-3 pl-5 pr-5 bg-yellow-500 text-gray-100 text-lg rounded-lg focus:border-4 border-yellow-300 mb-3">Update</button>
        <button className="p-2 pl-5 pr-5 bg-transparent border-2 border-yellow-500 text-yellow-500 text-lg rounded-lg hover:bg-yellow-500 hover:text-gray-100 focus:border-4 focus:border-yellow-300" onClick={() => setEditing(false)}>Cancel</button>
      </form>
    </>
  );
};
export default UpdateProject
