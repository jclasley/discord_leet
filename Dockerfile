FROM node:latest
COPY package*.json /
RUN npm install
COPY . .
RUN chmod +x ./query.sh

ENTRYPOINT [ "node", "discord_init.js" ]