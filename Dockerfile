# frontend/Dockerfile
FROM node:18 AS builder
WORKDIR /frontend
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
