import React, { Fragment, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { Breadcrumb, Button, Col, Row, Card } from 'react-bootstrap';
import axios from "axios";

function Calendars() {
  const [eventData, setEventData] = useState([])
  const [state, setState] = useState({
    calendarEvents: [],
    events: [
      
    ],
  });

  useEffect(() => {
    // Fetch events from the MongoDB database
    axios
      .get("/api/getevents")
      .then((response) => {
        const { data } = response;
        // console.log(data)
        setEventData(data.events)
        setState((prevState) => ({
          ...prevState,
          calendarEvents: data.events,
        }));
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);



  const handleEventClick = async(clickInfo) => {
    if (
      window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)
    ) {
      const eventId = clickInfo.event.title;
      console.log(eventId,"eventId")

      // console.log(eventId)

      // Make a DELETE request to the API endpoint
      const response = await fetch("/api/deleteEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: eventId })
      });
      
          clickInfo.event.remove();
       
    }
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (title) {
      const eventData = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      // Make a POST request to the API endpoint to save the event in the database
      axios
        .post("/api/events", eventData)
        .then((response) => {
          const { id } = response.data;
          // Assign the generated ID to the event
          const newEvent = {
            id,
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
          };
          calendarApi.addEvent(newEvent);

          // Update the state with the new event
          setState((prevState) => ({
            ...prevState,
            calendarEvents: [...prevState.calendarEvents, newEvent],
          }));
        })
        .catch((error) => {
          console.error("Error saving event:", error);

        });
    }
  };

  return (
    <Fragment>
      <Row className="row-sm">
        <Col sm={12} md={12}>
          <Card className="custom-card">
            <Card.Body>
              <Row className="" id="wrap">
                
                <Col xl={12} id="calendar-wrap">
                  <div id="calendar">
                    <FullCalendar
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                      ]}
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                      }}
                      initialView="dayGridMonth"
                      editable={true}
                      selectable={true}
                      selectMirror={true}
                      dayMaxEvents={true}
                      weekends={state.weekendsVisible}
                      initialEvents={state.calendarEvents}
                      select={handleDateSelect}
                      eventClick={handleEventClick}
                      events={eventData}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Calendars;