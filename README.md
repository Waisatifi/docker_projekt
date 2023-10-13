# docker_projekt

## Anna oikeudet skripteille oikeudet ensimmäiseksi

    chmod +x server.sh client

## Kuinka käynnistää server kontti

    bash script.sh tai ./server.sh

### Parametrit

Voit mukauttaa projektin käynnistämistä antamalla joitain parametreja:

    -n tai --verkkonimi: Määritä Docker-verkko (oletuksena "oma-verkko").

    -p tai --portti: Määritä portti (oletuksena "3000").

    -v tai --voluumit: Määritä voluumit (oletuksena "servervol").

Esimerkki:

    bash script.sh -n oma-verkko -p 8080 -v minunvoluumi

## Kuinka käynnistää client kontti

    bash client.sh tai ./client.sh

### Parametrit

Voit mukauttaa projektin käynnistämistä antamalla joitain parametreja:

    -n tai --verkkonimi: Määritä Docker-verkko (oletuksena "oma-verkko").

    -p tai --portti: Määritä portti (oletuksena "3000").

    -v tai --voluumit: Määritä voluumit (oletuksena "clientvol").

    -so tai --serveri_osoite: Määritä serverin osoite (oletuksena "server". Voit myös kirjoittaa sen ip)

    -sp tai --serveri_portti: Määritä serverin portti (oletuksena "3000")

Esimerkki:

    bash client.sh -n oma-verkko -p 8080 -v minunvoluumi -so server -sp 3000
