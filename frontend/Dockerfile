FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install --force && npm run build

EXPOSE 8081

CMD ["index.js"]