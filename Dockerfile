FROM node:14-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --immutable --prefer-offline
COPY . ./
RUN yarn build

CMD [ "yarn", "start" ]
