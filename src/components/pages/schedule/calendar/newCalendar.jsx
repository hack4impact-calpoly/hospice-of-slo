import React, { useEffect } from "react";
import ReactDOM from "react-dom"; // eslint-disable-line
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { eventShiftsFormatted } from "./sampleData";
import "./newCalendar.css";
import mouseOverIcon from "../../../../images/mouseovericon.svg";

export default function NewCalendar() {
  function handleMouseEnter(info) {
    const nameAddressString = info.event.title;
    const at = nameAddressString.indexOf("at");
    const volunteerName = nameAddressString.slice(0, at);
    const eventAddress = nameAddressString.slice(at + 3);
    const shiftStartTime = formatDate(info.event.start, {
      hour: "numeric",
      minute: "2-digit",
    });
    const shiftEndtime = formatDate(info.event.end, {
      hour: "numeric",
      minute: "2-digit",
    });

    const extendedInfoElement = (
      <div id="extended-info">
        <div className="extended-info-member">
          <div className="extended-info-header">
            <strong>Volunteer Name:</strong>
          </div>
          <div className="extended-info-text">{volunteerName}</div>
        </div>
        <div className="extended-info-member">
          <div className="extended-info-header">
            <strong>Shift Start:</strong>
          </div>
          <div className="extended-info-text">{shiftStartTime}</div>
        </div>
        <div className="extended-info-member">
          <div className="extended-info-header">
            <strong>Shift End:</strong>
          </div>
          <div className="extended-info-text">{shiftEndtime}</div>
        </div>
        <div className="extended-info-member">
          <div className="extended-info-header">
            <strong>Event Address:</strong>
          </div>
          <div className="extended-info-text">{eventAddress}</div>
        </div>
      </div>
    );
    const root = ReactDOM.createRoot(
      document.getElementById("extended-info-container")
    );
    root.render(extendedInfoElement);
  }

  const extendedInfoPlaceholder = (
    <div id="extended-info-placeholder">
      <img
        id="mouse-over-icon"
        src={mouseOverIcon}
        alt="Mouse over a shift to see details."
      />
    </div>
  );

  function handleMouseLeave() {
    const root = ReactDOM.createRoot(
      document.getElementById("extended-info-container")
    );
    root.render(extendedInfoPlaceholder);
  }

  const expandedCalendar = (
    <FullCalendar
      className="expanded-shift-calendar"
      plugins={[timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      initialView="timeGridWeek"
      selectable
      dayMaxEvents
      weekends
      events={eventShiftsFormatted}
      eventMaxStack={2}
      displayEventEnd
      eventMouseEnter={(info) => handleMouseEnter(info)}
      eventMouseLeave={(info) => handleMouseLeave(info)}
    />
  );

  const minimizedCalendar = (
    <FullCalendar
      className="minimized-shift-calendar"
      plugins={[timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      initialView="timeGridDay"
      selectable
      dayMaxEvents
      weekends
      events={eventShiftsFormatted}
      eventMaxStack={3}
      displayEventEnd
      eventMouseEnter={(info) => handleMouseEnter(info)}
      eventMouseLeave={(info) => handleMouseLeave(info)}
    />
  );

  const updateMedia = () => {
    const root = ReactDOM.createRoot(document.getElementById("shift-calendar"));

    if (window.innerWidth > 900) {
      root.render(expandedCalendar);
    } else {
      root.render(minimizedCalendar);
    }
  };

  useEffect(() => {
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <div id="shift-calendar-box">
      <div id="shift-calendar">{expandedCalendar}</div>
      <div id="extended-info-container">{extendedInfoPlaceholder}</div>
    </div>
  );
}
