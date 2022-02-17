import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignout } from "../../hooks/useSignout";
import Avatar from "../UI/Avatar";

export default function Sidebar() {
  const { signout, isPending } = useSignout()
  const { user } = useAuthContext()


  return (<>
    <div className="top-0 left-0 w-64 resize-x bg-grey-100 h-full border-r overflow overflow-auto">
      <div className="flex flex-shrink-0 items-center justify-center h-36 border-b space-x-3 flex-col ">
        <Avatar src={user.photoURL} />
        <div>
          {user && (
            <>
              {user.displayName ? <p className="text-2xl font-semibold text-center">Hello, {user.displayName}!</p> : <p className="text-2xl font-semibold">Hello!</p>}
            </>
          )}
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
            </div>
          </li>
          <Link to="/dashboard">
            <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
            </p>
          </Link>
          <Link to="/createproject">
            <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Create Project</span>
              <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span>
            </p>
          </Link>
          <Link to="/allconversations">
            <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Start Conversations</span>
            </p>
          </Link>
          <Link to="/calendar">
            <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Google Calendar</span>
            </p>
          </Link>
          <Link to="/mycalendar">
            <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">My Calendar</span>
            </p>
          </Link>
          <Link to="/transaction">
            <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Budget Manager</span>
            </p>
          </Link>
          <div className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Navigation</div>
            </div>
          </div>
          <Link to="/">
            <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Home</span>
            </p>
          </Link>
          <Link to="/profile">
            <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
            </p>
          </Link>
          <Link to="/discover">
            <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Discover</span>
            </p>
          </Link>

          {!isPending && (
            <li
              onClick={signout}
            >
              <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
              </p>
            </li>
          )}
          {isPending && (
            <li
              onClick={signout}
            >
              <p href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Logging out ...</span>
              </p>
            </li>
          )}

        </ul>
      </div>
    </div>
  </>
  );
}
