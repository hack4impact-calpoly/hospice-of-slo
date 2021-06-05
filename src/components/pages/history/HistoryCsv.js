import { json2csvAsync } from 'json-2-csv';
import firebase from 'firebase/app';
import 'firebase/storage';

async function generateCSV(shifts) {
  // Create CSV String
  shifts.sort((a, b) => (a.name).localeCompare(b.name));
  const options = {
    keys: [
      { field: 'name', title: 'Name' },
      { field: 'address', title: 'Address' },
      { field: 'shiftDate', title: 'Date' },
      { field: 'startTime', title: 'Start Time' },
      { field: 'endTime', title: 'End Time' },
      { field: 'duration', title: 'Duration (hours)' },
      { field: 'empty', title: 'Nothing' },
    ],
  };
  const shiftsCSV = await json2csvAsync(shifts, options);

  // Create CSV File, file name is history_for_ADDRESS_.csv
  const storageRef = firebase.storage().ref();
  const historyCsvRef = storageRef.child(`history_for${(JSON.stringify(shifts[0].address)).split(/\s/).join('')}.csv`);
  await historyCsvRef.putString(shiftsCSV);

  // Download CSV File
  const HistoryURL = await historyCsvRef.getDownloadURL();
  window.open(HistoryURL);
}

export default generateCSV;
