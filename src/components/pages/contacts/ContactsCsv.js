import { json2csvAsync } from 'json-2-csv';
import firebase from 'firebase/app';

async function generateCSV(users) {
  // Create CSV String
  users.sort((a, b) => (a.name).localeCompare(b.name));
  const options = {
    keys: [
      { field: 'name', title: 'Name' },
      { field: 'email', title: 'Email' },
      { field: 'phone', title: 'Phone' },
    ],
  };
  const usersCSV = await json2csvAsync(users, options);

  // Create CSV File
  const storageRef = firebase.storage().ref();
  const contactsCsvRef = storageRef.child('contacts.csv');
  await contactsCsvRef.putString(usersCSV);

  // Download CSV File
  const ContactsURL = await contactsCsvRef.getDownloadURL();
  console.log(ContactsURL);
  window.open(ContactsURL);
}

export default generateCSV;
