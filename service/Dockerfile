FROM node:10.16

WORKDIR /app/service
ENV PATH /app/service/node_modules/.bin:$PATH
COPY service/package.json /app/service/package.json
COPY mounts/* app/mounts/
RUN npm i 
COPY /service/* ./
CMD npm start