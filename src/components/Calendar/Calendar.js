import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../Dashboard/Sidebar";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class StaticCalendar extends Component {
  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Web Dev Project",
      },
      {
        start: moment().add(7, "days").toDate(),
        end: moment().add(10, "days").toDate(),
        title: "Learning Algorithm",
      },
      {
        start: moment().add(14, "days").toDate(),
        end: moment().add(20, "days").toDate(),
        title: "Job Hunting",
      },
      {
        start: moment().add(8, "days").toDate(),
        end: moment().add(10, "days").toDate(),
        title: "Meet Tech Recruiter",
      },
    ],
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-auto items-center justify-center">
          <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="month"
            events={this.state.events}
            localizer={localizer}
            onEventDrop={this.onEventDrop}
            onEventResize={this.onEventResize}
            resizable
            style={{ height: "100vh", width: "150vh" }}
          />
        </div>
      </div>
    );
  }
}

export default StaticCalendar;
