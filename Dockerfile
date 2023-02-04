#add bash to node alpine
FROM node:16.19-alpine3.16 as alp-base
RUN apk add --update 

#build node modules for dev & for building
FROM alp-base as npm-base
WORKDIR /usr/src
COPY package*.json ./
RUN npm install

#DEVELOPMENT
#docker build --target octave_dev -t octave_dev .
FROM npm-base as octave_dev
EXPOSE 8080 

#webpack builds bundle.js
FROM npm-base as build
WORKDIR /usr/src   
COPY . .
ENV NODE_ENV=production
RUN npm run build:docker 

#PRODUCTION
#docker build -t octavefitness/octave-prod .
FROM alp-base as prod
WORKDIR /usr/src 
COPY package*.json ./
RUN npm ci --omit=dev
COPY /src ./src 
COPY --from=build /usr/src/build ./build
EXPOSE 3434
ENTRYPOINT node ./src/server/server.js 

# docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t dockwellhub/dwh-prod:latest --push . 