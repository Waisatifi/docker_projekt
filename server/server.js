import checksum from 'checksum';
import express from 'express'
import fs from 'fs'
import crypto from 'crypto'

const app = express();
const url = process.env.URL || "http://localhost";

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});


// Generoi 1KB satunnaista tekstiä
const randomText = crypto.randomBytes(1024).toString('hex');

// Kirjoitaa tiedoston
fs.writeFileSync('random.txt', randomText);


app.get('/',(req,res)=>{
    checksum.file('./random.txt', (err, sum) => {
        if (err) {
            console.error('Virhe tiedoston tarkistussumman laskemisessa:', err); 
            return
        }
        console.log('Tiedosto "random.txt" luotu satunnaisella tekstillä.');
        console.log('Tarkistussumma:', sum);

        res.setHeader("checksum-arvo",sum)
        res.download('./random.txt')
    });
})

app.listen(3000,() =>{
    console.log("App running port3000")
})