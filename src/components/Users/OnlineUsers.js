import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../UI/Avatar';
// styles
// import './OnlineUsers.css'

export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection('users')

  return (
    <div className="w-64 flex flex-col rounded-md shadow-lg bg-white h-96">
      <h2 className="font-bold p-2">Online Users</h2>
      <div className="notifications bg-black-200 overflow overflow-auto h-96 w-64">
      {isPending && <div className="justify-center items-center">Loading users...</div>}
      {error && <div className="justify-center items-center">{error}</div>}
      {documents && documents.map(user => (
        <div key={user.id} className="flex flex-col ml-3 mr-3 mb-1 border border-grey-100 rounded-xl bg-slate-100">
          {user.online && <div className="flex flex-row ml-2 h-11 space-x-4 items-center border-grey-800">
          <p className="w-3 h-3 bg-green-600 border-1 border-white rounded-full"></p>
          <Avatar src={user.photoURL} />
          <p className="text-xs font-mono font-bold">{user.displayName}</p>
          </div>
          }
        </div>
      ))}
      </div>

    </div>
  )
}
