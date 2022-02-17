import React, { useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Navbar from "../UI/Navbar";
import NavbarCopy from "../UI/NavbarCopy"
const EditProfile = () => {

  const { user } = useAuthContext();
  const { document, error } = useDocument('users', user.uid);


if(!document) {
  return (<div>"loader bar here "</div>)
}


  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-100 justify-center w-screen">
        <div className="flex flex-col sm:flex-col w-5/6  justify-center text-center md:text-left text-gray-700">
          <div className=" flex flex-col sm:flex-row w-full sm:h-96 md:h-60 border-4 border-[#DADDFC] rounded-xl shadow-lg mt-4 p-6">
            <div className="flex flex-col justify-center items-center w-full sm:w-1/3 border-1  h-full rounded-lg">
              <img
                src={document.photoURL}
                className="rounded-full w-28 shadow-lg"
                alt="Avatar"
              />

              <Link to={`/editprofile/${user.uid}`}>
                <button className="h-10 w-full rounded-lg px-2 my-2  bg-[#DADDFC]">
                  Edit Profile
                </button>
              </Link>
              <Link to={`/publicprofile/${user.uid}`}>
                <button className="h-10 w-full rounded-lg px-2 my-2  bg-[#DADDFC]">
                  Preview public Profile
                </button>
              </Link>
            </div>
            <div className="flex flex-col text-xl font-bold  justify-center text-center  md:text-left md:px-4">
              <p>{document.displayName}</p>
              <p>{document.jobTitle}</p>
              <p>{document.email}</p>
              <Link
                to="/dashboard"
                className="h-10 justify-center w-full rounded-xl my-2  bg-[#2E4C6D] text-center"
              >
                <button className="h-10 justify-center text-center text-white ">
                  My Dashboard
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col rounded-lg  md:flex-rows w-full h-60 border-4 border-[#DADDFC] shadow-lg mt-2 p-4">
            <h2>Projects</h2>
              photos

          </div>

          <div className="flex flex-col rounded-lg  md:flex-rows w-full h-60 border-4 border-[#DADDFC] shadow-lg mt-2 p-4">
            <h2>Description</h2>
            <p
              className="
              rounded-lg m-2
              h-full
              w-full
              px-3
              py-1.5
              text-base
              font-normal"
            >
              {document.description}
            </p>
          </div>

          <div className="flex flex-col border-4 border-[#DADDFC] rounded-xl shadow-lg  md:flex-rows w-full h-40 my-2 p-4">
            <h2>Skills</h2>
            <p
              className="rounded-lg m-2
              w-full
              h-20
              px-3
              py-1.5
              text-base
              font-normal"
            >
              {document.skills}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default EditProfile;
