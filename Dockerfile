FROM node:latest

COPY package*.json /
RUN npm install
COPY . .
ENTRYPOINT [ "node", "discord_init.js" ]