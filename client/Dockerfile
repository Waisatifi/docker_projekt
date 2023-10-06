FROM node

WORKDIR /cliendata

# RUN mkdir -p /cliendata/

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "client.js"]