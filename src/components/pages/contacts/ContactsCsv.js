/*eslint-disable*/
import { ExportToCsv } from "export-to-csv";

async function generateCSV(users) {
  // Create CSV String
  const filteredUsers = users.map(user => {
    let obj = Object.assign({}, user);
    delete obj.id;
    delete obj.accountStatus;
    return obj
  });

  filteredUsers.sort((a, b) => a.name.localeCompare(b.name));

  const options = {
    headers: [ "Email", "Name", "Phone Number", "Is Admin", "Is Valid"],
    showLabels: true,
    showTitle: true,
    title: "List Of Contacts",
  };

  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(filteredUsers);
}

export default generateCSV;
