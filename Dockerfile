FROM alpine:3.11

ENV NODE_VERSION 16.9.1

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add --no-cache file
RUN apk --update add imagemagick
RUN apk --update add graphicsmagick
RUN apk add --update nodejs npm
RUN npm install

COPY . .
EXPOSE 8080

CMD ["node", "index.js"]