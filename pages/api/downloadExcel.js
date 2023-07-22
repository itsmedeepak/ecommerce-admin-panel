import { MongoClient } from 'mongodb';
import XLSX from 'xlsx';

export default async function handler(req, res) {
  // Set up a connection to your MongoDB database
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get an array of all the collection names
  const collectionNames = await client.db().listCollections().toArray();

  // Iterate over each collection and retrieve its data
  const collectionsData = await Promise.all(collectionNames.map(async (collection) => {
    const data = await client.db().collection(collection.name).find().toArray();
    const dataWithId = data.map((document) => ({ ...document, _id: document._id.toString() }));
    return { [collection.name]: dataWithId };
  }));

  // Close the database connection
  await client.close();

  // Combine all the collections data into a single object
  const data = collectionsData.reduce((acc, cur) => ({ ...acc, ...cur }), {});

  // Convert the data to an Excel file
  const workbook = XLSX.utils.book_new();
  Object.keys(data).forEach((collectionName) => {
    const worksheetData = data[collectionName];
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, collectionName);
  });
  const excelFile = XLSX.write(workbook, { type: 'buffer' });

  // Set the response headers to download the Excel file
  res.setHeader('Content-Disposition', 'attachment; filename=PatalgoReportGenerated.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  // Send the Excel file to the client
  res.send(excelFile);
}
