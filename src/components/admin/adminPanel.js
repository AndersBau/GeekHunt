import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore"
import { useDocument } from "../../hooks/useDocument";
import { Link } from "react-router-dom";



const AdminPanel = () => {

  const { user } = useAuthContext();
  const { document, error } = useDocument('users', user.uid);
  const { deleteDocument, updateDocument } = useFirestore('users')

  const addOneUser = () => {
    console.log("One user added");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${e} users Added`);
  }

  const deleteOneUser = () => {
    console.log("One user deleted");
  }

  const deleteAllUsers = () => {
    // deleteDocument(user.uid);
    console.log("All Users Deleted")

  }
  return (
    <div className="bg-purple-700 py-32 px-10 min-h-screen">
      <div className="bg-gray-200 rounded-lg p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <div className="w-full  sm:text-right">
        <button
            onClick={() => addOneUser()}
            className="py-3 px-8 bg-blue-600 text-white w-full mt-7"
          >
            Add One User
          </button>
          <div>
          <form className="text-center" onSubmit={handleSubmit}>
          <button
            className="py-3 px-8 bg-blue-600 text-white w-full mt-7"
          >
            Add Multiple Users
          </button>
          <input
              type="text"
              id="userQty"
              name="userQty"
              placeholder="userQty"
              defaultValue={0}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 rounded-lg
              mt-4
                text-gray-600 placeholder-gray-400
                outline-none px-2"
            />
          </form>
          </div>
          <button
            onClick={() => deleteOneUser()}
            className="py-3 px-8 bg-red-600 text-white w-full mt-7"
          >
            Delete One User
          </button>
          <button
            onClick={() => deleteAllUsers()}
            className="py-3 px-8 bg-red-600 text-white w-full mt-7"
          >
            Delete All users
          </button>
        </div>
      </div>
    </div>
  );
}


export default AdminPanel;
