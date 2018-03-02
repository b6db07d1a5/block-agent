FROM node:8.9.4-alpine

RUN mkdir /home/node/app

COPY . ./home/node/app

WORKDIR /home/node/app

RUN yarn install

CMD yarn start

EXPOSE 3001