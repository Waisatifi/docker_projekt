# Docker-projekti

Tämä Docker-projekti koostuu kahdesta kontista: palvelin ja asiakas, jotka viestivät keskenään. 
Tavoitteena on lähettää 1KB kokoisen tiedoston random-tekstin kanssa palvelimelta asiakaskontille.


## Ohjeet palvelimien käynnistämiseen!

#### Vaihe 1: Anna skripteille suoritusoikeudet

Käynnistä antamalla oikeudet skripteille ensin:

    chmod +x server.sh client

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
