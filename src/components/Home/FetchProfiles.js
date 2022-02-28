import React from "react";
import { useCollection } from "../../hooks/useCollection";
import SearchProfiles from "./SearchProfiles";
import Navbar from "../UI/Navbar";

export default function FetchProfiles() {
  const { isPending, error, documents } = useCollection("users");

  return (
    <>
      <Navbar />
      <h1 className="flex justify-center mx-auto pt-16 text-5xl font-bold">
        Geeks
      </h1>
      <SearchProfiles />
      <div
        className="sm:flex flex-wrap flex-col md:flex-row justify-center text-center gap-1"
      >
        {isPending && <div>Loading users...</div>}
        {error && <div>{error}</div>}
        {documents &&
          documents.map((user) => (
            <>
              {user.isAGeek && (
                <div
                  key={user.id}
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white
                   mt-6 h-84 shadow-lg rounded-lg border-4 border-[#DADDFC]"
                >
                  <div className="flex-shrink-1">
                    <div className="text-center mb-4 opacity-90">
                      {user.photoURL && (
                        <img
                          className="mx-auto object-cover rounded-full h-32 w-32"
                          src={user.photoURL}
                          alt=""
                        />
                      )}
                      {!user.photoURL && <img src="./default.png" alt="" />}
                    </div>
                  </div>
                  <div className="text-3xl sm:text-2xl text-[#2E4C6D] font-bold py-2">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xl text-gray-400 ">{user.jobTitle}</div>
                  <div>
                    <p className="text-[#FC997C] text-lg font-bold">Skills</p>
                    <ul className="container mx-auto grid grid-cols-2 gap-1 mb-6 text-lg">
                      {user.skills &&
                        user.skills.map &&
                        user.skills.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                    </ul>
                  </div>
                  <a
                    className="bg-[#2E4C6D] px-8 py-2 rounded-3xl text-gray-100
                  font-semibold tracking-wide text-sm"
                    href={`/publicprofile/${user.id}`}
                  >
                    See My Profile
                  </a>
                </div>
              )}
            </>
          ))}
      </div>
    </>
  );
}
