/* eslint-disable */
import { ExportToCsv } from "export-to-csv";

async function generateCSV(posts, title) {
  // Create CSV String
  const filteredPosts = posts.map(user => {
    let obj = Object.assign({}, user);
    obj.username = obj.user.name;
    delete obj.user;
    delete obj.userRef;
    delete obj.messageId;
    return obj
  });

  const dateOptions = { month: "short", day: "numeric" };
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  filteredPosts.forEach((post) => {
    const x = post.timeSent.toDate();
    const formattedDate = `${x.toLocaleDateString(
      undefined,
      dateOptions
    )} at ${x.toLocaleTimeString(undefined, timeOptions)}`;
    post.timeSent = formattedDate;
  });

  const options = {
    headers: [ "Message", "Time Sent", "Name"],
    showLabels: true,
    showTitle: true,
    title: "Discussion Log",
  };

  const csvExporter = new ExportToCsv(options);

  console.log(filteredPosts);
  if(filteredPosts.length != 0){
    csvExporter.generateCsv(filteredPosts);
  }
}

export default generateCSV;
