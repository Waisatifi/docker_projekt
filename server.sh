#!/bin/bash

# Oletusarvot
VERKKO="oma-verkko"
PORTTI="3000"
VOLUMET="servervol"

# Käsittele parametrit
while getopts "n:p:v:" opt; do
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
    \?)
      echo "Käyttö: $0 [-n verkkonimi] [-p portti] [-v voluumit]"
      exit 1
      ;;
  esac
done



# Tarkista, onko verkko olemassa; jos ei ole, luo se
if ! docker network inspect "$VERKKO" &> /dev/null; then
  docker network create "$VERKKO"
fi

# Rakenna palvelinkontti
docker build -t server-container ./server/.

# Aja palvelinkontti määritetyllä verkolla, portilla ja voluumilla
docker run -d --rm --network "$VERKKO" -p "$PORTTI" -v "$VOLUMET:/serverdata" --name server server-container
