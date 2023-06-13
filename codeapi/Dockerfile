FROM node:18.13.0-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3007

CMD ["npm", "start"]