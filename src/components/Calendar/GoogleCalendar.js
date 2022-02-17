// import React from 'react';
// function Calendar() {
//   return ( <>
// <h1>This is calendar</h1>
//   </> );
// }

// export default Calendar;

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Sidebar from "../Dashboard/Sidebar";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID
const API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
// console.log('CLIENT_ID', CLIENT_ID);
// console.log('API_KEY', API_KEY);
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

const GoogleCalendar = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";

    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.gapi) handleClientLoad();
    });
  }, []);

  const openSignInPopup = () => {
    window.gapi.auth2.authorize(
      { client_id: CLIENT_ID, scope: SCOPES },
      (res) => {
        console.log(res);
        if (res) {
          console.log(window.gapi.client, res);

          if (res.access_token)
            localStorage.setItem("access_token", res.access_token);

          // fetch(
          //   `https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=${res.access_token}`
          // )
          //   .then((res) => res.json())
          //   .then((data) =>
          //     localStorage.setItem("calendarId", data.items[0].id)
          //   );

          window.gapi.client.load("calendar", "v3", listUpcomingEvents);
        }
      }
    );
  };

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  const handleClientLoad = () => {
    window.gapi.load("client:auth2", initClient);
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    if (!localStorage.getItem("access_token")) {
      openSignInPopup();
    } else {
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((res) => {
          if (res.status !== 401) {
            return res.json();
          } else {
            localStorage.removeItem("access_token");

            openSignInPopup();
          }
        })
        .then((data) => {
          if (data?.items) {
            console.log(data);
            setEvents(formatEvents(data.items));
          }
        });
    }
  };

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  const listUpcomingEvents = () => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        // timeMin: new Date().toISOString(),
        showDeleted: true,
        singleEvents: true,
        // maxResults: 10,
        // orderBy: "startTime",
      })
      .then(function (response) {
        var events = response.result.items;

        console.log(events);

        if (events.length > 0) {
          setEvents(formatEvents(events));
        }
      });
  };

  const formatEvents = (list) => {
    return list.map((item) => ({
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };

  const addEvent = () => {
    if (window.gapi.client || localStorage.getItem("access_token")) {
      let today = new Date();

      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}&timeMax=${new Date(
          "Apr 14, 2021"
        ).toISOString()}&timeMin=${new Date("Apr 15, 2021").toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
      //   fetch(
      //     `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
      //     {
      //       method: "POST",
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      //       },
      //       body: JSON.stringify({
      //         end: {
      //           dateTime: new Date("Apr 16, 2021"),
      //         },
      //         start: {
      //           dateTime: new Date("Apr 15, 2021"),
      //         },
      //         summary: "Test",
      //       }),
      //     }
      //   );
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />

      <div className="flex-auto flex-col bg-slate-100 rounded-md h-full">
        <div
        className="flex flex-col mt-12 mx-6 px-6 border rounded-xl shadow-lg h-5/6 bg-slate-50 overflow overflow-auto resize"
        >
        <button
         className="mt-6 mb-6 w-64 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
        onClick={addEvent}>Add event</button>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleCalendar;
