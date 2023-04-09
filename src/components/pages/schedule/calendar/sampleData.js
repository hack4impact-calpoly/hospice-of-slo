const events = [
  {
    title: "v1",
    shifts: [
      {
        id: "p1",
        name: "Jim Jones",
        address: "300 Cherry Circle",
        shiftStartTime: "2023-02-02T10:30:00-05:00",
        shiftEndTime: "2023-02-02T11:30:00-05:00",
      },
      {
        id: "p2",
        name: "Sally Seagull",
        address: "300 Cherry Circle",
        shiftStartTime: "2023-02-02T10:30:00-05:00",
        shiftEndTime: "2023-02-02T11:30:00-05:00",
      },
    ],
    address: "300 Cherry Circle",
    startTime: "2023-02-02T10:30:00-05:00",
    endTime: "2023-02-02T12:30:00-05:00",
    notes: "Insert note here",
  },

  {
    title: "v2",
    shifts: [
      {
        id: "p3",
        name: "Mary Mongoose",
        address: "143 Fake Street",
        shiftStartTime: "2023-02-02T09:30:00-05:00",
        shiftEndTime: "2023-02-02T12:30:00-05:00",
      },
    ],
    address: "143 Fake Street",
    startTime: "2023-02-01T09:30:00-05:00",
    endTime: "2023-02-01T12:30:00-05:00",
    notes: "This is a note",
  },
];

export const eventShifts = [];

events.forEach((event) => {
  event.shifts.forEach((shift) => {
    eventShifts.push({ ...shift, eventAddress: event.address });
  });
});

const eventShiftsFormatted = eventShifts.map((shift) => ({
  start: shift.shiftStartTime,
  end: shift.shiftEndTime,
  title: `${shift.name} at ${shift.eventAddress}`,
  extendedProps: {
    description: shift.eventAddress,
  },
  display: "rectangle",
}));

export { eventShiftsFormatted };
