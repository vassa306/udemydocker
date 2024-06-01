FROM node

WORKDIR /app
#first dot path from the dockerfile second path to the folder in the container
COPY . /app

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]








