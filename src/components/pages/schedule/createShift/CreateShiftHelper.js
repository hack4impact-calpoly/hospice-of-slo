import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  timeComesBefore,
  //   eventDataToFront,
  combineDateAndTime,
  dateComesBefore,
} from "./CreateShiftHelper";
import { shiftPropType } from "../../../../dataStructures/propTypes";
import actions from "../../../../actions";

async function CreateShift({ curEvent }) {
  //   // Event Editing info
  //   const isEditing = Object.keys(curEvent).length !== 0;
  //   const defaultVals = isEditing ? eventDataToFront(curEvent) : curEvent;

  // Redux setup
  const dispatch = useDispatch();

  //   // Form Stuff
  //   const { register, getValues, handleSubmit, errors } = useForm({
  //     defaultValues: defaultVals,
  //   });
  //   const history = useHistory();

  //   const [showDateFeedback, setShowDateFeedback] = React.useState(false);

  event.preventDefault();
  const { startDate, startTime, endDate, endTime } = data;

  const start = combineDateAndTime(startDate, startTime);
  const end = combineDateAndTime(endDate, endTime);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    setShowDateFeedback(true);
    return;
  }
  setShowDateFeedback(false);

  const shift = {
    startTime: start,
    endTime: end,
    firstName,
    lastName,
  };
  const db = firebase.firestore();

  if (isEditing) {
    // Editing current event
    // Changes the address of the vigil
    await db.collection("vigils").doc(curEvent.id).set(shift);
    // Changes the address of each shift inside of the vigil
    await db
      .collection("vigils")
      .doc(curEvent.id)
      .collection("shifts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            address: shift.address,
          });
        });
      });

    dispatch(
      actions.vigils.editVigil(curEvent.id, { ...shift, id: curEvent.id })
    );
  } else {
    // Creating new event
    const backRef = await db.collection("shifts").add(shift);
    await db.collection("discussions").add({
      name: shift.firstName,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      pinned: false,
    });
    dispatch(actions.vigils.addVigil({ ...shift, id: backRef.id }));
  }

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

CreateShift.defaultProps = {
  curEvent: {},
};

export default CreateShift;
