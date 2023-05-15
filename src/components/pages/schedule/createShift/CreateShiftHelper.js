import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import { shiftPropType } from "../../../../dataStructures/propTypes";
import actions from "../../../../actions";

// Validation
function timeComesBefore(time1, time2) {
  const timeFormat = "HH:mm";
  return moment(time1, timeFormat).isSameOrBefore(moment(time2, timeFormat));
}

function dateComesBefore(date1, date2) {
  return new Date(date1) <= new Date(date2);
}

// On Submit Helpers
function combineDateAndTime(date, time) {
  const format = date.replace(/-/g, "/");
  return new Date(`${format} ${time}`);
}

// Editing Helper
function eventDataToFront(event) {
  const { ...eventCopy } = event;
  eventCopy.startDate = moment(event.startTime).format("YYYY-MM-DD");
  eventCopy.endDate = moment(event.endTime).format("YYYY-MM-DD");
  eventCopy.startTime = moment(event.startTime).format("HH:mm");
  eventCopy.endTime = moment(event.endTime).format("HH:mm");
  return eventCopy;
}

export {
  timeComesBefore,
  dateComesBefore,
  combineDateAndTime,
  eventDataToFront,
};

export async function CreateShift({ curEvent }) {
  //   // Event Editing info
  //   const isEditing = Object.keys(curEvent).length !== 0;
  //   const defaultVals = isEditing ? eventDataToFront(curEvent) : curEvent;

  // Redux setup
  const dispatch = useDispatch();

  //   // Form Stuff
  //   const { register, getValues, handleSubmit, errors } = useForm({
  //     defaultValues: defaultVals,
  //   });
  const history = useHistory();

  //   const [showDateFeedback, setShowDateFeedback] = React.useState(false);

  // event.preventDefault();
  const { start, end, firstName, lastName } = curEvent;

  // if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
  //   setShowDateFeedback(true);
  //   return;
  // }
  // setShowDateFeedback(false);

  const shift = {
    startTime: start,
    endTime: end,
    firstName,
    lastName,
  };
  const db = firebase.firestore();

  // if (isEditing) {
  //   // Editing current event
  //   // Changes the address of the vigil
  //   await db.collection("vigils").doc(curEvent.id).set(shift);
  //   // Changes the address of each shift inside of the vigil
  //   await db
  //     .collection("vigils")
  //     .doc(curEvent.id)
  //     .collection("shifts")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         doc.ref.update({
  //           address: shift.address,
  //         });
  //       });
  //     });

  //   dispatch(
  //     actions.vigils.editVigil(curEvent.id, { ...shift, id: curEvent.id })
  //   );
  // } else {
  //   // Creating new event
  //   const backRef = await db.collection("shifts").add(shift);
  //   await db.collection("discussions").add({
  //     name: shift.firstName,
  //     dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
  //     pinned: false,
  //   });
  //   dispatch(actions.vigils.addVigil({ ...shift, id: backRef.id }));
  // }

  await db.collection("shifts").add(shift);
  await db.collection("discussions").add({
    name: shift.firstName,
    dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    pinned: false,
  });
  dispatch(actions.history.addHistoryShift({ ...shift }));

  history.push("/schedule");

  // Validation Functions
  /* Current Validation:
        - location, date, startTime, and endTime are required
        - endDate must be the same as or come after startDate
        - If startDate and endDate are the same, startTime must come before endTime
    */
}

CreateShift.propTypes = {
  curEvent: shiftPropType,
};

// CreateShift.defaultProps = {
//   curEvent: {},
// };

export default CreateShift;
