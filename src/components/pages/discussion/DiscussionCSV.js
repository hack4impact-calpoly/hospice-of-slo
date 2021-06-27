/* eslint-disable */
import { json2csvAsync } from 'json-2-csv';
import firebase from 'firebase/app';
import 'firebase/storage';

async function generateCSV(posts, title) {
  // Create CSV String
  const dateOptions = { month: 'short', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  posts.forEach((post) => {
    const x = post.timeSent.toDate();
    const formattedDate = `${x.toLocaleDateString(undefined, dateOptions)} at ${x.toLocaleTimeString(undefined, timeOptions)}`;
    post.timeSent = formattedDate;
  });
  const options = {
    keys: [
      { field: 'user.name', title: 'Name' },
      { field: 'message', title: 'Message' },
      { field: 'timeSent', title: 'time sent' },
    ],
  };
  const postsCSV = await json2csvAsync(posts, options);

  // Create CSV File
  const storageRef = firebase.storage().ref();
  const discussionCsvRef = storageRef.child(title + 'Discussion.csv');
  await discussionCsvRef.putString(postsCSV);

  // Download CSV File
  const discussionURL = await discussionCsvRef.getDownloadURL();
  window.open(discussionURL);
}

export default generateCSV;
