// import { useSelector } from "react-redux";

// // const events = [
// //   {
// //     title: "v1",
// //     shifts: [
// //       {
// //         id: "p1",
// //         name: "Jim Jones",
// //         address: "300 Cherry Circle",
// //         shiftStartTime: moment().format(),
// //         shiftEndTime: moment().add(4, "hours").format(),
// //       },
// //       {
// //         id: "p2",
// //         name: "Sally Seagull",
// //         address: "300 Cherry Circle",
// //         shiftStartTime: moment().subtract(3, "hours").format(),
// //         shiftEndTime: moment().add(1, "hours").format(),
// //       },
// //     ],
// //     address: "300 Cherry Circle",
// //     startTime: moment().subtract(3, "hours").format(),
// //     endTime: moment().add(4, "hours").format(),
// //     notes: "Insert note here",
// //   },

// //   {
// //     title: "v2",
// //     shifts: [
// //       {
// //         id: "p3",
// //         name: "Mary Mongoose",
// //         address: "143 Fake Street",
// //         shiftStartTime: "2023-02-02T09:30:00-05:00",
// //         shiftEndTime: "2023-02-02T12:30:00-05:00",
// //       },
// //     ],
// //     address: "143 Fake Street",
// //     startTime: "2023-02-01T09:30:00-05:00",
// //     endTime: "2023-02-01T12:30:00-05:00",
// //     notes: "This is a note",
// //   },
// // ];

export default function getFormattedShifts(shifts) {
  const eventShifts = [];

  shifts.forEach((shift) => {
    eventShifts.push({ ...shift });
  });

  console.log(`shifts: ${shifts.forEach((shift) => console.log(shift))}`);

  const eventShiftsFormatted = eventShifts.map((shift) => ({
    id: shift.id,
    start: shift.startTime,
    end: shift.endTime,
    title: `${shift.firstName} ${shift.lastName}`,
    extendedProps: {
      description: "N/A",
    },
    display: "rectangle",
  }));

  return eventShiftsFormatted;
}

export { getFormattedShifts };
