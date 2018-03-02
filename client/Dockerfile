FROM node:8.9.4-alpine

RUN apk update \
    && apk add tzdata \
    && cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime \
    && echo "Asia/Bangkok" > /etc/timezone \
    && apk del tzdata

WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

CMD ["yarn", "serve"]

EXPOSE 80