FROM node:lts-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install -g yarn --force && yarn

COPY . .

EXPOSE 5000

RUN yarn build

CMD ["yarn", "start"]