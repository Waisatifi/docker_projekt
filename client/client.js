const axios = require('axios');
const fs = require('fs');
const checksum = require('checksum');
const path = require('path');

const serverUrl = 'http://server:3000'; // Palvelimen osoite ja portti

// Tehdään GET-pyyntö palvelimelle
axios.get(serverUrl)
  .then(response => {
    console.log('Palvelimen vastaus:', response.data);
    
    // Lataa tiedosto ja tarkistaa sen tarkistussumman
    axios.get(`${serverUrl}`, { responseType: 'stream' })
      .then(response => {
        const fileName = 'ladattu_tiedosto.txt';
        const filePath = path.join(__dirname, './', fileName); // Määritä tallennuspolku konttiin
        const filePath1 = '/clientdata/' + fileName; //hostiin
        console.log(filePath1+"testi")


        const writeStream = fs.createWriteStream(filePath);
        const writeStream1 = fs.createWriteStream(filePath1);
        console.log(writeStream1+"testi1")
        response.data.pipe(writeStream);
        response.data.pipe(writeStream1);
        
        // Tarkistetaan tarkistussumma
        const serverChecksum = response.headers['checksum-arvo']; // Tämä sisältää palvelimen ilmoittaman tarkistussumman
        
        writeStream.on('finish', () => {
          console.log('Tiedosto ladattu ja tallennettu.');
          
          // Tarkistetaan ladatun tiedoston tarkistussumma
          checksum.file(filePath, (err, clientChecksum) => {
            if (err) {
              console.error('Virhe tiedoston tarkistussumman laskemisessa:', err);
              return;
            }
            console.log('Tarkistussumma ladatulle tiedostolle:', clientChecksum);
            
            // Vertaillaan palvelimen ja asiakkaan tarkistussummia
            if (serverChecksum === clientChecksum) {
              console.log('Tarkistussummat ovat samat. Tiedosto on eheä.');
            } else {
              console.error('Tarkistussummat eivät täsmää. Tiedosto saattaa olla vioittunut.');
            }
          });
        });
      })
      .catch(error => {
        console.error('Virhe tiedoston lataamisessa:', error);
      });
  })
  .catch(error => {
    console.error('Virhe palvelimelle yhdistämisessä:', error);
  });
