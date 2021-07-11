FROM node:12-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN chmod 2777 "/usr/src/api"

RUN npm install --pure-lockfile

COPY . .

EXPOSE 9000

CMD ["npm", "run", "start"]