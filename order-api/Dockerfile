# Base stage
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install

# Test stage (Jenkins runs this in the CI/CD pipeline)
FROM base AS test
COPY server.js test.js ./
RUN npm test

# Production stage
FROM base AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js ./
EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1

USER node
CMD ["node", "server.js"]