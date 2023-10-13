#!/bin/bash

# Oletusarvot
VERKKO="oma-verkko"
VOLUMET="clientvol"
PALVELIN_OSOITE="server"  # Palvelinkontin nimi
SERVER_PORTTI="3000"

# # Etsi palvelinkontin IP-osoite
# PALVELIN_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$PALVELIN_NIMI")

# Käsittele parametrit
while getopts "n:p:v:so:sp:" opt; do
  case $opt in
    n)
      VERKKO="$OPTARG"
      ;;
    p)
      PORTTI="$OPTARG"
      ;;
    v)
      VOLUMET="$OPTARG"
      ;;
    so)
      SERVER_OSOITE="$OPTARG"
      ;;
    sp)
      SERVER_PORTTI="$OPTARG"
      ;;
    \?)
      echo "Käyttö: $0 [-n verkkonimi] [-p portti] [-v voluumit] [-so serveri_osoite] [-sp serveri_portti]"
      exit 1
      ;;
  esac
done

# Tarkista, onko verkko olemassa; jos ei ole, luo se
if ! docker network inspect "$VERKKO" &> /dev/null; then
  docker network create "$VERKKO"
fi

# Rakenna asiakaskontti
docker build -t client-container ./client/.

# Aja asiakaskontti määritetyllä verkolla, portilla ja voluumilla, anna palvelimen osoite ja portti ympäristömuuttujina
docker run -d --network "$VERKKO" -v "$VOLUMET:/clientdata" -e SERVER_OSOITE="$PALVELIN_IP" -e SERVER_PORTTI="3000" --name client client-container
