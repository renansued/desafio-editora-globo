FROM node:11-alpine

ENV TZ=America/Sao_Paulo

WORKDIR /node-app

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 9000

CMD nodemon -L --watch . src/index.js