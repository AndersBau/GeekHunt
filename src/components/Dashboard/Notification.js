import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import moment from 'moment';

function Notification() {
  // console.log('notifications', notifications);
  /**Add project collection to firestore */
  const { addDocument, response } = useFirestore('notifications')
  /*Assign function*/
  const { documents, error } = useCollection('notifications')
  const { user } = useAuthContext()
  // console.log('documents', documents);
  // console.log('user', user);
  return (<>
    <div className="w-64 flex flex-col rounded-md shadow-lg bg-white mt-24">
      <div className="font-bold p-2">Notifications</div>
      <div className="notifications bg-white-200 overflow overflow-auto h-96 w-64">
        {user.uid && !documents && <p className="justify-center items-center">No notifications to show</p>}
        {user.uid && documents && documents.map(noti => (
          <div className="flex flex-col p-2" key={noti.id}>
            <div className="rounded-lg shadow-lg p-2">
              <p className="text-sm font-bold">{noti.user}</p>
              <p className="text-sm">{noti.content}</p>
              <p className="text-xs ml-36">
                {noti.time && moment(noti.time.toDate()).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>);
}

export default Notification;
