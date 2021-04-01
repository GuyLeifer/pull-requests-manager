FROM node:14-slim as builder

WORKDIR /client

COPY ./client/package.json .

RUN npm install --only=production

COPY ./client .

RUN npm run build 

FROM node:alpine

WORKDIR /app

COPY ./server/package.json .

RUN npm install --only=production

COPY ./server .

COPY --from=builder ./client/build ./build

EXPOSE 81

CMD ["npm", "run", "start" ]