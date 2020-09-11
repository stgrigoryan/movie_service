FROM node:13-alpine

ENV LANG="C.UTF-8"

WORKDIR /app

COPY package.json /app

RUN yarn

COPY ./src /app/src
COPY tsconfig.json /app

RUN yarn build

EXPOSE 50000 5000

CMD [ "yarn", "start"]