FROM node:16 as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Remove all default nginx stuff
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
