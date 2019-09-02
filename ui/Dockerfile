FROM node:10.16

WORKDIR /app/ui
ENV PATH /app/ui/node_modules/.bin:$PATH
COPY package.json /app/ui/package.json
RUN npm i 
COPY . /app/ui
CMD npm start