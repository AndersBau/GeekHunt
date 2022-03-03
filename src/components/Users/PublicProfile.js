import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link, useParams, useHistory } from "react-router-dom";
import Navbar from "../UI/Navbar";
import { projectFirestore, timestamp } from "../../firebase/fbConfig";
import Swiper from 'swiper/bundle';
import "./publicProfile.css"
import 'swiper/css/bundle';

  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: true,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  let photos = [
    "https://picsum.photos/700/450",
    "https://picsum.photos/700/450",
    "https://picsum.photos/700/450"

  ]


const PublicProfile = () => {
  const { id } = useParams();
  let history = useHistory();
  const { user } = useAuthContext();
  const { document, error } = useDocument("users", id);

  let formView = false;
  const [showForm, setShowForm ]= useState(formView)


  const [newMessage, setNewMessage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const conversationsRef = projectFirestore.collection("conversations");

  const handleClick = (e) => {
    if (!user) {
      alert("You must create an account to contact this Geek");
      history.push("/signin")
    } else {
      formView = !formView;
      setShowForm(formView)
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const conversationToCreate = {
      users: [id, user.uid],
      messages: [newMessage],
      createdAt: timestamp.fromDate(new Date()),
      updatedAt: timestamp.fromDate(new Date()),
      title: newTitle,
    };
    await conversationsRef.add(conversationToCreate);
    history.push("/allconversations")
  };

  if (!document) {
    return <div>"loader bar here "</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center px-5 md:px-16 w-full xl:px-80 z-10 text-gray-700">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-center   md:flex-rows mdw-3/4 lg:h-70  mt-2 p-4 border-8 border-[#DADDFC] rounded-xl shadow-lg">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex md:justify-left items-center rounded-lg">
                <img
                  src={document.photoURL}
                  className="object-cover rounded-full h-32 w-32 shadow-lg mr-2"
                  alt="Avatar"
                />
              </div>
              <div className="flex flex-col md:flex-rows justify-center text-center lg:text-left ml-3">
                <h1 className="mb-1 mt-2 text-3xl font-bold tracking-tight">
                  {document.jobTitle}
                </h1>
                <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
                  {document.firstName} {document.lastName}
                </p>
                <button
                  className="inline-block px-6 py-2.5 bg-[#2E4C6D] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg focus:bg-[#2E4C6D] focus:shadow-lg  focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mr-1.5"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasBottom"
                  aria-controls="offcanvasBottom"
                  onClick={handleClick}
                >
                  Contact this geek
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-rows w-full h-1/2  shadow-lg rounded-lg border-4 border-[#DADDFC] mt-5 p-4  ">
          <h2 className="text-xl font-bold">Past Projects</h2>
          <div className="flex flex-col rounded-md  md:flex-rows w-full h-96 bg-[#DADDFC] mt-2 p-4 z-0">
            <div className="swiper h-full w-full lg:w-3/3">
              <div className="swiper-wrapper swiper-pagination-horizontal">
                <div className="swiper-slide bobject-cover">
                <img
                  src={photos[0]}
                  className="object-cover w-full h-96 md:h-50 z-0"
                  alt="Avatar"
                />
                </div>
                <div className="swiper-slide object-cover ">
                <img
                  src={photos[1]}
                  className="object-cover w-full h-96 z-0"
                  alt="Avatar"
                />
                </div>
                <div className="swiper-slide object-cover ">
                <img
                  src={photos[2]}
                  className="object-cover w-full h-96 z-0"
                  alt="Avatar"
                />
                </div>
                ...
              </div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
              <div className="swiper-scrollbar"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-xl shadow-lg  md:flex-rows w-full h-40  mt-2 p-2 bg-white border-4 border-[#DADDFC]">
          <h2 className="text-xl font-bold">Skills</h2>
          <p className="rounded-lg m-2 w-full h-fullpy-1.5 text-base font-normal">
            {document.skills}
          </p>
        </div>

        <div className="flex flex-col rounded-xl border-4 border-[#DADDFC]  md:flex-rows w-full h-70 shadow-lg  mt-2 p-4 bg-white mb-4">
          <h2 className="text-xl font-bold">About this Geek</h2>
          <div className="flex flex-col rounded-lg  md:flex-rows w-full h-60  mt-2 p-4">
            {document.description}
          </div>
        </div>
        {showForm ? (
          <div className="fixed bottom-0 right-0 w-3/4 mt-4 mb-4 rounded-lg shadow-lg border-5 bg-blue-50 md:w-1/3 md:h-2/4 z-500">
            <div className="flex flex-col p-4 overflow overflow-auto resize">
              <button
                className=" text-white w-6 rounded-sm bg-[#2E4C6D]"
                onClick={handleClick}
              >
                x
              </button>
              <h2 className="font-medium mb-1">Contact this Geek</h2>

              <form className="w-full flex flex-col " onSubmit={handleSubmit}>
                <input
                  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 font-mono font-light  text-gray-600 dark:text-gray-400 mb-1"
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle}
                  placeholder="Title"
                />

                <textarea
                  className="border  border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 font-mono font-light text-gray-600 dark:text-gray-400 mb-6"
                  required
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  placeholder="First Message"
                />
                <button
                  type="submit"
                  className="h-10 w-36 sm:w-1/3 rounded-lg px-3 my-2 md:ml-5 sm:ml-5 text-white bg-[#2E4C6D]"
                >
                  ️SEND
                </button>
              </form>
            </div>
          </div>
        ) : null}

      </div>
    </>
  );
};

export default PublicProfile;


