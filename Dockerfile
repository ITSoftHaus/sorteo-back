FROM node:12-slim

WORKDIR /home/lvinsilva/sorteo-image

COPY package*.json ./

RUN npm ci --only=production

COPY . ./

RUN npm install -g typescript

RUN npm install -g ts-node

RUN npm install -g nodemon

RUN npm run build

CMD ["nodemon", "dist/app/server.js"]