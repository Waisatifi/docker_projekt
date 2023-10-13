FROM node

WORKDIR /serverdata

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]