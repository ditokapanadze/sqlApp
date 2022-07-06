
# specify a base image
FROM node:alpine


# install dependdencies
WORKDIR /usr/app
COPY package*.json ./
RUN npm install

COPY . .
# Default command
CMD [ "node", "server.js" ]