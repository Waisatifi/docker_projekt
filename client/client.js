const axios = require("axios");
const fs = require("fs");
const checksum = require("checksum");
const path = require("path");

const serverPortti = process.env.SERVER_PORTTI || 3000;
const serverOsoite = process.env.SERVER_OSOITE || "server";
const serverUrl = `http://${serverOsoite}:${serverPortti}`; // Palvelimen osoite ja portti

const healthCheckEndpoint = "/health"; // Health check endpoint on the server
const currentDirectory = process.cwd(); // Get the current working directory

const checkServerAvailability = async () => {
  try {
    // Check if the server is available by making a GET request to the health check endpoint
    await axios.get(`${serverUrl}${healthCheckEndpoint}`);
    console.log("Server is ready.");

    // Proceed to download and checksum file
    downloadAndChecksumFile();
  } catch (error) {
    console.error("Server is not ready yet. Retrying in 5 seconds...");
    setTimeout(checkServerAvailability, 5000); // Retry after 5 seconds
  }
};

const downloadAndChecksumFile = async () => {
  try {
    // Make a GET request to download a file from the server
    const response = await axios.get(`${serverUrl}`, {
      responseType: "stream",
    });
    const fileName = "ladattu_tiedosto.txt";
    const filePath = path.join(__dirname, "./", fileName); // Define the storage path inside the container
    const filePath1 = "/clientdata/" + fileName; // Define the storage path on the host

    const writeStream = fs.createWriteStream(filePath);
    const writeStream1 = fs.createWriteStream(filePath1);

    response.data.pipe(writeStream);
    response.data.pipe(writeStream1);

    // Check the server-reported checksum
    const serverChecksum = response.headers["checksum-arvo"];

    writeStream.on("finish", () => {
      console.log("File downloaded and saved.");

      // Check the checksum of the downloaded file
      checksum.file(filePath, (err, clientChecksum) => {
        if (err) {
          console.error("Error calculating file checksum:", err);
          return;
        }
        console.log("Checksum of the downloaded file:", clientChecksum);

        if (serverChecksum === clientChecksum) {
          console.log("Checksums match. The file is intact.");
          fs.readdir(currentDirectory, (err, files) => {
            if (err) {
              console.error("Error reading directory");
              return;
            }
            console.log("Content of the  current working directory");
            files.forEach((file) => {
              console.log(file);
            });
          });
        } else {
          console.error("Checksums do not match. The file may be corrupted.");
        }
      });
    });
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};

// Start by checking if the server is available
checkServerAvailability();
