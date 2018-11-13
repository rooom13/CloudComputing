FROM node:boron

RUN mkdir -p /usr/src/CC_ex2
WORKDIR /usr/src/CC_ex2

COPY package.json /usr/src/CC_ex2
RUN npm install

COPY . /usr/src/CC_ex2

EXPOSE 3000

CMD [ "node", "server.js"]