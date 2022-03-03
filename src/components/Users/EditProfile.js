import React, {useEffect, useState} from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore"
import { useDocument } from "../../hooks/useDocument";
import { Link } from "react-router-dom";
import Navbar from "../UI/Navbar";


const EditProfile = () => {

  const { user } = useAuthContext();
  const { document, error } = useDocument('users', user.uid);
  const [userInfo, setUserInfo ] = useState(document)
  const { deleteDocument, updateDocument } = useFirestore('users')


   const [updateMessage, setUpdateMessage] = useState("")

    useEffect(() => {
      setUserInfo(document)
    }, [document])

    const updated = () => {
      setUpdateMessage("Your Profile has been updated")
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
    updateDocument(user.uid, userInfo)
    updated()
  }
  const handleChange = (e) => {
    setUserInfo({...document, [e.target.name]: e.target.value})
  }

  const deleteAccount = () => {
    deleteDocument(user.uid);
  }

if(!document) {
  return (<div>"loader bar here "</div>)
} else {

}


  return (
    <div className="bg-white ">
      <div className="py-10">
      <div className="rounded-xl border-4 border-[#DADDFC] p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <div className="w-full  sm:text-right">
          <Link to={`/dashboard/${user.uid}`}>
            <button className="h-10 w-full sm:w-1/3 rounded-lg px-3 my-2 md:ml-5 sm:ml-5 text-white bg-[#396EB0]">
              Dashboard
            </button>
          </Link>
        </div>
        <img
          src={document.photoURL}
          className="rounded-full w-32 shadow-lg"
          alt="Avatar"
        />
        <form action="submit" onSubmit={handleSubmit} onChange={handleChange}>
          <div className="flex items-center mb-5">
            <label
              for="photoURL"
              class="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              Photo
            </label>
            <input
              type="file"
              id="URL"
              name="photoURL"
              placeholder="photo"
              className="flex-1 py-2  border-gray-400 focus:border-green-400
                text-gray-600 placeholder-gray-400
                outline-none"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="displayName"
              class="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              Name
            </label>

            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Name"
              defaultValue={document.displayName}
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400
                text-gray-600 placeholder-gray-400
                outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="lastName"
              className="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              defaultValue={document.lastName}
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400
                text-gray-600 placeholder-gray-400
                outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="email"
              className="inline-block w-20 mr-6 text-right
                           font-bold text-gray-600"
            >
              email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              defaultValue={document.email}
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400
                text-gray-600 placeholder-gray-400
                outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="password"
              className="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              // defaultValue={document}
              placeholder="password"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="jobTitle"
              className="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              defaultValue={document.jobTitle}
              placeholder="Job Title"
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="skills"
              class="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="description"
              defaultValue={document.description}
              class="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 h-40 placeholder-gray-400 outline-none px-2"
            />
          </div>

          <div className="flex items-center mb-5">
            <label
              htmlFor="skills"
              className="inline-block w-20 mr-6 text-right font-bold text-gray-600"
            >
              Skills
            </label>
            <textarea
              type="text"
              id="skills"
              name="skills"
              placeholder="skills"
              defaultValue={document.skills}
              className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none px-2 h-40 "
            />
          </div>

          <div className="text-right">
          <div className="h-10 w-full px-2 my-2 text-center justify-center ">{updateMessage}</div>
            <button className="py-3 px-8 bg-[#2E4C6D] text-white w-full hover:bg-[#396EB0]">
              Update
            </button>
          </div>
        </form>
        <button onClick={() => deleteAccount()} class="py-3 px-8 bg-red-700 text-white w-full mt-7 hover:bg-red-500">
              Delete Account
            </button>
      </div>
      </div>
    </div>
  );
}

export default EditProfile;
