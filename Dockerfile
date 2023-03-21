# base image
FROM node:latest

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install

# copy app files
COPY . .

# build app
RUN npm run build

# set environment variables
ENV PORT=3000
ENV NODE_ENV=production

# expose port
EXPOSE 3000

# start command
CMD ["npm", "start"]
