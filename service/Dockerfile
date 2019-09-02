FROM node:10.16

WORKDIR /app/service
ENV PATH /app/service/node_modules/.bin:$PATH
COPY package.json /app/service/package.json
RUN npm i 
COPY . /app/service
CMD npm start