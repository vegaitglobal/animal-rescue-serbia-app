# pull official base image
FROM node:14.21.1-alpine

# set working directory
WORKDIR /app

ARG API_URL=https://api.ars.codeforacause.rs

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install --global serve

# add app
COPY . .

RUN echo "export const API_URL = '${API_URL}';" > /app/src/config.ts

RUN npm run build
EXPOSE 3000

# start app
CMD ["serve", "-s", "/app/build"]