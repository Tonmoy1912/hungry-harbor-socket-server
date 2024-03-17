FROM node:20

WORKDIR /app

RUN npm install -g nodemon
RUN npm install -g ts-node
RUN npm install -g tsc

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

EXPOSE 8000

RUN npm run build

CMD [ "npm","run","start" ]
