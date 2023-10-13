const axios = require("axios");
const fs = require("fs");
const checksum = require("checksum");
const path = require("path");

const serverPortti = process.env.SERVER_PORTTI || 3000;
const serverOsoite = process.env.SERVER_OSOITE || "server";
const serverUrl = `http://${serverOsoite}:${serverPortti}`; // Palvelimen osoite ja portti

const healthCheckEndpoint = "/health"; // Health check endpoint palvelimella
const currentDirectory = process.cwd(); // Haetaan nykyinen työhakemisto

const checkServerAvailability = async () => {
  try {
    // Tarkista, onko palvelin saatavilla tekemällä GET-pyyntö health check -endpisteeseen
    await axios.get(`${serverUrl}${healthCheckEndpoint}`);
    console.log("Server is ready.");

    // Jatka tiedoston lataamista ja tarkistusta
    downloadAndChecksumFile();
  } catch (error) {
    console.error("Server is not ready yet. Retrying in 5 seconds...");
    setTimeout(checkServerAvailability, 5000); // Yritä uudellen 5 sekunnin kuluttua
  }
};

const downloadAndChecksumFile = async () => {
  try {
    // Tee GET-pyyntö tiedoston lataamiseksi palvelimelta
    const response = await axios.get(`${serverUrl}`, {
      responseType: "stream",
    });
    const fileName = "ladattu_tiedosto.txt";
    const filePath = path.join(__dirname, "./", fileName); // Määritä tallennuspolku kontissa
    const filePath1 = "/clientdata/" + fileName; // Määritä tallennuspolku isännällä

    const writeStream = fs.createWriteStream(filePath);
    const writeStream1 = fs.createWriteStream(filePath1);

    response.data.pipe(writeStream);
    response.data.pipe(writeStream1);

    // Tarkista palvelimen ilmoittama checksum-arvo
    const serverChecksum = response.headers["checksum-arvo"];

    writeStream.on("finish", () => {
      console.log("File downloaded and saved.");

      // Tarkista ladatun tiedoston checksum-arvo
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

// Aloita tarkistamalla, onko palvelin saatavilla
checkServerAvailability();
