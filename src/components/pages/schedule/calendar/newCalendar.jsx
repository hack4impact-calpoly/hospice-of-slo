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
    ReactDOM.render(
      extendedInfoElement,
      document.getElementById("extended-info-container")
    );
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
    ReactDOM.render(
      extendedInfoPlaceholder,
      document.getElementById("extended-info-container")
    );
  }

  const expandedCalendar = (
    <FullCalendar
      id="expanded-shift-calendar"
      className=".fc-agendaWeek-view"
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
      allDaySlot={false}
    />
  );

  const minimizedCalendar = (
    <FullCalendar
      id="minimized-shift-calendar"
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
    if (window.innerWidth > 900) {
      ReactDOM.render(
        expandedCalendar,
        document.getElementById("shift-calendar")
      );
    } else {
      ReactDOM.render(
        minimizedCalendar,
        document.getElementById("shift-calendar")
      );
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
