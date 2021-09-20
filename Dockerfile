FROM node.js

WORKDIR /usr/src/app
COPY . .
EXPOSE 8080

CMD ["node", "index.js"]