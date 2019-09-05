FROM node:10.16

WORKDIR /app/ui
ENV PATH /app/ui/node_modules/.bin:$PATH
COPY ui/package.json /app/ui/package.json
COPY mounts/* app/mounts/
RUN npm i 
COPY /ui/* ./
CMD npm start