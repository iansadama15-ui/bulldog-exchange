# Base stage
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install

# Test stage (Jenkins will run this later)
FROM base AS test
RUN npm test

# Production stage
FROM base AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js ./
EXPOSE 5000

# Healthcheck for Docker orchestration
HEALTHCHECK --interval=15s --timeout=3s CMD wget -qO- http://localhost:5000/health || exit 1

# Run as non-root user for security
USER node
CMD ["node", "server.js"]