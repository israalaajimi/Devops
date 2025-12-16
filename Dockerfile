# ===== Stage 1: Build Node app =====
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ===== Stage 2: Deploy with Nginx =====
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

