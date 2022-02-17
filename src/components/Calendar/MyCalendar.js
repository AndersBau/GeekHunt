import React, { useEffect, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider, useDrag, useDrop, useDragDropManager } from 'react-dnd'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useFirestore } from '../../hooks/useFirestore';
import { useCollection } from '../../hooks/useCollection';


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const minTime = new Date();
minTime.setHours(7, 0, 0);
const maxTime = new Date();
maxTime.setHours(20, 0, 0);
const calendarInitialState = {
  events: [
    // {
    //   start: moment().toDate(),
    //   end: moment().add(1, "days").toDate(),
    //   title: "Some title",
    // },
  ],
  tags: [],
  people: [],
  modal: {
    id: null,
    title: null,
    desc: null,
    start: new Date(2018, 4, 4, 7, 0, 0),
    end: new Date(2018, 4, 4, 8, 0, 0),
  },
  modalOpen: false,
  tagOpen: false,
  peopleOpen: false,

}
export default function MyCalendar() {
  // The manager provides access to all of React DnD's internals
  const dragDropManager = useDragDropManager()
  /**Add events collection to firestore */
  const { addDocument, response } = useFirestore('events')
  /*Assign function*/
  const { documents } = useCollection('users')
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [resize, setResize] = useState({})
  /*map through the array of all users*/
  useEffect(() => {
    if (documents) {
      const userOptions = documents.map(user => {
        return { value: { ...user, id: user.id }, label: user.displayName }
      })
      setUsers(userOptions)
    }
  }, [documents])
  // console.log('users', users)
  // useEffect((data) => {
  //   const { start, end } = data;
  //   setResize((state) => {
  //     state.events[0].start = start;
  //     state.events[0].end = end;
  //     return { events: [...state.events] };
  //   });
  // }, [resize])
  // const onEventResize = (data) => {
  //   const { start, end } = data;

  //   setResize((state) => {
  //     state.events[0].start = start;
  //     state.events[0].end = end;
  //     return { events: [...state.events] };
  //   });
  // };

  // const onEventDrop = (data) => {
  //   console.log(data);
  // };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          // events={this.state.events}
          localizer={localizer}
          // onEventDrop={onEventDrop}
          onEventResize={setResize}
          resizable
          style={{ height: "100vh", width: "150vh" }}
        />
      </DndProvider >
    </>
  )
}
