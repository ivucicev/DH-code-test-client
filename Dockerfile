FROM node:alpine as node

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/client-app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
