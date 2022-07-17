# pull official base image
FROM node:16-alpine3.11 as build-step

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH



# install app dependencies
COPY package.json ./
RUN npm install -g npm
RUN npm install --legacy-peer-deps
RUN npm install react-scripts@5.0.0 -g --silent

# add app
COPY . /app
RUN npm run build

FROM nginx:1.17
COPY default.conf /etc/nginx/conf.d/
COPY --from=build-step /app/build /usr/share/nginx/html
