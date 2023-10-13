# Docker-projekti

Tämä Docker-projekti koostuu kahdesta kontista: palvelin ja asiakas, jotka viestivät keskenään. 
Tavoitteena on lähettää 1KB kokoisen tiedoston random-tekstin kanssa palvelimelta asiakaskontille.


## Ohjeet palvelimien käynnistämiseen!

#### Vaihe 1: Anna skripteille suoritusoikeudet

Käynnistä antamalla oikeudet skripteille ensin:

    chmod u+x server.sh client.sh

#### Jos tulee ongelmia ajaa bash sciriptiä niin voit muuttaa rivinvaihdot Unix-tyyppiseksi (LF) tekstieditorilla, kuten esimerkiksi Visual Studio Code:

    1. Avaa skriptitiedosto Visual Studio Code -ohjelmassa.

    2. Klikkaa näytön alareunassa olevaa "CRLF" tai "CR" -painiketta ja valitse "LF".

    3. Tallenna tiedosto.

Tämä muuttaa rivinvaihdot Unix-tyyppiseksi, ja se voi auttaa ratkaisemaan mahdollisen ongelman, 
jos rivinvaihdot aiheuttavat epäyhteensopivuutta. 
Sitten yritä suorittaa skripti uudelleen, ja katso, toimiiko se ilman virheitä.

#### Jos et löydä alareunasta mitään niin voit toteuttaa myös tämän.

    sudo apt install dos2unix

Sitten muokkaa bash tiedosto

    dos2unix server.sh
    
Kokeile nyt ajaa scipti

### Vaihe2: Käynnistä molemmat kontit käyttäen Docker Composea
    
    docker-compose up
    
### Kuinka käynnistää palvelinkontti

    Käynnistä palvelinkontti käyttämällä joko bash server.sh  tai ./server.sh.

#### Parametrit

Voit mukauttaa projektin käynnistämistä antamalla joitain parametreja:

    -n tai --verkkonimi: Määritä Docker-verkko (oletuksena "oma-verkko").

    -p tai --portti: Määritä portti (oletuksena "3000").

    -v tai --voluumit: Määritä voluumit (oletuksena "servervol").

#### Esimerkki:

    bash script.sh -n oma-verkko -p 8080 -v minunvoluumi

### Kuinka käynnistää client kontti

    Käynnistä asiakaskontti käyttämällä joko bash client.sh tai ./client.sh.

#### Parametrit

Voit mukauttaa projektin käynnistämistä antamalla joitain parametreja:

    -n tai --verkkonimi: Määritä Docker-verkko (oletuksena "oma-verkko").

    -p tai --portti: Määritä portti (oletuksena "3000").

    -v tai --voluumit: Määritä voluumit (oletuksena "clientvol").

    -so tai --serveri_osoite: Määritä serverin osoite (oletuksena "server". Voit myös kirjoittaa sen ip)

    -sp tai --serveri_portti: Määritä serverin portti (oletuksena "3000")

#### Esimerkki:

    bash client.sh -n oma-verkko -p 8080 -v minunvoluumi -so server -sp 3000


