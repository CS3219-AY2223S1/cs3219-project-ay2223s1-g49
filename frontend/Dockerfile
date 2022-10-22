FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --force
RUN npm run build

EXPOSE 3000

CMD [ "index.js" ]

