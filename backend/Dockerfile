# Stage 1: Build Stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production Stage
FROM node:18
WORKDIR /app
COPY --from=builder /app ./
RUN npm prune --production

EXPOSE 5000
CMD ["npm", "start"]
