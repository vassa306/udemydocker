FROM node

WORKDIR /app

COPY package.json .

RUN npm install
ENV INTERNAL_ERROR 500
COPY . .

ENV PORT 3000
EXPOSE $PORT

CMD ["node", "app.js"]