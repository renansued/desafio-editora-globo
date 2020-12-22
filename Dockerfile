FROM node:11-alpine

ENV TZ=America/Sao_Paulo

WORKDIR /react-app

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 3000

CMD npm start