
FROM node:20-alpine AS base
WORKDIR /app

COPY package.json ./
RUN npm install

# Test stage
FROM base AS test
COPY test.js ./
RUN npm test

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY server.js ./

EXPOSE 5000

HEALTHCHECK --interval=15s --timeout=3s \
    CMD wget -qO- http://localhost:5000/health || exit 1

USER node
CMD ["node", "server.js"]
